// Chakra imports
// import { Provider as AppStateProvider, atom, useAtom } from "jotai";
import { Box, ChakraProvider, Portal, useDisclosure, useStyleConfig } from '@chakra-ui/react';
// import Configurator from "views/app/Configurator.js";
import AppFooter from "views/app/AppFooter.js";
// Layout components
import AppNav from "views/app/AppNav.js";
import AppSidebar from "views/app/AppSidebar.js";
import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
// Custom Chakra theme
// import theme from "theme/theme.js";
// Custom components
// import { appNavDrawerOpenAtom, signatureAtom, w3rLibraryAtom } from './services/atoms.js';
import { createWeb3ReactRoot, useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { ethers } from "ethers";
import { connectors } from 'views/app/Wallet/connectors.js';
import { useDeviceMode } from './theme/foundations/breakpoints.js';
import { desktopSidebarWidth } from 'data/constants.js';
import { useCrawlStore, useW3Store } from './services/atoms.js';

export default function AppLayout(props) {
  const { variant, children, ...rest } = props;
  // const {
  //   library:u_library,
  //   chainId:u_chainId,
  //   account:u_account,
  //   activate:u_activate,
  //   deactivate:u_deactivate,
  //   active:u_active,
  // } = useWeb3React();
  // useEffect(async ()=>{
  //   // await u_activate(connectors.network);
  //   // console.log('u_account', u_account)
  //   await useW3Store.getState().activateNetwork()
  //   await useCrawlStore.getState().fetch_ethPrice()
  //   await useCrawlStore.getState().fetch_fx_getConfig()
  // },[])
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
      <Box id='AppMain'
           style={{
             height: '100%',
             width: 'auto',
             display: 'flex',
             flexDirection: 'column',
             overflow: "auto",
             marginLeft:isDesktop?desktopSidebarWidth:'0',
             paddingRight:isDesktop?'10px':'1px'
           }}>
        <Outlet/>
        <AppFooter/>
      </Box>
    </>
  );
}
