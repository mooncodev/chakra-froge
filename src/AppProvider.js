import { Provider as JotaiProvider, atom, useAtom } from "jotai";
import { Box, ChakraProvider, Portal, useDisclosure, useStyleConfig } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import theme from "theme/theme.js";
import {
  appNavDrawerOpenAtom,
} from './services/atoms.js';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { ethers } from "ethers";
import AppLayout from './AppLayout.js';
import W3RManager from './views/app/Wallet/W3RManager.js';
const Web3ReactProviderNetwork = createWeb3ReactRoot('NETWORK')

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};
export default function AppProvider(props) {
  const { variant, children, ...rest } = props;

  return (
      <ChakraProvider theme={theme} resetCss={false}>

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
