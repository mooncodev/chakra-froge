// Chakra imports
import {
  Box,
  Button,
  Flex,
  Image,
  Popover, PopoverArrow, PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader, PopoverTrigger,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  CartIcon, DocumentIcon, GlobeIcon, RocketIcon, StatsIcon, WalletIcon,
} from "components/Icons/Icons.js";
import React, { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
import { stx, call, FX, readFX } from 'stx/stx.js';
import { BtnXs, TextXs } from './UtilityTags.js';
// import addr from 'data/addresses.js';
// import { olaToObject } from '../../../helpers/deep.js';
// import LogoMetaMask from '../Wallet/assets/LogoMetaMask.png';
// import { connectors } from '../Wallet/connectors.js';



export default function PopoverFXGetConfig() {
  // const u_ = useWeb3React()
  const n_ = useWeb3React('NETWORK')
  // const {
  //   library:u_library,
  //   chainId:u_chainId,
  //   account:u_account,
  //   active:u_active,
  // } = u_
  const {
    library:n_library,
    chainId:n_chainId,
    account:n_account,
    active:n_active,
  } = n_

  const [_getConfig, set_getConfig] = useState([])


  const GetConfig = ()=>(<>{_getConfig.map((v,i)=>(<TextXs key={v}>{v}</TextXs>))}</>)

  // useEffect(async ()=>{
  // },[])

  const n_call = async() => {
    set_getConfig(await FX.getConfigFormatTechLabels())
  };

  return (
    <Popover onOpen={()=>n_call()}>
      <PopoverTrigger>
        <Button>FrogeX Settings</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>FrogeX Settings Verbatim</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <GetConfig/>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
