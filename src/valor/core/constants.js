import { internalState } from './internals';
export const APP_INITIAL_STATE = {
    wallets: [],
    walletModules: [],
    chains: [],
    accountCenter: {
        enabled: true,
        position: 'topRight',
        expanded: false,
        minimal: internalState.device.type === 'mobile'
    },
    locale: ''
};
export const STORAGE_KEYS = {
    TERMS_AGREEMENT: 'onboard.js:agreement'
};
