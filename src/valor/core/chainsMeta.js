import { useWalletStore } from '../useWalletStore.js';
import { buildWalletAPI } from '../buildWalletAPI.js';
import produce from 'immer';

const INFURA_ID = 'r3b978u3f49nbf3b9'


export const chainsMeta = [
  {
    chainNumber: 1, chainId: '0x1', color: '#627EEA',
    name: 'Ethereum', label: 'Ethereum Mainnet', token: 'ETH',
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    blockExplorerUrls: ['https://etherscan.io/'],
    iconRef:'ethereum',
  },
  {
    chainNumber: 3, chainId: '0x3', color: '#627EEA',
    name: 'Ropsten', label: 'Ethereum Ropsten Testnet', token: 'ROP',
    rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`,
    blockExplorerUrls: ['https://ropsten.etherscan.io/'],
    iconRef:'ethereum',
  },
  {
    chainNumber: 4, chainId: '0x4', color: '#627EEA',
    name: 'Rinkeby', label: 'Ethereum Rinkeby Testnet', token: 'RIN',
    rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
    blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
    iconRef:'ethereum',
  },
  {
    chainNumber: 42, chainId: '0x2a', color: '#627EEA',
    name: 'Kovan', label: 'Ethereum Kovan Testnet', token: 'KOV',
    rpcUrl: `https://kovan.infura.io/v3/${INFURA_ID}`,
    blockExplorerUrls: ['https://kovan.etherscan.io/'],
    iconRef:'ethereum',
  },
  {
    chainNumber: 5, chainId: '0x5', color: '#627EEA',
    name: 'Goerli', label: 'Ethereum Goerli Testnet', token: 'GOR',
    rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`,
    blockExplorerUrls: ['https://goerli.etherscan.io/'],
    iconRef:'ethereum',
  },
  {
    chainNumber: 10, chainId: '0xa', color: '#FF0420',
    name: 'Optimism', label: 'Optimism', token: 'ETH',
    rpcUrl: `https://mainnet.optimism.io`,
    blockExplorerUrls: ['https://optimistic.etherscan.io/'],
    iconRef:'optimism',
  },
  {
    chainNumber: 14, chainId: '0xe', color: '#627EEA',
    name: 'Flare', label: 'Flare Mainnet', token: 'FLR',
    rpcUrl: `https://flare.network/ext/bc/C/rpc`,//TODO mainnet flare rpcUrl
    blockExplorerUrls: ['https://explorer.flare.network/'],
    iconRef:'flare',
  },
  {
    chainNumber: 16, chainId: '0x10', color: '#627EEA',
    name: 'Coston', label: 'Flare Coston Testnet', token: 'CFLR',
    rpcUrl: `https://coston-api.flare.network/ext/bc/C/rpc`,
    blockExplorerUrls: ['https://coston-explorer.flare.network/'],
    iconRef:'flare',
  },
  {
    chainNumber: 19, chainId: '0x13', color: '#627EEA',
    name: 'Songbird', label: 'Flare Songbird Testnet', token: 'SGB',
    rpcUrl: `https://songbird.towolabs.com/rpc`,
    blockExplorerUrls: ['https://songbird-explorer.flare.network/'],
    iconRef:'flare',
  },
  {
    chainNumber: 56, chainId: '0x38', color: '#F3BA2F',
    name: 'Binance', label: 'Binance Smart Chain', token: 'BNB',
    rpcUrl: `https://bsc-dataseed.binance.org/`,
    blockExplorerUrls: ['https://bscscan.com/'],
    iconRef:'binance',
  },
  {
    chainNumber: 137, chainId: '0x89', color: '#8247E5',
    name: 'Polygon', label: 'Matic Mainnet', token: 'MATIC',
    rpcUrl: `https://matic-mainnet.chainstacklabs.com`,
    blockExplorerUrls: [''],
    iconRef:'polygon',
  },
  {
    chainNumber: 250, chainId: '0xfa', color: '#1969FF',
    name: 'Fantom Opera', label: 'Fantom Mainnet', token: 'FTM',
    rpcUrl: `https://rpc.ftm.tools/`,
    blockExplorerUrls: ['https://ftmscan.com/'],
    iconRef:'fantom',
  },
  {
    chainNumber: 43114, chainId: '0xa86a', color: '#E84142',
    name: 'Avalanche', label: 'Avalanche C-Chain', token: 'AVAX',
    rpcUrl: `https://api.avax.network/ext/bc/C/rpc`,
    blockExplorerUrls: ['https://snowtrace.io/'],
    iconRef:'avalanche',
  },
  {
    chainNumber: 42220, chainId: '0xa4ec', color: '#FBCC5C',
    name: 'Celo', label: 'Celo Mainnet', token: 'CELO',
    rpcUrl: `https://forno.celo.org`,
    blockExplorerUrls: ['https://explorer.celo.org/'],
    iconRef:'celo',
  },
  {
    chainNumber: 42161, chainId: '0xa4b1', color: '#33394B',
    name: 'Arbitrum', label: 'Arbitrum One', token: 'ETH',
    rpcUrl: `https://arb1.arbitrum.io/rpc`,
    blockExplorerUrls: ['https://arbiscan.io/','https://explorer.arbitrum.io/'],
    iconRef:'arbitrum',
  },
  {
    chainNumber: 1666600000, chainId: '0x63564C40', color: '#ffffff',
    name: 'Harmony One', label: 'Harmony Mainnet Shard 0', token: 'ONE',
    rpcUrl: `https://api.harmony.one`,
    blockExplorerUrls: ['https://explorer.harmony.one/'],
    iconRef:'harmony-one',
  },

  {
    chainNumber: 0, chainId: '0x0', color: '#33394B',
    name: 'Unrecognized Chain', label: 'Unrecognized Chain', token: '???',
    rpcUrl: ``,
    blockExplorerUrls: [''],
    iconRef:'question',
  },
];
export async function initChains(){
  const set = useWalletStore.setState

  for(let i=0;i<chainsMeta.length;i++){

    chainsMeta[i].icon = (await import(`../icons/chain/${chainsMeta[i].iconRef??'question'}.svg`)).default

  }

  set(produce(s=>{s.chains = chainsMeta}))

}
