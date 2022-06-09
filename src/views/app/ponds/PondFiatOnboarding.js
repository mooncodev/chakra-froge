import {
  Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Grid,
  Icon, Image, Progress, SimpleGrid, Spacer, Text,
} from '@chakra-ui/react';
// assets
import peopleImage from "assets/img/people-image.png";
import frog009 from "assets/img/stock-frogs/darkbg/square/009.jpg";
// Custom components
import {Pond,PondBody,PondHeader} from '../bits/Pond.js';
import {
  CartIcon, DocumentIcon, GlobeIcon, RocketIcon, StatsIcon, WalletIcon,
} from "components/Icons/Icons.js";
import React, { useEffect, useState } from 'react';
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

export default function PondFiatOnboarding() {
  const textColor = "white"
  const w3r = useWeb3React()
  // const [_getConfig, set_getConfig] = useState(cfgInit)
  const wallets = {
    BTC: { address: "btcAddr" },
    BNB: { address: "bnbAddress", memo: "cryptoTag" },
  };

  useEffect(async ()=>{

    // set_getConfig(olaToObject(await stx({
    //   from:w3r.account,to: addr.mainnet.FROGEX.ERC20,
    //   abiLookup: ['FrogeX','getConfig'],})))

  },[])

  return (
    <Pond title='Fiat Onboarding' style={{ padding: '0' }}>
      {/* <Progress value={60} max={100} /> */}
      {/* <Breadcrumb> */}
      {/*   <BreadcrumbItem> */}
      {/*     <BreadcrumbLink>step1</BreadcrumbLink> */}
      {/*   </BreadcrumbItem> */}
      {/*   <BreadcrumbItem> */}
      {/*     <BreadcrumbLink>step2</BreadcrumbLink> */}
      {/*   </BreadcrumbItem> */}
      {/*   <BreadcrumbItem> */}
      {/*     <BreadcrumbLink>step3</BreadcrumbLink> */}
      {/*   </BreadcrumbItem> */}
      {/*   <BreadcrumbItem> */}
      {/*     <BreadcrumbLink>step4</BreadcrumbLink> */}
      {/*   </BreadcrumbItem> */}
      {/* </Breadcrumb> */}
      {/* <Image src="https://via.placeholder.com/300x420" /> */}

      <Box
        sx={{
          height: "525px",
          boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          margin: "auto",
          color:'brand.outline',
        }}
      >
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
        {/* <Box name='interstitial' sx={{...abs(0,0,0,0), bgColor:'rgba(0,0,0,.9)', */}
        {/*   zIndex: '2', */}
        {/*   borderRadius:'0', */}
        {/*   justifyContent: 'center', */}
        {/*   alignItems: 'center', */}
        {/*   display: 'flex', */}
        {/*   color: 'white', */}
        {/*   fontSize: '24px',}}>Coming Soon! */}
        {/* </Box> */}
      </Box>
    </Pond>
  );
}

