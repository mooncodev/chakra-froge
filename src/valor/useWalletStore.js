import React from 'react';
import create from 'zustand';
import produce from 'immer';
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider);
import { initWallets } from './core/walletsMeta.js';
import { getDevice } from './core/getDevice.js';
import { initChains } from './core/chainsMeta.js';


export const device = getDevice();
export const useWalletStore = create((set,get) => ({
  anon:{},
  user:[{}],
  providers:[],
  injectedProviders:[],
  chains:[],
  wallets:[],
  web3:web3,
  initWalletStore:async()=>{
    // if approved via localstorage, load ref wallet
    await initChains()
    await initWallets()
  },
  getChainById:(chainId)=>{
    get().chains.find((v)=>v.chainId === chainId)
  },
  connect:async(wallet)=>{
    wallet.request.connect(wallet)
    window.localStorage.setItem(`wallet_${wallet.label}`, wallet);
  },
  disconnect:async(wallet)=>{
    wallet.request.disconnect(wallet)
    window.localStorage.setItem(`wallet_${wallet.label}`, undefined);
  },

  updateAccounts:async(wallet, accounts)=>{

  },
  anonCall:async()=>{

  },
  userCall:async()=>{

  },
  userStx:async()=>{

  },

  walletContext:{},
  set_walletContext: async (wallet) => {
    set({walletContext:wallet});
  },
  walletContextDrawerIsOpen:false,
  set_walletContextDrawerIsOpen: async (bOpen) => {
    set({walletContextDrawerIsOpen:bOpen});
  },

  _s: (fn) => set(produce(fn)),
}))


