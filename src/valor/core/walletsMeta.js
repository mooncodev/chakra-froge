import { createEIP1193Provider } from './eip-1193.js';
import { buildWalletAPI, } from '../buildWalletAPI.js';
import { useWalletStore } from '../useWalletStore.js';
import produce from 'immer';
import { chainsMeta } from './chainsMeta.js';
const __ = console.log;
const UNSUPPORTED_METHOD = null;
const cm = chainsMeta
const injPath = {
  //[<window.root>, <flag found at providers' roots>]
  Binance:['BinanceChain','bbcSignTx'],
  BinanceAlt:['BinanceChain','isToshi'],
  Coinbase:['ethereum','isCoinbaseWallet'],
  Detected:['ethereum','request'],
  MetaMask:['ethereum','isMetaMask'],
}
const identify=(provider, flag)=>!!provider && !!provider[flag];
const findIcon=(id)=> async () => {
  return (await import(`../icons/wallet/${id}.js`)).default
};

const findProvider=(root,flag)=> {
  if(!window[root]){
    return null;
  }
  else if(window[root].providers && Array.isArray(window[root].providers)){
    return window[root].providers.find(v => !!v[flag]);
  }
  else if(window[root][flag]){
    return window[root];
  }
  else{
    return null;
  }
};

const injInit=(self)=>{
  const root = self.detect();
  self.detected = !!root;
  self.request = self.getInterface().provider.request;
  self.on = self.getInterface().provider.on;
}

//https://binance-wallet.gitbook.io/binance-chain-wallet/dev/introduction
//https://documenter.getpostman.com/view/4117254/ethereum-json-rpc/RVu7CT5J#dd57ef90-f990-037e-5512-4929e7280d7c
let Binance = {
  name: 'Binance', label: 'Binance Smart Wallet',
  platforms: 'desktop', iconRef: 'binance',
}
let Coinbase = {
  name: 'Coinbase', label: 'Coinbase Wallet',
  platforms: 'all', iconRef: 'coinbase',
}
let MetaMask = {
  name: 'MetaMask',label: 'MetaMask',
  platforms: 'all', iconRef: 'metamask',
}
const supportedWallets = [
  Binance,
  Coinbase,
  MetaMask
]


export async function initWallets(){
  const set = useWalletStore.setState

  for(let wallet of supportedWallets){
    const provider = findProvider(...injPath[wallet.name])

    if(provider==null){continue}
    const icon =(await import(`../icons/wallet/${wallet.iconRef??'question'}.svg`)).default
    const walletRV = {
      name:wallet.name,
      label:wallet.label,
      platforms:wallet.platforms,
      accounts:[],
      currentAccount:'',
      provider: provider,
      detect:()=> findProvider(...injPath[wallet.name]),
      icon: icon,
    }

    const {request, on} = buildWalletAPI(walletRV,set)
    walletRV.request = request;
    walletRV.on = on;

    Object.entries(walletRV.on).forEach(([k,v])=>walletRV.provider.on(k, v))
    set(produce(s=>{s.wallets.push(walletRV)}))

    //request.eth_chainId() populates currentChain and currentChainLabel
    await walletRV.request.eth_chainId();
    // await walletRV.request.eth_accounts()

    // wallets.push(walletRV)
  }
  // set({wallets:wallets})
}



