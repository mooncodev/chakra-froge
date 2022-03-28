import { Provider as JotaiProvider, atom, useAtom } from "jotai";
import { Box, ChakraProvider, Portal, useDisclosure, useStyleConfig } from '@chakra-ui/react';
import React, { useState } from "react";
import theme from "theme/theme.js";
import { appNavDrawerOpenAtom, signatureAtom, w3rLibraryAtom } from './services/atoms.js';
import { createWeb3ReactRoot, useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { ethers } from "ethers";
import AppLayout from './AppLayout.js';
import { GlobalFonts } from './theme/foundations/GlobalFonts.js';
import W3RManager from './views/app/Wallet/W3RManager.js';
const Web3ReactProviderNetwork = createWeb3ReactRoot('NETWORK')

export default function AppProvider(props) {
  const { variant, children, ...rest } = props;

  const getLibrary = (provider) => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000; // frequency provider is polling
    return library;
  };

  return (
      <ChakraProvider theme={theme} resetCss={false}>
        <GlobalFonts />

        <JotaiProvider
          initialValues={[
            [appNavDrawerOpenAtom, false]
          ]}
        >
          <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ReactProviderNetwork getLibrary={getLibrary}>
              <W3RManager>

                <AppLayout/>

              </W3RManager>
            </Web3ReactProviderNetwork>
          </Web3ReactProvider>
        </JotaiProvider>
      </ChakraProvider>
  );
}
