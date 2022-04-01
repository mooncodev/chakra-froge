// Chakra imports
// import { Provider as AppStateProvider, atom, useAtom } from "jotai";
import { Box, ChakraProvider, Portal, useDisclosure, useStyleConfig } from '@chakra-ui/react';
// import Configurator from "views/app/Configurator.js";
import AppFooter from "views/app/navs/AppFooter.js";
// Layout components
import AppNav from "views/app/navs/AppNav.js";
import AppSidebar from "views/app/navs/AppSidebar.js";
import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
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
import CustomScroll from 'react-custom-scroll';

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


  return (
    <>
      {/* <AppSidebar/> */}
      <Portal>
        <AppNav/>
      </Portal>
      <AppSidebar/>
      <Box id="AppMain"
              style={{
                height: '100%',
                width: 'auto',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto',
                marginLeft: isDesktop ? desktopSidebarWidth : '0',
                paddingRight: isDesktop ? '10px' : '1px',
                paddingTop: '60px'
              }}><CustomScroll>
        <Outlet/>
        <AppFooter/></CustomScroll>
      </Box>
    </>
  );
}
