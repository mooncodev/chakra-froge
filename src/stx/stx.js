const [__,__E,__W] = [console.log,console.error,console.warn];
import Web3 from 'web3';

import abiFrags from './abiFragments';
import addr from '../data/addresses.js';

import { ethers } from 'ethers';
import { olaToObject } from '../helpers/deep.js';
import { atom } from 'jotai';

import { useCrawlStore, useUserStore, useW3Store } from 'services';
import {
  getAmountOut, sMul, weiToUSD, sExp, _Mul, _Add, _Div, sRnd
} from '../helpers/math/zmath.mjs';

const web3 = new Web3(Web3.givenProvider);

function _sleep(ms) {//usage: await _sleep(5000);
  return new Promise(resolve => setTimeout(resolve, ms));
}
export async function evaluateTransaction(
  contract,  //: Contract | null,
  methodName,  //: string,
  args  //: Array<string | number | BigNumber>
) {
  try {
    const methods = contract.callStatic
    return await methods[methodName](...args)
  } catch (e) {
    __(e);return e;
  }
}
export const WETH = {
  balanceOf:async(acct)=>olaToObject(await call(addr.mainnet.WETH.ERC20,
    ['ERC20','balanceOf'], [acct])),
}
export const FX = {
  /** const { \_balance, \_xDivsAvailable, \_xDivsEarnedToDate, \_xDivsWithdrawnToDate,
  \_isAMMPair, \_isBlackListedBot, \_isExcludedFromRwds, \_isExcludedFromFees }
   = await FX.getAccount(addr); */
  getAccount:async(acct)=>readFX('getAccount', [acct]),
  balanceOf:async(acct)=>readFX('balanceOf', [acct]),
  xGetDivsAvailable:async(acct)=>readFX('xGetDivsAvailable', [acct]),
  xGetDivsEarnedToDate:async(acct)=>readFX('xGetDivsEarnedToDate', [acct]),
  xGetDivsWithdrawnToDate:async(acct)=>readFX('xGetDivsWithdrawnToDate', [acct]),
  /** const { \_hopThreshold, \_lqtyThreshold, \_lockerUnlockDate, \_xGasForClaim,
  \_xMinClaimableDivs, \_tradingEnabled, \_ttlFeePctBuys, \_ttlFeePctSells,
  \_ethPtnChty, \_ethPtnMktg,_tknPtnLqty, \_ethPtnLqty, \_ethPtnRwds }
   = await FX.getConfig(); */
  getConfig:async()=>readFX('getConfig', []),
  name:async()=>readFX('name', []),
  owner:async()=>readFX('owner', []),
  symbol:async()=>readFX('symbol', []),
  totalSupply:async()=>readFX('totalSupply', []),
  xGetDivsGlobalTotalDist:async()=>readFX('xGetDivsGlobalTotalDist', []),
  xTotalSupply:async()=>readFX('xTotalSupply', []),
  getUniV2Pair:async()=>readFX('getUniV2Pair', []),
  getConfigFormatTechLabels:async (rv=[]) => {
    const cfg = await FX.getConfig();
    for(let [k,v] of Object.entries(cfg)){rv.push(k+': '+v)}
    return rv;
  },
  getConfigFormatArrArr:async (rv=[]) => {
    const cfg = await FX.getConfig();
    for(let [k,v] of Object.entries(cfg)){rv.push([k,v])}
    return rv;
  },
}
export const FXP = {
  balanceOf:async()=>readFXP('UniswapV2Pair', []),
  token0:async()=>readFXP('token0', []),//FROGEX
  token1:async()=>readFXP('token1', []),//WETH
  getReserves:async()=> {
    // const rsvFX = await FX.balanceOf(addr.mainnet.FROGEX.PAIR)
    // const rsvWETH = await WETH.balanceOf(addr.mainnet.FROGEX.PAIR)
    const gRsvs = await readFXP('getReserves', [])
    // __(gRsvs)
    const { reserve0,reserve1 } = gRsvs;
    return [reserve0,reserve1] //TODO: unburden multicall
  },
  getAmountOut:async(amountIn,nTokenIn)=> {
    //nTokenIn: 0 is frogex in (for sells), 1 is eth in (for buys)
    const [fx1,weth1] = await FXP.getReserves()
    const [reserveIn,reserveOut] = nTokenIn?[weth1,fx1]:[fx1,weth1]
    let amountInWithFee = _Mul(amountIn,997);
    let numerator = _Mul(amountInWithFee,reserveOut);
    let denominator = _Add(_Mul(reserveIn,1000),amountInWithFee);
    let amountOut = _Div(numerator, denominator);
    return amountOut;
  },
  getFxPrice:async()=> {
    let weiOut = await FXP.getAmountOut(1_000_000_000,0);
    await useCrawlStore.getState().fetch_ethPrice()
    return weiToUSD(weiOut,useCrawlStore.getState().ethPrice);
  },
}

export async function readFX(method, args=[]){
  return olaToObject(await call(addr.mainnet.FROGEX.ERC20,
    ['FrogeX',method],args))
}
export async function readFXP(method, args=[]){
  return olaToObject(await call(addr.mainnet.FROGEX.PAIR,
    ['UniswapV2Pair',method],args))
}

export async function call(address,path,args=[]){
  const fnAbi = abiFrags[path[0]].find(v=>v.name===path[1])
  const failRV = fnAbi.outputs.length<2? '' : fnAbi.outputs.map(v=>'');
  if(!['pure','view'].includes(fnAbi.stateMutability)){
    __E('call() should only be used with pure/view methods')
    return failRV;
  }
  if(web3==null||web3.eth==null){return failRV;}
  const _encodeFunctionCall = web3.eth.abi.encodeFunctionCall(fnAbi, args);
  let _tx = {to: address, data: _encodeFunctionCall};
  const rcpt = await web3.eth.call(_tx)
    .catch((err)=>{__E(`in call():`,err)})
  return decodeAndConvertBcRv(rcpt, fnAbi)
}

const decodeAndConvertBcRv = (bcRv, fnAbi)=>{
  try{
    if(fnAbi.outputs.length===1){
      return web3.eth.abi.decodeParameter(fnAbi.outputs[0].type, bcRv);
    }else if(fnAbi.outputs.length>1){
      //converts numbered object to object-like-array
      const numdObj = web3.eth.abi.decodeParameters(fnAbi.outputs.map(v=>v.type), bcRv);
      const outputOLA = [];
      for (let i=0;i<fnAbi.outputs.length;i++) {
        outputOLA.push(numdObj[i]);
        outputOLA[fnAbi.outputs[i].name] = numdObj[i]
      }
      return outputOLA;
    }else{__E(`Unexpected zero outputs for ${fnAbi.name} `,bcRv)}
  }
  catch(err){
    __E(`Reciept would not process for ${fnAbi.name}`,bcRv,err);
    return null
  }
}

export async function onHistory(evt,hID,data,e){
  if(evt==='hID'){console.log(evt, data)}
  if(evt==='transactionHash'){console.log(evt, data)}
  if(evt==='receipt'){console.log(evt, data)}
  if(evt==='confirmation'){console.log(evt, data)}
  if(evt==='error'){console.log(evt, data)}
}

/** stx() - acronym for web3's "sendTransaction()"
 * @returns callback system based on web3 events */
export async function stx(params) {
  const {from='',to='',path='',value='',args=[], on=()=>{}} = params;
  const hID = 'st'+web3.utils.randomHex(4).substring(1) // "stx4a9Af6" //TODO: increase hex size

  const _on = (evt,data,e)=>{
    on(evt,hID,from,data,e);
    useUserStore.getState().setHistory(evt,hID,from,data,e)
  }
  _on('hID', params)
  if(!path && value){return sendEth({from:from,to:to,value:value,on:on})}
  const fnAbi = abiFrags[path[0]].find(v=>v.name===path[1])
  if(!fnAbi){__E(`${path} had no matching Abi`)}
  const failRV = fnAbi.outputs.length<2? '' : fnAbi.outputs.map(v=>'');
  if(web3.eth==null){on('error',failRV);return failRV;}
  if(['pure','view'].includes(fnAbi.stateMutability)){
    return call(to,path,args)}
  if(!['nonpayable', 'payable'].includes(fnAbi.stateMutability)){
    __E('stx could not find stateMutability as payable/nonpayable')
    return failRV;}

  let _tx = {to:to,from:from,data:web3.eth.abi.encodeFunctionCall(fnAbi, args)};
  if(value){_tx.value = value;}
  let nonce = await web3.eth.getTransactionCount(from, 'latest');
  _tx.nonce = nonce++;

  _tx.gas = await web3.eth.estimateGas(_tx).then((res)=>{
    __(`[${path}] estGas: `,res)
    return res;
  }).catch((err)=>{
    __(`[${path}] estGas failed: `,err);
    _on('err',`[${path}] web3.eth unavailable - exiting`);
    return null;
  });
  if(!_tx.gas){return failRV;}

  return web3.eth.sendTransaction(_tx)
  .on('transactionHash', (hash)=>{_on('hash',hash);})
  .on('receipt', async (rcpt)=>{
    _on('rcpt',rcpt);
    try{
      const bcOut = decodeAndConvertBcRv(rcpt.rawData, fnAbi)
      _on('out',bcOut);
    }catch(e){_on('out',null, e);}
  })
  .on('confirmation', (confNum)=>{
    __(`stx conf!: `,confNum);
    _on('conf',confNum);
  })
  .on('error', (err)=>{
    __(`stx err!(A): `,err);
    _on('err',err);
  })
  .catch(err=> {
    __('stx err!(B)',err)
    _on('err', err);
  })

}






export async function sendEth({from,to,value,on}){
  web3.eth.sendTransaction({ from: from, to: to, value: value })
  .on('transactionHash', (hash)=>{on('transactionHash',hash);})
  .on('receipt', async (rcpt)=>{
    try{
      on('receipt',rcpt);
    }catch(e){on('receiptFail',rcpt, null, e);}
  })
  .on('confirmation', (confNum, rcpt)=>{on('confirmation',confNum,rcpt);})
  .on('error', (err)=>{on('error',err);})

}
