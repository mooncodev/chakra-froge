// Chakra imports
import {
  Box,
  Button,
  Flex, HStack,
  Image, Text, Portal,
  VStack, forwardRef,
} from '@chakra-ui/react';
import {Pond,PondBody,PondHeader} from '../bits/Pond.js';
import React, { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
import { useCrawlStore, useFxAccountStore, useFxStore } from '../../../services/atoms.js';
import { BtnXs, P, S, TextXs } from '../bits/UtilityTags.js';
import { mont } from '../../../theme/foundations/fonts.js';

export default function PondGameNightRegister(props) {
  const {pondLink} = props;
  const {chainId:u_chainId,account:u_account,active:u_active,} = useWeb3React()
  const {chainId:n_chainId,account:n_account,active:n_active,} = useWeb3React('NETWORK')

  const _getAccount = useState({})
  const [isClaimBtnDisabled, set_isClaimBtnDisabled] = useState(false)

  const ethPrice = useCrawlStore(s=>s.ethPrice)
  const fxPrice = useFxStore(s=>s.fxPrice)
  const _balanceFx = useFxAccountStore(s=>s._balance)
  const _xDivsAvailable = useFxAccountStore(s=>s._xDivsAvailable)
  const _xDivsEarnedToDate = useFxAccountStore(s=>s._xDivsEarnedToDate)
  const _xDivsWithdrawnToDate = useFxAccountStore(s=>s._xDivsWithdrawnToDate)
  const _xMinClaimableDivs = useFxStore(s=>s._xMinClaimableDivs)
  const _fxIsClaimEligible = useFxAccountStore(s=>s._fxIsClaimEligible)

  useEffect(async ()=>{
    // await hydrate()
  },[])

  const tickerBubbleStyle = {
    color:'gray.400',
    width: "45%",
    bgColor:'global.bubble',
    borderRadius: '6px',
    ...mont.md.md,
  }
  return (
    <Pond maxWidth='400px' variant='alignCenter' pondLink={pondLink}>
      <PondHeader>
        <S color='white'>Register!</S>&nbsp;<S color='gray.300'>Come on then!</S>
      </PondHeader>
      <PondBody>
        <VStack>
          <HStack width='100%' justifyContent='space-evenly'>
            <VStack __css={tickerBubbleStyle}><P>FrogeX</P><P>fxPrice</P></VStack>
            <VStack __css={tickerBubbleStyle}><P>ETH</P><P>ethPrice</P></VStack>
          </HStack>
        </VStack>
      </PondBody>
    </Pond>
  );
}
