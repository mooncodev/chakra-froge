import { fromEventPattern } from 'rxjs';
const [__,__E] = [console.log,console.error];

import { utils, providers } from 'ethers';
import { useWalletStore } from './useWalletStore.js';
import produce from 'immer';
import { chainsMeta } from './core/chainsMeta.js';

export const ethersProviders = {};
export function getProvider(chain) {
  if (!chain)
    return null;
  if (!ethersProviders[chain.rpcUrl]) {
    ethersProviders[chain.rpcUrl] = new providers.StaticJsonRpcProvider(chain.providerConnectionInfo?.url
      ? chain.providerConnectionInfo
      : chain.rpcUrl);
  }
  return ethersProviders[chain.rpcUrl];
}

export const buildWalletAPI = (wallet, set)=>{
  const _s = (fn) => set(produce(fn))
  const __wallet = (s)=>s.wallets.find(v=>v.name===wallet.name)
  const { provider } = wallet
  const { request } = provider
  const chains = ()=>useWalletStore.getState().chains
  async function helperSetChainProps(hexChainId){
    let chainMeta = chains().find(v=>v.chainId===hexChainId)
    if(chainMeta==null){
      chainMeta = chains().find(v=>v.chainId==='0x0')
    }
    _s((s)=>{
      __wallet(s).currentChain = chainMeta.chainId
      __wallet(s).currentChainLabel = chainMeta.label
      __wallet(s).currentChainIcon = chainMeta.icon
    })
  }
  /****** METHODS ******/
  const rv_req = {}
  rv_req.eth_call= async ()=>{}
  rv_req.eth_estimateGas= async ()=>{}
  rv_req.eth_gasPrice= async ()=>{}
  rv_req.eth_getBalance= async ()=>{}
  // rv_req.eth_blockNumber= async ()=>{}
  // rv_req.eth_coinbase= async ()=>{}
  // rv_req.eth_getFilterLogs= async ()=>{}
  // rv_req.eth_getFilterChanges= async ()=>{}
  // rv_req.eth_getLogs= async ()=>{}
  // rv_req.eth_getRawTransactionByHash= async ()=>{}
  // rv_req.eth_getTransactionByHash= async ()=>{}
  // rv_req.eth_getTransactionReceipt= async ()=>{}
  // rv_req.eth_getWork= async ()=>{}
  rv_req.eth_chainId= async ()=>{
    __('eth_chainId')
    return request({ method: 'eth_chainId', })
    .then(async function (id) {
      const resChainId = "0x" + parseInt(id).toString(16);
      __(`[${wallet.name}]eth_chainId-->:`, resChainId);
      await helperSetChainProps(resChainId)
      return resChainId
    })
  }
  rv_req.eth_sendTransaction=(params)=>{
    request({ method: 'eth_sendTransaction', params, })
    .then(res=>res).catch(__E);
  }
  rv_req.wallet_addEthereumChain=async (chain)=>{
    return request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: chain.chainId,
          chainName: chain.label,
          nativeCurrency: {
            name: chain.label,
            symbol: chain.token,
            decimals: 18
          },
          rpcUrls: [chain.rpcUrl],
          iconUrls: [
            `https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/64/${chain.iconRef}.png`
          ]
        }
      ]
    });
  }
  rv_req.wallet_switchEthereumChain= async (chainId)=>{
    try {
      await request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainId }],
      }).then(async(resChainId)=>{
        __(`[${wallet.name}]wallet_switchEthereumChain-->:`, resChainId);
        await helperSetChainProps(resChainId)
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await rv_req.wallet_addEthereumChain(chainId);
        } catch (addError) {// handle "add" error
        }
      }
    }
  }
  rv_req.wallet_watchAsset= async (asset)=>{
    request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', options: {
          address: '0x5fA54fdDF1870C344DbFaBb37dFab8700Ec0Def1',
          symbol: 'FROGEX', decimals: 9,
          image: 'https://froge.fi/brand/froge512o.png', }, },
    })
    .then((success) => {
      if (success) {
        console.log('FROGEX successfully added to wallet!')
      } else {console.error('Something went wrong.')}
    }).catch(console.error)
  }

  const accountsCatch = (err)=>{
    if (err.code === 4001) {// EIP-1193 userRejectedRequest
      __(`[${wallet.name}]userRejectedRequest`);
    } else {__E(err);}_s(s=>{__wallet(s).accounts = [];})
  }

  rv_req.eth_accounts= async ()=>{
    __(`[${wallet.name}]eth_accounts`);
    request({ method: 'eth_accounts' })
    .then((accounts)=>{
      __(`[${wallet.name}]eth_accounts-->:`, accounts);
      _s(s=>{
        __wallet(s).accounts = accounts??[]
      })
    })
    .catch(accountsCatch);
  }
  rv_req.eth_requestAccounts= async ()=>{
    /* restricted method - requires permission */
    request({ method: 'eth_requestAccounts' })
    .then((accounts)=>{
      _s(s=>{
        __wallet(s).accounts = accounts??[]
      })
    })
    .catch(accountsCatch);
  }

  rv_req.disconnect= async ()=>{
    _s(s=>{
      __wallet(s).accounts = []
    })
  }

  // rv_req.wallet_getPermissions= async ()=>{
  //   /* restricted method - requires permission */
  // }
  // rv_req.wallet_requestPermissions= async ()=>{
  //   /* restricted method - requires permission */
  // }
  // rv_req.eth_decrypt= async ()=>{}
  // rv_req.eth_getEncryptionPublicKey= async ()=>{}



  /****** LISTENERS ******/
  const rv_on = {}
  rv_on.connect=({ chainId })=>{
    __(`[${wallet.name}]on.connect`,chainId);
    _s(s=>{
      __wallet(s).currentChain = provider.chainId
    })
  }
  rv_on.disconnect=(err)=>{
    __(`[${wallet.name}]on.disconnect`,err);
    _s(s=>{
      __wallet(s).currentChain = '0x0'
      __wallet(s).accounts = []
    })
  }
  rv_on.accountsChanged=(accounts)=>{
    __(`[${wallet.name}]on.accountsChanged`,accounts)
    _s(s=>{
      __wallet(s).accounts = accounts??[]
      __wallet(s).currentAccount = accounts[0]??''
    })

  }
  rv_on.chainChanged=async(_chainId)=>{
    __(`[${wallet.name}]on.chainChanged`,_chainId);
    if(wallet.name==="Binance"){
      _chainId = `0x${parseInt(_chainId).toString(16)}`
    }
    await helperSetChainProps(_chainId)
    // window.location.reload();
  }
  rv_on.message=({ sType, data })=>{
    __(`[${wallet.name}]on.message`,sType, data)
  }

  return {request:rv_req, on:rv_on}
}

