import {
  Box, Button, ButtonGroup,
  ChakraProvider,
  Grid,
  Heading,
  Portal, Text,
  useDisclosure,
  useStyleConfig, useToken
} from '@chakra-ui/react';
// import Configurator from "views/app/Configurator.js";
import AppFooter from "views/app/navs/AppFooter.js";
// Layout components
import AppNav from "views/app/navs/AppNav.js";
import AppSidebar from "views/app/navs/AppSidebar.js";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useRouteMatch } from 'react-router-dom';
// Custom Chakra theme
// import theme from "theme/theme.js";
// Custom components
// import { appNavDrawerOpenAtom, signatureAtom, w3rLibraryAtom } from './services/atoms.js';
import { createWeb3ReactRoot, useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { ethers } from "ethers";
import { connectors } from 'views/app/wallet/connectors.js';
import { useDeviceMode } from './theme/foundations/breakpoints.js';
import { desktopSidebarWidth } from 'data/constants.js';
import { useW3Store,useCrawlStore } from 'services';
import { useMutationObservable } from './hooks/useMutationObservable.js';
import { CISVG_PageAccent } from './assets/FrogeBrand.js';
import { abs } from './views/home/sections/MtgCard/MtgCard.js';
import { useAppStore } from './services/useAppStore.js';
import { TextXs } from './views/app/bits/UtilityTags.js';

function scrollbarVisible(element) {
  return element.scrollHeight > element.clientHeight;
}
export function AppPgHeading({ pgHeadingText }){
  return (
    <Heading as={'h4'} size='md' width={'fit-content'} ml={'12px'} position={'relative'} style={{color:useToken('colors','brand.green')}}>
      <CISVG_PageAccent sx={{...abs('-6px',null,null,'-8px')}}/>
      {pgHeadingText}
      <CISVG_PageAccent sx={{...abs(null,'-8px','-8px',null), transform:'rotate(180deg)'}}/>
    </Heading>
  )
}
export function AppMain({children, pgHeadingText, pgContextBar }){
  const [isMobile, isDesktop] = useDeviceMode()
  const [scrollVis, setScrollVis] = useState('0');
  const appMainRef = useRef(null);
  const onAppMainMutation = useCallback((mutationList) => {
    if(scrollbarVisible(appMainRef.current)){setScrollVis('1');
    }else{setScrollVis('0');}}, [setScrollVis]);
  useMutationObservable(appMainRef.current, onAppMainMutation);
  return (
    <Box id='AppMain' ref={appMainRef}
         sx={{
           height: '100%',
           overflowY: "scroll",
           overflowX: "hidden",
           marginLeft:isDesktop?desktopSidebarWidth:'0',
           paddingRight:isDesktop?'10px':'1px',
           paddingTop:'60px',
           display: 'flex',
           flexDirection: 'column',
           flexBasis: '100vh',
           backgroundColor: `rgba(17,22,35,${scrollVis})`,//brand.bg
           justifyContent: 'space-between',
           "&::-webkit-scrollbar": {
             width: "6px",
             backgroundColor: 'inherit',
           },
           "&::-webkit-scrollbar-track": {
             width: "2px",
             backgroundColor: 'inherit',
           },
           "&::-webkit-scrollbar-thumb": {
             background: "green.700",
             borderRadius: "24px",
           },
         }}
    >
      <Box sx={{ width:'100%' }}>
        <Box sx={{ width:'100%', height:'34px', }}>
          <AppPgHeading pgHeadingText={pgHeadingText}/>
        </Box>
        <Box sx={{ width:'100%', height:'34px', }}>
          {pgContextBar&&pgContextBar}
        </Box>


      </Box>
      <Grid templateColumns="repeat(auto-fit, minmax(350px, 1fr))"
            gap={6} justifyItems={'center'}
            templateRows={{ md: '1fr auto', lg: '1fr' }}>
        {children}
      </Grid>
      <AppFooter/>
    </Box>)
}
export default function AppLayout(props) {
  const { variant, children, ...rest } = props;


  const getLibrary = (provider) => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000; // frequency provider is polling
    return library;
  };
  document.documentElement.dir = "ltr";
  // Chakra Color Mode
  const [isMobile, isDesktop] = useDeviceMode()

  // const route = useRoutes()
  return (
    <>
      {/* <AppSidebar/> */}
      <Portal>
        <AppNav/>
      </Portal>
      <AppSidebar/>
      <Outlet/>
    </>
  );
}
