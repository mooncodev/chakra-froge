import { atom } from 'jotai';
import axios from 'axios';
import create from 'zustand';
import { FXP, readFX, stx } from '../stx/stx.js';
import { sExp, sMul, sRnd } from '../helpers/math/zmath.mjs';
import addr from '../data/addresses.js';
import { connectors } from '../views/app/Wallet/connectors.js';
import { mockEthBal, mockFxGetAccount1 } from './mocks.js';
import { envPHASE } from '../data/constants.js';

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

export const useFxStore = create((set,get) => ({
  fxPrice:'-',
  _xMinClaimableDivs:['','',''],
  xGetDivsGlobalTotalDist:'',
  fxGetConfigRaw: {},
  fxGetConfigLabels: [],
  fxGetConfigArrArr: [[]],
  hydrateFxStore: async (state) => {
    const fxPrice = await FXP.getFxPrice();
    const xGetDivsGlobalTotalDist = await readFX('xGetDivsGlobalTotalDist')
    const cfg = await readFX('getConfig')
    if(cfg) {
      const labels = Object.entries(cfg).map((k,v)=>`${k}: ${v}`)
      const arrarr = Object.entries(cfg).map((k,v)=>[k,v])
      const ethPrice = useCrawlStore.getState().ethPrice
      const _minClaimTuple = balToHrTuple(cfg._xMinClaimableDivs, 18, ethPrice)
      set({ fxPrice:fxPrice,_xMinClaimableDivs:_minClaimTuple,
        xGetDivsGlobalTotalDist:xGetDivsGlobalTotalDist, fxGetConfigRaw: cfg,
        fxGetConfigLabels: labels,fxGetConfigArrArr: arrarr});
    }
    return get().fxGetConfigRaw
  },
}))

export function balToHrTuple(rawBal, decimal, usdPrice){
  //pure: returns array as [rawBal, decimalAdjustedBal, usdEquivalent]
  const decimalAdjustedBal = sRnd(sExp(rawBal,-decimal),-4)
  const usdEquivalent = sRnd(sMul(decimalAdjustedBal,usdPrice),-2)
  return [rawBal,decimalAdjustedBal,usdEquivalent]
}
export const epoch = {
  now: ()=>Math.floor(Date.now()/1000),
  diff: (epoch)=>Math.floor(Date.now()/1000)-epoch,
}

export const useFxAccountStore = create((set,get) => ({
  _ethBalance:['','',''],
  _balance: ['','',''],
  _xDivsAvailable: ['','',''],
  _xDivsEarnedToDate: ['','',''],
  _xDivsWithdrawnToDate: ['','',''],
  _isAMMPair: '',
  _isBlackListedBot: '',
  _isExcludedFromRwds: '',
  _isExcludedFromFees: '',
  _fxIsClaimEligible: false,
  execClaim:async(u_account)=>{
    return await stx({
      from:u_account,to: addr.mainnet.FROGEX.ERC20,
      path: ['FrogeX','xClaim'],})
  },
  hydrateEthBalance:async()=>{
    const state = useW3Store.getState();
    const lib = state.n_library;
    if(!lib){return}
    const u_account = useW3Store.getState().u_account;
    let _ethBalance = envPHASE>0?await lib.getBalance(u_account)
      :mockEthBal
    _ethBalance=  _ethBalance.toString()
    const ethPrice = useCrawlStore.getState().ethPrice
    const _ethBalanceTuple = balToHrTuple(_ethBalance, 18, ethPrice)
    set({_ethBalance:_ethBalanceTuple})
  },
  removeAccount:()=>{
    set({
      _balance: ['','',''],
      _xDivsAvailable: ['','',''],
      _xDivsEarnedToDate: ['','',''],
      _xDivsWithdrawnToDate: ['','',''],
      _isAMMPair: '',
      _isBlackListedBot: '',
      _isExcludedFromRwds: '',
      _isExcludedFromFees: '',
      _fxIsClaimEligible: false,});
  },
  hydrateFxGetAccount:async()=>{
    await get().hydrateEthBalance()
    const u_account = useW3Store.getState().u_account;
    if(!u_account){get().removeAccount();return;}//TODO: implement full reset this line
    const { _balance, _xDivsAvailable,
      _xDivsEarnedToDate, _xDivsWithdrawnToDate,
      _isAMMPair, _isBlackListedBot,
      _isExcludedFromRwds, _isExcludedFromFees,
    } = envPHASE>0?await readFX('getAccount',[u_account])
      :mockFxGetAccount1
    const fxPrice = useFxStore.getState().fxPrice
    const ethPrice = useCrawlStore.getState().ethPrice
    const minForClaim = useFxStore.getState()._xMinClaimableDivs[0];
    const _balanceTuple = balToHrTuple(_balance, 9, fxPrice)
    const _xDivsAvailableTuple = balToHrTuple(_xDivsAvailable, 18, ethPrice)
    const _xDivsEarnedToDateTuple = balToHrTuple(_xDivsEarnedToDate, 18, ethPrice)
    const _xDivsWithdrawnToDateTuple = balToHrTuple(_xDivsWithdrawnToDate, 18, ethPrice)
    const reqMet = _xDivsAvailable > minForClaim
    set({ _balance:_balanceTuple,
      _xDivsAvailable:_xDivsAvailableTuple,
      _xDivsEarnedToDate:_xDivsEarnedToDateTuple,
      _xDivsWithdrawnToDate:_xDivsWithdrawnToDateTuple,
      _isAMMPair:_isAMMPair,
      _isBlackListedBot:_isBlackListedBot,
      _isExcludedFromRwds:_isExcludedFromRwds,
      _isExcludedFromFees:_isExcludedFromFees,
      _fxIsClaimEligible:reqMet,
    })
  },
}))


export const useW3Store = create((set,get) => ({
  u_library:null,
  u_chainId:'',
  u_account:'',
  u_error:'',
  u_active:'',
  u_activate:null,
  u_deactivate:null,
  n_library:null,
  n_chainId:'',
  n_account:'',
  n_error:'',
  n_active:'',
  n_activate:null,
  n_deactivate:null,
  activateNetwork:async()=>{
    (get().n_activate && await get().n_activate(connectors.network));
  },
  activateUser:async(connector)=>{
    (get().u_activate && await get().u_activate(connector));
  },
  u_init:async(u_)=>{
    set({
      u_library:u_.library,
      u_chainId:u_.chainId,
      u_account:u_.account,
      u_error:u_.error,
      u_active:u_.active,
      u_activate:u_.activate,
      u_deactivate:u_.deactivate,
    })
    await get().activateNetwork();
  },
  n_init:async(n_)=>{
    set({
      n_library:n_.library,
      n_chainId:n_.chainId,
      n_account:n_.account,
      n_error:n_.error,
      n_active:n_.active,
      n_activate:n_.activate,
      n_deactivate:n_.deactivate,
    })
    await get().activateNetwork();
  },
}))

export const useCrawlStore = create((set,get) => ({
  ethPrice: '-',
  ethPriceTS: '-',
  fetch_ethPrice: async (state) => {
    if(epoch.diff(get().ethPriceTS) < 5){
      console.log('too soon to update ethPrice');
      return get().ethPrice;
    }
    set({ethPriceTS: epoch.now()});
    console.log('OK updating ethPrice')
    const res = await axios('/api/etherscan?method=ethPrice')
    if(res.data) {
      set({ethPrice: res.data});
    }
    return get().ethPrice
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
