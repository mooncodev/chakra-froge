import {
  Box, Button, Flex, Grid, Image, Text, VStack,
} from '@chakra-ui/react';
import {Pond,PondBody,PondHeader} from '../../common/Pond.js';
import React, { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
import { connectors } from '../../../valor/components/connectors.js';
import { useUserStore, useFxStore, useCrawlStore } from 'services';
import { BtnXs, BtnXs2, HFlex, TextXs, VFlex } from '../../common/UtilityTags.js';
import { useWalletStore } from '../../../valor/useWalletStore.js';


export default function PondNetworkVitals(props) {

  const state = useWalletStore.getState()
  const provider = useWalletStore(s=>s.provider)

  useEffect(async ()=>{

  },[])


  return (
    <Pond title='Network Vitals'>
      <PondBody>
        <Grid gridTemplateColumns={'1fr 4fr'} w='100%'>
          <VFlex>
            <BtnXs onClick={state.init}>init</BtnXs>
            <BtnXs onClick={state.detect}>detect</BtnXs>
            <BtnXs onClick={state.addAnon}>addAnon</BtnXs>
            <BtnXs onClick={state.addUser}>addUser</BtnXs>
            <BtnXs onClick={state.newChain}>newChain</BtnXs>
            <BtnXs2 onClick={state.anonCall}>anonCall</BtnXs2>
            <BtnXs2 onClick={state.userCall}>userCall</BtnXs2>
            <BtnXs2 onClick={state.userStx}>userStx</BtnXs2>
          </VFlex>
          <Box>
            <TextXs>
              provider: {String(provider)}
            </TextXs>
            <TextXs>
              user
            </TextXs>
          </Box>
        </Grid>
      </PondBody>
    </Pond>
  );
}

const cfgInit = {
  _ethPtnChty:'',
  _ethPtnLqty:'',
  _ethPtnMktg:'',
  _ethPtnRwds:'',
  _hopThreshold:'',
  _lockerUnlockDate:'',
  _lqtyThreshold:'',
  _tknPtnLqty:'',
  _tradingEnabled:'',
  _ttlFeePctBuys:'',
  _ttlFeePctSells:'',
  _xGasForClaim:'',
  _xMinClaimableDivs:'',
}
