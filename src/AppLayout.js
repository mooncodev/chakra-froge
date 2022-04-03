// Chakra imports
// import { Provider as AppStateProvider, atom, useAtom } from "jotai";
import { Box, ChakraProvider, Grid, Portal, useDisclosure, useStyleConfig } from '@chakra-ui/react';
// import Configurator from "views/app/Configurator.js";
import AppFooter from "views/app/navs/AppFooter.js";
// Layout components
import AppNav from "views/app/navs/AppNav.js";
import AppSidebar from "views/app/navs/AppSidebar.js";
import React, { useEffect, useState } from 'react';
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
import { useCrawlStore, useW3Store } from './services/atoms.js';
import { PondLinkTagRow } from './services/usePondLinkStore.js';

export default function AppLayout(props) {
  const { variant, children, ...rest } = props;
  const getLibrary = (provider) => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000; // frequency provider is polling
    return library;
  };
  document.documentElement.dir = "ltr";
  // Chakra Color Mode
  const mainPanelStyles = useStyleConfig("MainPanel", { variant:'main' });
  const [isMobile, isDesktop] = useDeviceMode()
  let location = useLocation();
  const pgTag = {
    '/app/':'PgDash',
    '/app/dash':'PgDash',
    '/app/frogex':'PgFrogeX',
    '/app/eco-action':'PgEcoAction',
    '/app/sponsorships':'PgSponsorships',
    '/app/game-night':'PgGameNight',
    '/app/nft':'PgNFT',
    '/app/xchange':'PgXchange',
    '/app/calc':'PgCalculators',
    '/app/billing':null,
    '/app/profile':null,
    '/app/tables':null,
  }[location.pathname]

  // const route = useRoutes()
  return (
    <>
      {/* <AppSidebar/> */}
      <Portal>
        <AppNav/>
      </Portal>
      <AppSidebar/>
      <Box id='AppMain'
           style={{
             height: '100%',
             overflow: "auto",
             marginLeft:isDesktop?desktopSidebarWidth:'0',
             paddingRight:isDesktop?'10px':'1px',
             paddingTop:'60px'
           }}>
        {pgTag&&<PondLinkTagRow pondLinkPg={pgTag}/>}
        <Grid
          templateColumns={{
            md: '1fr',
            lg: '1fr 1fr'
          }}
          templateRows={{
            md: '1fr auto',
            lg: '1fr'
          }}
          gap="18px"
        >

          <Outlet/>
        </Grid>

        <AppFooter/>

      </Box>
    </>
  );
}
