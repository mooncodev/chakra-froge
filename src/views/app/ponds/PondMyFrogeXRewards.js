// Chakra imports
import {
  Box,
  Button,
  Flex, HStack,
  Image,
  Popover,
  PopoverArrow, PopoverBody, PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text, Portal,
  VStack, forwardRef,
} from '@chakra-ui/react';
import {Pond,PondBody,PondHeader} from '../bits/Pond.js';
import React, { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
import { call, stx, FX, readFX } from 'stx/stx.js';
import { olaToObject } from '../../../helpers/deep.js';
import { useCrawlStore, useFxAccountStore, useFxStore } from '../../../services/atoms.js';
import { BtnXs, P, S, sxFrogeEyeEyeBeforeBg, TextXs } from '../bits/UtilityTags.js';
import { Bubble, BubLabel, BubSub, BubValue } from '../bits/Bubble.js';
import { last4 } from '../../../helpers/math/zmath.mjs';
import { mont } from '../../../theme/foundations/fonts.js';
import { MoreInfoPopover } from '../bits/MoreInfoPopover.js';


let _execClaimFn = ()=>{}


export default function PondMyFrogeXRewards() {

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
    await hydrate()
  },[])


  const hydrate = async()=>{
    console.log('hydrating stuff from PondMyFrogeXRewards')
    await useFxAccountStore.getState().hydrateFxGetAccount()
    await useFxStore.getState().hydrateFxStore()
    if(_fxIsClaimEligible){
      set_isClaimBtnDisabled(false)
    }else{
      set_isClaimBtnDisabled(true)
      console.log('things have changed... no longer eligible')
    }

  }

  const onExecClaim = async() => {
    set_isClaimBtnDisabled(true)
    const rcpt = await useFxAccountStore.getState().execClaim()
    set_isClaimBtnDisabled(false)
  };

  const tickerBubbleStyle = {
    color:'gray.300',
    width: "45%",
    textAlign:'center',
    bgColor:'global.bubble',
    borderRadius: '6px',
    ...mont.md.md,
  }
  return (
    <Pond maxWidth='400px' variant={'alignCenter'}>
      <PondHeader>
        <S color='white'>FrogeX</S>&nbsp;<S color='gray.300'>Dividends</S>
      </PondHeader>
      {u_account&&<TextXs mt='-5px' mb='7px'>For <S fontWeight='bold'>{last4(u_account)}</S></TextXs>}
      <PondBody>
        <VStack>
          <HStack width='100%' justifyContent='space-evenly'>
            <VStack __css={tickerBubbleStyle}><P>FrogeX</P><P>${fxPrice}</P></VStack>
            <VStack __css={tickerBubbleStyle}><P>ETH</P><P>${ethPrice}</P></VStack>
          </HStack>
          {!u_account ? (
            <TextXs>Please connect a wallet to view its FrogeX details
              and optionally claim its due ETH rewards!</TextXs>
          ):(
            <>
              <Bubble>
                <BubLabel>Gross Total Earned Dividends</BubLabel>
                <BubValue>
                  {_xDivsEarnedToDate[1]} ETH
                  <BubSub>(${_xDivsEarnedToDate[2]} USD)</BubSub>
                </BubValue>
              </Bubble>
              <Bubble>
                <BubLabel>Dividends Claimed To Date</BubLabel>
                <BubValue>
                  {_xDivsWithdrawnToDate[1]} ETH
                  <BubSub>(${_xDivsWithdrawnToDate[2]} USD)</BubSub>
                </BubValue>
              </Bubble>
              <Bubble>
                <BubLabel>Unclaimed Dividends</BubLabel>
                <BubValue>
                  {_xDivsAvailable[1]}&nbsp;ETH
                  <BubSub>(${_xDivsAvailable[2]}&nbsp;USD)</BubSub>
                </BubValue>
              </Bubble>
              <br/>
              <Button disabled={!_fxIsClaimEligible || isClaimBtnDisabled}
                      onClick={() => onExecClaim()}>Make Claim</Button>

              <TextXs>Minimum For Claim (Current Setting):</TextXs>
              {/* <MoreInfoPopover> */}
              {/*   We try to set the minimum around $20 USD equivalent - this helps keep the cost */}
              {/*   low on myriad TX, because of the auto-claim feature. For example, imagine you */}
              {/*   are due $4 in rewards, but processing the rewards will cost $5. The FrogeX */}
              {/*   contract prevents this with a minimum claimable setting, which is manually */}
              {/*   adjusted from time to time to keep things running optimally. */}
              {/* </MoreInfoPopover> */}
              <TextXs>{_xMinClaimableDivs[1]}&nbsp;ETH&nbsp;
                (${_xMinClaimableDivs[2]}&nbsp;USD)</TextXs>
            </>
          )}
        </VStack>
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
  _minClaim:'',
}
