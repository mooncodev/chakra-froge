/*

import { createEIP1193Provider, ProviderRpcError } from './common.js';
import bowser from 'bowser';
export const ProviderRpcErrorCode = {
  ACCOUNT_ACCESS_REJECTED: 4001,
  UNAUTHORIZED: 4100,
  UNSUPPORTED_METHOD: 4200,
  DISCONNECTED: 4900,
  CHAIN_DISCONNECTED: 4901,
  CHAIN_NOT_ADDED: 4902,
  ACCOUNT_ACCESS_ALREADY_REQUESTED: -32002,
  DOES_NOT_EXIST: -32601,
  INVALID_PARAMS: -32602,
}
const INFURA_ID = 'r3b978u3f49nbf3b9'
const picon = 'r3b978u3f49nbf3b9'
const UNSUPPORTED_METHOD = null;
/!**
 * Takes a provider instance along with events
 * and requests to override and returns an EIP1193 provider
 *
 *  ## Example:
 *
 * *Overriding events: *
 * ```typescript
 * ```
 *
 * @param provider The provider to patch
 * @param requestPatch An `object` with the method to patch
 * and the implementation with which to patch
 * @param events Events to patch
 * @returns An EIP1193 Provider
 *!/
const createEIP1193Provider = (provider, requestPatch) => {
  let baseRequest;
  if (provider.request) {
    // Copy the original request method and bind the provider context to it
    baseRequest = provider.request.bind(provider);
  }
  else if (provider.sendAsync) {
    baseRequest = createRequest(provider);
  }
  const request = async ({ method, params }) => {
    const key = method;
    // If the request method is set to null
    // this indicates this method is not supported
    if (requestPatch && requestPatch[key] === null) {
      throw new ProviderRpcError({
        code: 4200,
        message: `The Provider does not support the requested method: ${method}`
      });
    }
    if (requestPatch && requestPatch[key]) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore // @TODO - Fix this type error
      return requestPatch[key]({ baseRequest, params });
    }
    else if (baseRequest) {
      return baseRequest({ method, params });
    }
    else {
      throw new ProviderRpcError({
        code: 4200,
        message: `The Provider does not support the requested method: ${method}`
      });
    }
  };
  provider.request = request;
  return provider;
};

const identify=(provider, flag)=>!!provider && !!provider[flag];
const matchFlag=(flag)=> async () => ({
  provider: (window.ethereum.providers && Array.isArray(window.ethereum.providers)
    ? window.ethereum.providers.find(v=>!!v[flag]) : window.ethereum)
});

export const walletMeta = {

  AlphaWallet: {
    label: 'AlphaWallet', flag: 'isAlphaWallet',
    injectedNamespace: 'ethereum',
    checkProviderIdentity: ({ provider }) =>
      identify(provider, this.AlphaWallet.flag),
    getIcon: async () => (await import('./icons/wallet/alphawallet.js')).default,
    getInterface: async () => ({
      provider: createEIP1193Provider(window.ethereum, {
        wallet_switchEthereumChain: UNSUPPORTED_METHOD,
        eth_selectAccounts: UNSUPPORTED_METHOD
      })
    }),
    platforms: ['mobile'],
    supported: false
  },
  AToken: {
    label: 'AToken', flag: 'isAToken',
    injectedNamespace: 'ethereum',
    checkProviderIdentity:({provider})=>identify(provider,this.AToken.flag),
    getIcon: async () => (await import('./icons/wallet/atoken.js')).default,
    getInterface: async () => ({ provider: window.ethereum }),
    platforms: ['mobile'],
    supported: false
  },
  Binance: {
    label: 'Binance Smart Wallet', flag: 'bbcSignTx',
    injectedNamespace: 'BinanceChain',
    checkProviderIdentity: ({ provider }) =>
      identify(provider, this.Binance.flag),
    getIcon: async () => (await import('./icons/wallet/binance.js')).default,
    getInterface: ()=>{
      // We add this to the BinanceChain provider as there is currently
      // no way to determine if the wallet is unlocked
      if (window.BinanceChain) {
        window.BinanceChain.isUnlocked = false
      }
      const addListener = window.BinanceChain.on.bind(
        window.BinanceChain
      )
      window.BinanceChain.on = (event, func) => {
        // intercept chainChanged event and format string
        if (event === 'chainChanged') {
          addListener(event, (chainNumber) => {
            func(`0x${parseInt(chainNumber).toString(16)}`)
          })
        } else {
          addListener(event, func)
        }
      }
      const provider = createEIP1193Provider(window.BinanceChain, {
        // If the wallet is unlocked then we don't need to patch this request
        ...(!window.BinanceChain.isUnlocked && {
          eth_accounts: () => Promise.resolve([])
        }),
        eth_requestAccounts: ({ baseRequest }) =>
          baseRequest({ method: 'eth_requestAccounts' }).then(accts => {
            window.BinanceChain.isUnlocked = true
            return accts
          }),
        eth_selectAccounts: UNSUPPORTED_METHOD,
        eth_chainNumber: ({ baseRequest }) =>
          baseRequest({ method: 'eth_chainNumber' }).then(
            id => `0x${parseInt(id).toString(16)}`
          ),
        // Unsupported method -- will throw error
        wallet_switchEthereumChain: UNSUPPORTED_METHOD
      })
      provider.removeListener = (event, func) => {}
      return { provider }
    },
    platforms: ['desktop'],
    supported: true
  },
  Bitpie: {
    label: 'Bitpie', flag: 'isBitpie',
    injectedNamespace: 'ethereum',
    checkProviderIdentity: () =>!!(window)['Bitpie'],
    getIcon: async () => (await import('./icons/wallet/bitpie.js')).default,
    getInterface: async () => ({
      provider: createEIP1193Provider(window.ethereum, {
        wallet_switchEthereumChain: UNSUPPORTED_METHOD,
        eth_selectAccounts: UNSUPPORTED_METHOD
      })
    }),
    platforms: ['mobile'],
    supported: false
  },
  BlockWallet: {
    label: 'BlockWallet', flag: 'isBlockWallet',
    injectedNamespace: 'ethereum',
    checkProviderIdentity: ({ provider }) =>
      identify(provider, this.BlockWallet.flag),
    getIcon: async () => (await import('./icons/wallet/blockwallet.js')).default,
    getInterface: matchFlag(this.BlockWallet.flag),
    platforms: ['desktop'],
    supported: false
  },
  Brave: {
    label: 'Brave Wallet', flag: 'isBraveWallet',
    injectedNamespace: 'ethereum',
    checkProviderIdentity: ({ provider }) =>
      identify(provider, this.Brave.flag),
    getIcon: async () => (await import('./icons/wallet/brave.js')).default,
    getInterface: matchFlag(this.Brave.flag),
    platforms: ['all'],
    supported: false
  },
  Coinbase: {
    label: 'Coinbase Wallet', flag: 'isCoinbaseWallet',
    injectedNamespace: 'ethereum',
    checkProviderIdentity: ({ provider }) =>
      identify(provider, this.Coinbase.flag) ||
      identify(provider,'isToshi'),
    getIcon: async () => (await import('./icons/wallet/coinbase.js')).default,
    getInterface: async () => {
      const { provider } = await matchFlag(this.Coinbase.flag)()
      const addListener = provider.on.bind(provider)
      provider.on = (event, func) => {
        // intercept chainChanged event and format string
        if (event === 'chainChanged') {
          addListener(event, (chainNumber) => {
            func(`0x${parseInt(chainNumber).toString(16)}`)
          })
        } else {
          addListener(event, func)
        }
      }
      return { provider }
    },
    platforms: ['all'],
    supported: true
  },
  Detected: {
    label: 'Detected Wallet', flag: 'request',
    injectedNamespace: 'ethereum',
    checkProviderIdentity: ({ provider }) =>
      identify(provider, this.Detected.flag),
    getIcon: async () => (await import('./icons/wallet/detected.js')).default,
    getInterface: async () => ({ provider: window.ethereum }),
    platforms: ['all'],
    supported: true
  },
  Exodus: {
    label: 'Exodus', flag: 'isExodus',
    injectedNamespace: 'ethereum',
    checkProviderIdentity:({provider})=>identify(provider,this.Exodus.flag),
    getIcon: async () => (await import('./icons/wallet/exodus.js')).default,
    getInterface: matchFlag(this.Exodus.flag),
    platforms: ['all'],
    supported: false
  },
  Frame: {
    label: 'Frame', flag: 'isFrame',
    injectedNamespace: 'ethereum',
    checkProviderIdentity:({provider})=>identify(provider,this.Frame.flag),
    getIcon: async () => (await import('./icons/wallet/frame.js')).default,
    getInterface: ()=>({ provider: window.ethereum }),
    platforms: ['desktop'],
    supported: false
  },
  HuobiWallet: {
    label: 'Huobi Wallet', flag: 'isHbWallet',
    injectedNamespace: 'ethereum',
    checkProviderIdentity: ({ provider }) =>
      identify(provider, this.HuobiWallet.flag),
    getIcon: async () => (await import('./icons/wallet/huobiwallet.js')).default,
    getInterface: async () => ({
      provider: createEIP1193Provider(window.ethereum, {
        wallet_switchEthereumChain: UNSUPPORTED_METHOD,
        eth_selectAccounts: UNSUPPORTED_METHOD
      })
    }),
    platforms: ['mobile'],
    supported: false
  },
  HyperPay: {
    label: 'HyperPay', flag: 'isHyperPay',
    injectedNamespace: 'ethereum',
    checkProviderIdentity: !!(window)['hiWallet'],
    getIcon: async () => (await import('./icons/wallet/hyperpay.js')).default,
    getInterface: async () => ({
      provider: createEIP1193Provider(window.ethereum, {
        wallet_switchEthereumChain: UNSUPPORTED_METHOD,
        eth_selectAccounts: UNSUPPORTED_METHOD
      })
    }),
    platforms: ['mobile'],
    supported: false
  },
  ImToken: {
    label: 'imToken', flag: 'isImToken',
    injectedNamespace: 'ethereum',
    checkProviderIdentity:({provider})=>identify(provider,this.ImToken.flag),
    getIcon: async () => (await import('./icons/wallet/imtoken.js')).default,
    getInterface: async () => ({
      provider: createEIP1193Provider(window.ethereum, {
        wallet_switchEthereumChain: UNSUPPORTED_METHOD,
        eth_selectAccounts: UNSUPPORTED_METHOD
      })
    }),
    platforms: ['mobile'],
    supported: false
  },
  Liquality: {
    label: 'Liquality', flag: 'isLiquality',
    injectedNamespace: 'arbitrum',
    checkProviderIdentity:({provider})=>identify(provider,this.Liquality.flag),
    getIcon: async () => (await import('./icons/wallet/liquality.js')).default,
    getInterface: async () => {
      const provider = window[InjectedNameSpace.Arbitrum]
      provider.removeListener = (event, func) => {}
      return { provider }
    },
    platforms: ['desktop'],
    supported: false
  },
  MeetOne: {
    label: 'MeetOne', flag: 'wallet',
    injectedNamespace: 'ethereum',
    checkProviderIdentity: ({ provider }) =>
      !!provider && provider[this.MeetOne.flag] === 'MEETONE',
    getIcon: async () => (await import('./icons/wallet/meetone.js')).default,
    getInterface: ()=>({ provider: window.ethereum }),
    platforms: ['mobile'],
    supported: false
  },
  MetaMask: {
    label: 'MetaMask', flag: 'isMetaMask',
    injectedNamespace: 'ethereum',
    checkProviderIdentity: ({ provider }) =>
      identify(provider, this.MetaMask.flag),
    getIcon: async () => (await import('./icons/wallet/metamask.js')).default,
    getInterface: matchFlag(this.MetaMask.flag),
    platforms: ['all'],
    supported: true
  },
  MyKey: {
    label: 'MyKey', flag: 'isMYKEY',
    injectedNamespace: 'ethereum',
    checkProviderIdentity: ({ provider }) =>
      !!provider && !!provider[this.MyKey.flag],
    getIcon: async () => (await import('./icons/wallet/mykey.js')).default,
    getInterface: ()=>({ provider: window.ethereum }),
    platforms: ['mobile'],
    supported: false
  },
  OneInch: {
    label: '1inch Wallet', flag: 'isOneInchIOSWallet',
    injectedNamespace: 'ethereum',
    checkProviderIdentity:({provider})=>identify(provider,this.OneInch.flag),
    getIcon: async () => (await import('./icons/wallet/oneInch.js')).default,
    getInterface: async () => ({
      provider: createEIP1193Provider(window.ethereum)
    }),
    platforms: ['mobile'],
    supported: false
  },
  Opera: {
    label: 'Opera Wallet', flag: '',
    injectedNamespace: 'ethereum',
    checkProviderIdentity:({ device }) => device.browser.name === 'Opera',
    getIcon: async () => (await import('./icons/wallet/opera.js')).default,
    getInterface: async () => ({
      provider: createEIP1193Provider(window.ethereum, {
        eth_requestAccounts: async ({ baseRequest }) =>
          baseRequest({ method: 'eth_accounts' }),
        eth_selectAccounts: UNSUPPORTED_METHOD
      })
    }),
    platforms: ['all'],
    supported: false
  },
  OwnBit: {
    label: 'OwnBit', flag: 'isOwnbit',
    injectedNamespace: 'ethereum',
    checkProviderIdentity:({provider})=>identify(provider,this.OwnBit.flag),
    getIcon: async () => (await import('./icons/wallet/ownbit.js')).default,
    getInterface: async () => {
      const provider = createEIP1193Provider(window.ethereum, {
        eth_chainNumber: ({ baseRequest }) =>
          baseRequest({ method: 'eth_chainNumber' }).then(
            id => `0x${parseInt(id).toString(16)}`
          ),
        wallet_switchEthereumChain: UNSUPPORTED_METHOD,
        eth_selectAccounts: UNSUPPORTED_METHOD
      })
      provider.removeListener = (event, listener) => {}
      provider.on = (event, listener) => {}
      return { provider }
    },
    platforms: ['mobile'],
    supported: false
  },
  Status: {
    label: 'Status Wallet', flag: 'isStatus',
    injectedNamespace: 'ethereum',
    checkProviderIdentity:({provider})=>identify(provider,this.Status.flag),
    getIcon: async () => (await import('./icons/wallet/status.js')).default,
    getInterface: ()=>({ provider: window.ethereum }),
    platforms: ['all'],
    supported: false
  },
  Tokenary: {
    label: 'Tokenary Wallet', flag: 'isTokenary',
    injectedNamespace: 'ethereum',
    checkProviderIdentity:({provider})=>identify(provider,this.Tokenary.flag),
    getIcon: async () => (await import('./icons/wallet/tokenary.js')).default,
    getInterface: async () => ({
      provider: createEIP1193Provider(window.ethereum)
    }),
    platforms: ['mobile'],
    supported: false
  },
  TokenPocket: {
    label: 'TokenPocket', flag: 'isTokenPocket',
    injectedNamespace: 'ethereum',
    checkProviderIdentity: ({provider}) =>
      identify(provider,this.TokenPocket.flag) && !provider[this.TP.flag],
    getIcon: async () => (await import('./icons/wallet/tokenpocket.js')).default,
    getInterface: async ({ EventEmitter }) => {
      const emitter = new EventEmitter()
      const provider = createEIP1193Provider(window.ethereum, {
        wallet_switchEthereumChain: ({ baseRequest, params }) => {
          emitter.emit('chainChanged', params[0].chainNumber)
          return baseRequest({
            method: 'wallet_switchEthereumChain',
            params
          })
        },
        eth_selectAccounts: UNSUPPORTED_METHOD
      })
      provider.on = emitter.on.bind(emitter)
      return {provider}
    },
    platforms: ['all'],
    supported: false
  },
  TP: {
    label: 'TP Wallet', flag: 'isTp',
    injectedNamespace: 'ethereum',
    checkProviderIdentity:({provider})=>identify(provider, this.TP.flag),
    getIcon: async () => (await import('./icons/wallet/tp.js')).default,
    getInterface: async () => ({
      provider: createEIP1193Provider(window.ethereum, {
        wallet_switchEthereumChain: UNSUPPORTED_METHOD,
        eth_selectAccounts: UNSUPPORTED_METHOD
      })
    }),
    platforms: ['mobile'],
    supported: false
  },
  Tally: {
    label: 'Tally Wallet', flag: 'isTally',
    injectedNamespace: 'tally',
    checkProviderIdentity:({provider})=>identify(provider,this.Tally.flag),
    getIcon: async () => (await import('./icons/wallet/tallywallet.js')).default,
    getInterface: async () => ({
      provider: createEIP1193Provider(window.tally)
    }),
    platforms: ['desktop'],
    supported: false
  },
  Trust: {
    label: 'Trust Wallet', flag: 'isTrust',
    injectedNamespace: 'ethereum',
    checkProviderIdentity: ({ provider }) =>
      identify(provider, this.Trust.flag) && !provider[this.TokenPocket.flag],
    getIcon: async () => (await import('./icons/wallet/trust.js')).default,
    getInterface: async () => ({
      provider: createEIP1193Provider(window.ethereum, {
        wallet_switchEthereumChain: UNSUPPORTED_METHOD,
        eth_selectAccounts: UNSUPPORTED_METHOD
      })
    }),
    platforms: ['mobile'],
    supported: true
  },
  XDEFI: {
    label: 'XDEFI Wallet', flag: 'isXDEFI',
    injectedNamespace: 'xfi',
    checkProviderIdentity: ({ provider }) =>
      provider && provider.ethereum &&
      provider.ethereum[this.XDEFI.flag],
    getIcon: async () => (await import('./icons/wallet/xdefi.js')).default,
    getInterface: async () => ({
      provider: (window)['xfi'] && (window)['xfi']['ethereum']
    }),
    platforms: ['all'],
    supported: false
  },
};



export const sdkWalletMeta = {
  Dcent: {
    label: `D'CENT`, flag: 'isDcentWallet',
    injectedNamespace: 'ethereum',
    checkProviderIdentity: ({ provider }) =>
      identify(provider, this.Dcent.flag),
    getIcon: async () => (await import('./icons/wallet/dcent.js')).default,
    getInterface: matchFlag(this.Brave.flag),
    platforms: ['all'],
    supported: false
  },
  WalletIo: {
    label: 'Wallet.io', flag: 'isWalletIO',
    injectedNamespace: 'ethereum',
    checkProviderIdentity:({provider})=>identify(provider,this.WalletIo.flag),
    getIcon: async () => (await import('./icons/wallet/walletio.js')).default,
    getInterface: matchFlag(this.WalletIo.flag),
    platforms: ['all'],
    supported: false
  },

}



export const chainMeta = [
  {
    chainNumber: 1, chainId: '0x1', color: '#627EEA',
    name: 'Ethereum', label: 'Ethereum Mainnet', token: 'ETH',
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    blockExplorerUrls: ['https://etherscan.io/'],
    getIcon: async()=>(await import(`../icons/core/ethereum.svg`)).default,
  },
  {
    chainNumber: 3, chainId: '0x3', color: '#627EEA',
    name: 'Ropsten', label: 'Ethereum Ropsten Testnet', token: 'ROP',
    rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`,
    blockExplorerUrls: ['https://ropsten.etherscan.io/'],
    getIcon: async()=>(await import(`../icons/core/ethereum.svg`)).default,
  },
  {
    chainNumber: 4, chainId: '0x4', color: '#627EEA',
    name: 'Rinkeby', label: 'Ethereum Rinkeby Testnet', token: 'RIN',
    rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
    blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
    getIcon: async()=>(await import(`../icons/core/ethereum.svg`)).default,
  },
  {
    chainNumber: 5, chainId: '0x5', color: '#627EEA',
    name: 'Goerli', label: 'Ethereum Goerli Testnet', token: 'GOR',
    rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`,
    blockExplorerUrls: ['https://goerli.etherscan.io/'],
    getIcon: async()=>(await import(`../icons/core/ethereum.svg`)).default,
  },
  {
    chainNumber: 10, chainId: '0xa', color: '#FF0420',
    name: 'Optimism', label: 'Optimism', token: 'ETH',
    rpcUrl: `https://mainnet.optimism.io`,
    blockExplorerUrls: ['https://optimistic.etherscan.io/'],
    getIcon: async()=>(await import(`../icons/core/optimism.svg`)).default,
  },
  {
    chainNumber: 14, chainId: '0xe', color: '#627EEA',
    //rpcUrl: `https://songbird.towolabs.com/rpc`
    name: 'Flare', label: 'Flare Mainnet', token: 'FLR',
    rpcUrl:``,
    blockExplorerUrls: ['https://explorer.flare.network/'],
    getIcon: async()=>(await import(`../icons/core/flare.svg`)).default,
  },
  {
    chainNumber: 16, chainId: '0x10', color: '#627EEA',
    name: 'Coston', label: 'Flare Coston Testnet', token: 'CFLR',
    rpcUrl: `https://coston-api.flare.network/ext/bc/C/rpc`,
    blockExplorerUrls: ['https://coston-explorer.flare.network/'],
    getIcon: async()=>(await import(`../icons/core/flare.svg`)).default,
  },
  {
    chainNumber: 19, chainId: '0x13', color: '#627EEA',
    name: 'Songbird', label: 'Flare Songbird Testnet', token: 'SGB',
    rpcUrl: `https://songbird.towolabs.com/rpc`,
    blockExplorerUrls: ['https://songbird-explorer.flare.network/'],
    getIcon: async()=>(await import(`../icons/core/flare.svg`)).default,
  },
  {
    chainNumber: 42, chainId: '0x2a', color: '#627EEA',
    name: 'Kovan', label: 'Ethereum Kovan Testnet', token: 'KOV',
    rpcUrl: `https://kovan.infura.io/v3/${INFURA_ID}`,
    blockExplorerUrls: ['https://kovan.etherscan.io/'],
    getIcon: async()=>(await import(`../icons/core/ethereum.svg`)).default,
  },
  {
    chainNumber: 56, chainId: '0x38', color: '#F3BA2F',
    name: 'Binance', label: 'Binance Smart Chain', token: 'BNB',
    rpcUrl: `https://bsc-dataseed.binance.org/`,
    blockExplorerUrls: ['https://bscscan.com/'],
    getIcon: async()=>(await import(`../icons/core/binance.svg`)).default,
  },
  {
    chainNumber: 100, chainId: '0x64', color: '#04795B',
    name: 'Gnosis', label: 'xDAI Chain', token: 'xDAI',
    rpcUrl: `https://gnosis-mainnet.public.blastapi.io`,
    blockExplorerUrls: ['https://blockscout.com/poa/xdai/'],
    getIcon: async()=>(await import(`../icons/core/gnosis.svg`)).default,
  },
  {
    chainNumber: 137, chainId: '0x89', color: '#8247E5',
    name: 'Polygon', label: 'Matic Mainnet', token: 'MATIC',
    rpcUrl: `https://matic-mainnet.chainstacklabs.com`,
    blockExplorerUrls: [''],
    getIcon: async()=>(await import(`../icons/core/polygon.svg`)).default,
  },
  {
    chainNumber: 250, chainId: '0xfa', color: '#1969FF',
    name: 'Fantom Opera', label: 'Fantom Mainnet', token: 'FTM',
    rpcUrl: `https://rpc.ftm.tools/`,
    blockExplorerUrls: ['https://ftmscan.com/'],
    getIcon: async()=>(await import(`../icons/core/fantom.svg`)).default,
  },
  {
    chainNumber: 43114, chainId: '0xa86a', color: '#E84142',
    name: 'Avalanche', label: 'Avalanche C-Chain', token: 'AVAX',
    rpcUrl: `https://api.avax.network/ext/bc/C/rpc`,
    blockExplorerUrls: ['https://snowtrace.io/'],
    getIcon: async()=>(await import(`../icons/core/avalanche.svg`)).default,
  },
  {
    chainNumber: 42220, chainId: '0xa4ec', color: '#FBCC5C',
    name: 'Celo', label: 'Celo Mainnet', token: 'CELO',
    rpcUrl: `https://forno.celo.org`,
    blockExplorerUrls: ['https://explorer.celo.org/'],
    getIcon: async()=>(await import(`../icons/core/celo.svg`)).default,
  },
  {
    chainNumber: 42161, chainId: '0xa4b1', color: '#33394B',
    name: 'Arbitrum', label: 'Arbitrum One', token: 'ETH',
    rpcUrl: `https://arb1.arbitrum.io/rpc`,
    blockExplorerUrls: ['https://arbiscan.io/','https://explorer.arbitrum.io/'],
    getIcon: async()=>(await import(`../icons/core/arbitrum.svg`)).default,
  },
  {
    chainNumber: 1666600000, chainId: '0x63564C40', color: '#ffffff',
    name: 'Harmony One', label: 'Harmony Mainnet Shard 0', token: 'ONE',
    rpcUrl: `https://api.harmony.one`,
    blockExplorerUrls: ['https://explorer.harmony.one/'],
    getIcon: async()=>(await import(`../icons/core/harmony-one.svg`)).default,
  },
  {
    chainNumber: 0, chainId: '0', color: '#33394B',
    name: 'Unrecognized Chain', label: 'Unrecognized Chain', token: '???',
    rpcUrl: ``, blockExplorerUrls: [''],
    getIcon: async()=>(await import(`../icons/core/question.svg`)).default,
  },
];



export function getDevice() {
  if (typeof window !== 'undefined') {
    const parsed = bowser.getParser(window.navigator.userAgent);
    return {
      type: parsed.getPlatform().type,
      os: parsed.getOS(),
      browser: parsed.getBrowser()
    };
  } else {return { type: null, os: null, browser: null };}
}
*/
