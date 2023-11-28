import {
  Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Grid,
  Icon, Image, Progress, SimpleGrid, Spacer, Text,Tabs, TabList, TabPanels, Tab, TabPanel,
} from '@chakra-ui/react';
// assets
import peopleImage from "assets/img/people-image.png";
import frog009 from "assets/img/stock-frogs/darkbg/square/009.jpg";
// Custom components
import {Pond,PondBody,PondHeader} from '../../common/Pond.js';
import {
  CartIcon, DocumentIcon, GlobeIcon, RocketIcon, StatsIcon, WalletIcon,
} from "components/Icons/Icons.js";
import React, { useCallback, useEffect, useState } from 'react';
// react icons
import { BsArrowRight } from "react-icons/bs";
import { useWeb3React } from '@web3-react/core';
import stx from 'stx/stx.js';
import addr from 'data/addresses.js';
import { olaToObject } from '../../../helpers/deep.js';
import PortionBar from '../../../components/Charts/PortionBar.js';
import { BtnReadMore } from '../../common/UtilityTags.js';
import OnramperWidget from "@onramper/widget";
import { SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
import { getApiUrl } from '../../../valor/components/connectors.js';
import { providers, ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { useUserStore } from '../../../services/index.js';
import { tplUserItem } from '../../../services/useUserStore.js';
import { abs } from '../../common/cssHelpers.js';

const jsonRpcEndpoint = getApiUrl('infura', 'mainnet')
const jsonRpcProvider = new providers.JsonRpcProvider(jsonRpcEndpoint);
const provider = new ethers.providers.Web3Provider(jsonRpcProvider);


export default function PondFiatOnboarding() {
  // const textColor = "white"
  const {chainId:u_chainId,account:u_account,active:u_active,library:u_library,} = useWeb3React()

  const [account, setAccount] = useState({
    address: '',
    provider: provider,
  })
  const user = useUserStore(s=>s.users[u_account])


  let [fxAcct,setFxAcct] = useState(false)

  useEffect(async ()=>{
      setAccount({
        address: u_account,
        provider: u_library?u_library.provider:provider,
      })
  },[user])

//   async function connectWallet() {
// //check if Metamask is installed in the browser
//     const ethereumProvider = await detectEthereumProvider();
//     if (ethereumProvider) {
//       //prompt user to connect their wallet
//       const accounts = await window.ethereum.request({
//         method: 'eth_requestAccounts',
//       })
//       const address = accounts[0];
//       setAccount({
//         address: address,
//         provider: ethereumProvider
//       })
//     }
//   }

  // const wallets = {
  //   BTC: { address: "btcAddr" },
  //   BNB: { address: "bnbAddress", memo: "cryptoTag" },
  // };


  return (
    <Pond title='Fiat Onboarding' style={{ padding: '0' }}>

      <Box sx={{
        height: "525px",
        boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        margin: "auto",
        color:'brand.outline',
      }}>
        <OnramperWidget
          API_KEY="pk_prod_Y_wgU87OiDXBQ9xw9quWHHBnn_bn2epGjS_y6F05ZUg0"
          darkMode={true}
          color='black'
          // fontFamily={fontFamily}
          // defaultAddrs={wallets}
          // defaultAmount={defaultAmount}
          // defaultCrypto={defaultCrypto}
          // defaultFiat={defaultFiat}
          // defaultFiatSoft={defaultFiatSoft}
          // defaultPaymentMethod={defaultPaymentMethod}
          filters={{
            onlyCryptos: ["ETH"],
            // excludeCryptos: excludeCryptos,
            // onlyPaymentMethods: onlyPaymentMethods,
            // excludePaymentMethods: excludePaymentMethods,
            // excludeFiat: excludeFiat,
            // onlyGateways: onlyGateways,
            // onlyFiat: onlyFiat,
          }}
          // isAddressEditable={isAddressEditable}
          // amountInCrypto={amountInCrypto}
          // redirectURL={redirectURL}
        />
        {/*
  <Box name='interstitial' sx={{...abs(0,0,0,0), bgColor:'rgba(0,0,0,.9)',
    zIndex: '2',
    borderRadius:'0',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    color: 'white',
    fontSize: '24px',}}>Coming Soon!
  </Box>
*/}
      </Box>


    </Pond>
  );
}

