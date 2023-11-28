import bowser from 'bowser';
import ethereumIcon from './icons/ethereum';
import polygonIcon from './icons/polygon';
import questionIcon from './icons/question';
import binanceIcon from './icons/binance';
import fantomIcon from './icons/fantom';
import optimismIcon from './icons/optimism';
import avalancheIcon from './icons/avalanche';
import celoIcon from './icons/celo';
import gnosisIcon from './icons/gnosis';
import harmonyOneIcon from './icons/harmony-one';
import arbitrumIcon from './icons/arbitrum';
export function getDevice() {
    if (typeof window !== 'undefined') {
        const parsed = bowser.getParser(window.navigator.userAgent);
        const os = parsed.getOS();
        const browser = parsed.getBrowser();
        const { type } = parsed.getPlatform();
        return {
            type: type,
            os: os,
            browser: browser
        };
    }
    else {
        return {
            type: null,
            os: null,
            browser: null
        };
    }
}
export const notNullish = (value) => value != null;
export function validEnsChain(chainId) {
    switch (chainId) {
        case '0x1':
        case '0x3':
        case '0x4':
        case '0x5':
            return true;
        default:
            return false;
    }
}
export function isSVG(str) {
    return str.includes('<svg');
}
export function shortenAddress(add) {
    return `${add.slice(0, 6)}...${add.slice(-4)}`;
}
export function shortenEns(ens) {
    return ens.length > 11 ? `${ens.slice(0, 4)}...${ens.slice(-6)}` : ens;
}
export const chainIdToLabel = {
    '0x1': 'Ethereum',
    '0x3': 'Ropsten',
    '0x4': 'Rinkeby',
    '0x5': 'Goerli',
    '0x2a': 'Kovan',
    '0x38': 'Binance',
    '0x89': 'Polygon',
    '0xfa': 'Fantom',
    '0xa': 'Optimism',
    '0xa86a': 'Avalanche',
    '0xa4ec': 'Celo',
    '0x64': 'Gnosis',
    '0x63564C40': 'Harmony One',
    '0xa4b1': 'Arbitrum'
};
export const chainStyles = {
    '0x1': {
        icon: ethereumIcon,
        color: '#627EEA'
    },
    '0x3': {
        icon: ethereumIcon,
        color: '#627EEA'
    },
    '0x4': {
        icon: ethereumIcon,
        color: '#627EEA'
    },
    '0x5': {
        icon: ethereumIcon,
        color: '#627EEA'
    },
    '0x2a': {
        icon: ethereumIcon,
        color: '#627EEA'
    },
    '0x38': {
        icon: binanceIcon,
        color: '#F3BA2F'
    },
    '0x89': {
        icon: polygonIcon,
        color: '#8247E5'
    },
    '0xfa': {
        icon: fantomIcon,
        color: '#1969FF'
    },
    '0xa': {
        icon: optimismIcon,
        color: '#FF0420'
    },
    '0xa86a': {
        icon: avalancheIcon,
        color: '#E84142'
    },
    '0xa4ec': {
        icon: celoIcon,
        color: '#FBCC5C'
    },
    '0x64': {
        icon: gnosisIcon,
        color: '#04795B'
    },
    '0x63564C40': {
        icon: harmonyOneIcon,
        color: '#ffffff'
    },
    '0xa4b1': {
        icon: arbitrumIcon,
        color: '#33394B'
    }
};
export const unrecognizedChainStyle = { icon: questionIcon, color: '#33394B' };
export function getDefaultChainStyles(chainId) {
    return chainId ? chainStyles[chainId.toLowerCase()] : undefined;
}
export function connectedToValidAppChain(walletConnectedChain, chains) {
    return !!chains.find(({ id, namespace }) => id === walletConnectedChain.id &&
        namespace === walletConnectedChain.namespace);
}
