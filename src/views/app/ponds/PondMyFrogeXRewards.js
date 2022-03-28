// Chakra imports
import {
  Box,
  Button,
  Flex,
  Image,
  Popover,
  PopoverArrow, PopoverBody, PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  VStack,
} from '@chakra-ui/react';
import {Pond,PondBody,PondHeader} from '../bits/Pond.js';
import React, { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
import { call, stx, claimFX, FX, readFX } from 'stx/stx.js';
import { olaToObject } from '../../../helpers/deep.js';
import { useCrawlStore } from '../../../services/atoms.js';
import { BtnXs, sxFrogeEyeEyeBeforeBg, TextXs } from '../bits/UtilityTags.js';


let _execClaimFn = ()=>{}


export default function PondMyFrogeXRewards() {

  const {chainId:u_chainId,account:u_account,active:u_active,} = useWeb3React()
  const {chainId:n_chainId,account:n_account,active:n_active,} = useWeb3React('NETWORK')

  const [_getAccount, set_getAccount] = useState({})
  const [_balanceOf, set_balanceOf] = useState('')
  const ucs_ethPrice = useCrawlStore(state => state.ethPrice)
  const [isClaimBtnDisabled, set_isClaimBtnDisabled] = useState(false)

  const [_ethPrice,set_ethPrice] = useState('')
  const [_fxPrice,set_fxPrice] = useState('')
  const [_rewardWeiAvailAsEth,set_rewardWeiAvailAsEth] = useState('')
  const [_rewardWeiAvailAsUSD,set_rewardWeiAvailAsUSD] = useState('')
  const [_xMinClaimableDivsAsEth,set_xMinClaimableDivsAsEth] = useState('')
  const [_xMinClaimableDivsAsUSD,set_xMinClaimableDivsAsUSD] = useState('')
  const [_requirementMet,set_requirementMet] = useState('')


  useEffect(async ()=>{
    if(u_account && ucs_ethPrice) {
      set_getAccount(await FX.getAccount(u_account));
      await u_xclaim();
    }
  },[u_account,ucs_ethPrice])

  const u_xclaim = async() => {
    const rcpt = await claimFX(u_account,(data,execFn)=>{
      console.log('claim data: ', data);
      set_ethPrice(data._ethPrice)
      set_fxPrice(data._fxPrice)
      set_rewardWeiAvailAsEth(data._rewardWeiAvailAsEth)
      set_rewardWeiAvailAsUSD(data._rewardWeiAvailAsUSD)
      set_xMinClaimableDivsAsEth(data._xMinClaimableDivsAsEth)
      set_xMinClaimableDivsAsUSD(data._xMinClaimableDivsAsUSD)
      set_requirementMet(data._requirementMet)
      _execClaimFn = execFn
    })
  };
  const u_call = async() => {
    // set_getAccount(olaToObject(await stx({
    //   from:u_account,to: addr.mainnet.FROGEX.ERC20,
    //   path: ['FrogeX','getAccount'],})))
    // set_balanceOf(await readFX('balanceOf',[u_account]))
    // const {} = await FX.getAccount(u_account)
    // FX.getAccountFormatTechLabels()
    // FX.totalSupply
    // FX.xGetDivsGlobalTotalDist
    // getAmountOut()
  };
  const n_call = async() => {
    set_getAccount(olaToObject(await readFX('getAccount')))
  };
  const onExecClaim = async() => {
    set_isClaimBtnDisabled(true)
    const res = await _execClaimFn();
    set_isClaimBtnDisabled(false)
  };

  return (
    <Pond minHeight="290.5px" p="1.2rem"
          sx={sxFrogeEyeEyeBeforeBg}>
      <PondHeader>My FrogeX Rewards</PondHeader>
      <PondBody>
        <VStack>
          {!u_account ? (
            <TextXs>Please connect a wallet to view its FrogeX details
              and optionally claim its due ETH rewards!</TextXs>
          ):(
            <Box w="100%">
              <TextXs>
                u_account : {u_account}<br/>
                u_active : {String(u_active)}<br/>
                u_chainId : {u_chainId}<br/>
                <br/>
                ETH Price: {_ethPrice}<br/>
                FX Price: {_fxPrice}<br/>
                ETH Available: {_rewardWeiAvailAsEth}<br/>
                (USD Value: {_rewardWeiAvailAsUSD})<br/>
                Minimum For Claim: {_xMinClaimableDivsAsEth}<br/>
                (USD Value: {_xMinClaimableDivsAsUSD})<br/>
                <Button disabled={!_requirementMet || isClaimBtnDisabled}
                        onClick={()=>onExecClaim()}>Make Claim</Button><br/>
                {!_requirementMet &&
                  <>We try to set the minimum around $20 USD equivalent
                    - this helps keep the cost low on myriad TX,
                    because of the auto-claim feature. For example,
                    imagine you are due $4 in rewards, but processing
                    the rewards will cost $5. The FrogeX contract prevents
                    this with a minimum claimable setting, which is manually
                    adjusted from time to time to keep things running optimally.
                  </>
                }
              </TextXs>

              {/* <BtnXs disabled={isClaimBtnDisabled} */}
              {/*        onClick={()=>u_xclaim()}>Claim Rewards</BtnXs> */}
            </Box>
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
  _xMinClaimableDivs:'',
}
