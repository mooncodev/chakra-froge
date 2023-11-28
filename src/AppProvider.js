import { Box, ChakraProvider, Portal, useDisclosure, useStyleConfig } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import theme from "theme/theme.js";
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { ethers } from "ethers";
import AppLayout from './AppLayout.js';
// import W3RManager from './valor/components/W3RManager.js';
// import { appNavDrawerOpenAtom, useUserStore } from 'services';
import { useWalletStore } from './valor/useWalletStore.js';
const Web3ReactProviderNetwork = createWeb3ReactRoot('NETWORK')

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};
export default function AppProvider(props) {
  const { variant, children, ...rest } = props;
  // useUserStore.getState().initStore();
  useEffect(async ()=>{
    await useWalletStore.getState().initWalletStore();
  },[])

  return (
          // <Web3ReactProvider getLibrary={getLibrary}>
          //   <Web3ReactProviderNetwork getLibrary={getLibrary}>
          //     <W3RManager>

                <AppLayout/>

          //     </W3RManager>
          //   </Web3ReactProviderNetwork>
          // </Web3ReactProvider>
  );
}
