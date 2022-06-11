import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Grid,
  Icon,
  Image,
  Progress,
  SimpleGrid,
  Spacer,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToken,
} from '@chakra-ui/react';
// assets
import peopleImage from "assets/img/people-image.png";
import frog009 from "assets/img/stock-frogs/darkbg/square/009.jpg";
// Custom components
import {Pond,PondBody,PondHeader} from '../bits/Pond.js';
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
import { BtnReadMore } from '../bits/UtilityTags.js';
import OnramperWidget from "@onramper/widget";
import { abs } from '../../home/sections/MtgCard/MtgCard.js';
import { SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
import { getApiUrl } from '../wallet/connectors.js';
import { providers, ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { useUserStore } from '../../../services/index.js';
import { tplUserItem } from '../../../services/useUserStore.js';

const jsonRpcEndpoint = getApiUrl('infura', 'mainnet')
const jsonRpcProvider = new providers.JsonRpcProvider(jsonRpcEndpoint);
const provider = new ethers.providers.Web3Provider(jsonRpcProvider);

const MY_TOKEN_LIST = [
  {
    "name": "Dai Stablecoin",
    "address": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    "symbol": "DAI",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
  },
  {
    "name": "Tether USD",
    "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "symbol": "USDT",
    "decimals": 6,
    "chainId": 1,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
  },
  {
    "name": "USD Coin",
    "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "symbol": "USDC",
    "decimals": 6,
    "chainId": 1,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
  },
  {
    "name": "FrogeX",
    "address": "0x5fA54fdDF1870C344DbFaBb37dFab8700Ec0Def1",
    "symbol": "FROGEX",
    "decimals": 9,
    "chainId": 1,
    "logoURI": "https://froge.fi/brand/froge512o.png"
  },
]
const NATIVE = 'NATIVE' // Special address for native token
const FROGEX = '0x5fA54fdDF1870C344DbFaBb37dFab8700Ec0Def1'

export default function PondUniswapWidget() {
  // const textColor = "white"
  const {chainId:u_chainId,account:u_account,active:u_active,library:u_library,} = useWeb3React()

  const [account, setAccount] = useState({
    address: '',
    provider: provider,
  })
  const user = useUserStore(s=>s.users[u_account])

  useEffect(async ()=>{
      setAccount({
        address: u_account,
        provider: u_library?u_library.provider:provider,
      })
  },[user])

  const theme = {
    primary: '#FFF',
    secondary: '#A9A9A9',
    interactive: useToken('colors','bog.600'),
    container: '#4E4E5A',
    module: '#222633',
    accent: useToken('colors','brand.green'),
    outline: useToken('colors','brand.dkgreen'),
    dialog: '#000',
    fontFamily: 'Montserrat',
    borderRadius: 0.5,
  }
  return (
    <Pond title='Uniswap' style={{ padding: '0' }}>
      {u_active&&
        <div className="Uniswap">
          <SwapWidget
            provider={account.provider}
            jsonRpcEndpoint={jsonRpcEndpoint}
            width="100%"
            color={'white'}
            theme={theme}
            tokenList={MY_TOKEN_LIST}
            defaultInputTokenAddress={NATIVE}
            defaultOutputTokenAddress={FROGEX}
          />
        </div>
      }

    </Pond>
  );
}

