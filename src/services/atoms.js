import { atom, useAtom } from 'jotai';
import axios from 'axios';
import create from 'zustand'
import { FX, FXP, readFX, stx } from '../stx/stx.js';
import { sExp, sMul, sRnd } from '../helpers/math/zmath.mjs';
import addr from '../data/addresses.js';
import { connectors } from '../views/app/Wallet/connectors.js';
import { getWeb3ReactContext, useWeb3React, Web3ReactProvider } from '@web3-react/core';

// const priceAtom = atom(10)
// const messageAtom = atom('hello')
// const productAtom = atom({ id: 12, name: 'good stuff' })
//
// const readOnlyAtom = atom((get) => get(priceAtom) * 2)
// const writeOnlyAtom = atom(
//   null, // it's a convention to pass `null` for the first argument
//   (get, set, update) => {
//     // `update` is any single value we receive for updating this atom
//     set(priceAtom, get(priceAtom) - update.discount)
//   }
// )
// const readWriteAtom = atom(
//   (get) => get(priceAtom) * 2,
//   (get, set, newPrice) => {
//     set(priceAtom, newPrice / 2)
//     // you can set as many atoms as you want at the same time
//   }
// )

export const appNavDrawerOpenAtom = atom(false)
export const wcModalIsOpenAtom = atom(false)

export const useFxRewardsStore = create((set,get) => ({
  _ethPrice: null,
  _fxPrice: null,
  _rewardWeiAvail: null,
  _rewardWeiAvailAsUSD: null,
  _rewardWeiAvailAsEth: null,
  _xMinClaimableDivs: null,
  _xMinClaimableDivsAsUSD: null,
  _xMinClaimableDivsAsEth: null,
  _requirementMet: null,
  execClaim:async(u_account)=>{
    return await stx({
      from:u_account,to: addr.mainnet.FROGEX.ERC20,
      path: ['FrogeX','xClaim'],})
  },
  hydrateRewardsInfo: async (state) => {
    // let _rewardWeiAvail = await call(addr.mainnet.FROGEX.ERC20,
    //   ['FrogeX','xGetDivsAvailable'],[u_account])
    let _rewardWeiAvail = sExp(.004324,18)
    await useCrawlStore.getState().fetch_fx_getConfig()
    const ucsgs = useCrawlStore.getState().fx_getConfigRaw
    const {_xMinClaimableDivs} = ucsgs
    const _ethPrice =  useCrawlStore.getState().ethPrice;
    const _fxPrice = await FXP.getFxPrice();
    const _rewardWeiAvailAsEth = sExp(_rewardWeiAvail,-18)
    const _xMinClaimableDivsAsEth = sExp(_xMinClaimableDivs,-18)
    const _rewardWeiAvailAsUSD = sRnd(sMul(_rewardWeiAvailAsEth,_ethPrice),-2)
    const _xMinClaimableDivsAsUSD = sRnd(sMul(_xMinClaimableDivsAsEth,_ethPrice),-2)
    const _requirementMet = _rewardWeiAvail>_xMinClaimableDivs
    set({
      _ethPrice: _ethPrice,
      _fxPrice: _fxPrice,
      _rewardWeiAvail: _rewardWeiAvail,
      _rewardWeiAvailAsUSD: _rewardWeiAvailAsUSD,
      _rewardWeiAvailAsEth: _rewardWeiAvailAsEth,
      _xMinClaimableDivs: _xMinClaimableDivs,
      _xMinClaimableDivsAsUSD: _xMinClaimableDivsAsUSD,
      _xMinClaimableDivsAsEth: _xMinClaimableDivsAsEth,
      _requirementMet: _requirementMet,
    },(_requirementMet?execClaim:()=>{}))
    async function execClaim(u_account){
      return await stx({
        from:u_account,to: addr.mainnet.FROGEX.ERC20,
        path: ['FrogeX','xClaim'],})
    }
  },
}))

export const useW3Store = create((set,get) => ({
  u_chainId:'',
  u_account:'',
  u_error:'',
  u_active:'',
  u_activate:()=>{},
  u_deactivate:()=>{},
  n_chainId:'',
  n_account:'',
  n_error:'',
  n_active:'',
  n_activate:()=>{},
  n_deactivate:()=>{},
  activateNetwork:async()=>{
    await get().n_activate(connectors.network);
  },
  activateUser:async(connector)=>{
    await get().u_activate(connector);
  },

}))

export const useCrawlStore = create((set,get) => ({
  ethPrice: 0,
  fetch_ethPrice: async (state) => {
    const res = await axios('/api/etherscan?method=ethPrice')
    if(res.data && res.data.response) {
      set({ ethPrice: res.data.response });
    }
    return get().ethPrice
  },
  fx_getConfigRaw: {},
  fx_getConfigLabels: [],
  fx_getConfigArrArr: [[]],
  fetch_fx_getConfig: async (state) => {
    const cfg = await readFX('getConfig')
    if(cfg) {
      const labels = Object.entries(cfg).map((k,v)=>`${k}: ${v}`)
      const arrarr = Object.entries(cfg).map((k,v)=>[k,v])
      set({ fx_getConfigRaw: cfg,
        fx_getConfigLabels: labels,
        fx_getConfigArrArr: arrarr});
    }
    return get().fx_getConfigRaw
  },
}))


// const ethPriceAtom = atom('')

// export const ethPrice = atom(
//   (get) => get(ethPriceAtom),
//   async (get, set, update) => {
//     await axios('/api/etherscan?method=ethPrice').then(res=>{
//       if(res.data && res.data.response) {
//         set(ethPriceAtom, res.data.response);
//       }
//     })
//   })
//
// export const setEthPrice = atom(
//   null, // it's a convention to pass `null` for the first argument
//   async (get, set, update) => {
//     await axios('/api/etherscan?method=ethPrice').then(res=>{
//       if(res.data && res.data.response) {
//         set(ethPriceAtom, res.data.response);
//       }
//     })
//   }
// )
export const w3Atom = atom({
  user: false,
  network: false,
})

// const readWriteAtom = atom(
//   (get) => get(priceAtom) * 2,
//   (get, set, newPrice) => {
//     set(priceAtom, newPrice / 2)
//     // you can set as many atoms as you want at the same time
//   }
// )
