import { dispatch } from './index';
import { validateAccountCenterUpdate, validateLocale, validateString, validateWallet, validateWalletInit, validateUpdateBalances } from '../validation';
import { ADD_CHAINS, UPDATE_WALLET, RESET_STORE, ADD_WALLET, REMOVE_WALLET, UPDATE_ACCOUNT, UPDATE_ACCOUNT_CENTER, SET_WALLET_MODULES, SET_LOCALE, UPDATE_ALL_WALLETS } from './constants';
import { internalState } from '../internals';
export function addChains(chains) {
    // chains are validated on init
    const action = {
        type: ADD_CHAINS,
        payload: chains.map(({ namespace = 'evm', ...rest }) => ({
            ...rest,
            namespace
        }))
    };
    dispatch(action);
}
export function addWallet(wallet) {
    const error = validateWallet(wallet);
    if (error) {
        console.error(error);
        throw error;
    }
    const action = {
        type: ADD_WALLET,
        payload: wallet
    };
    dispatch(action);
}
export function updateWallet(id, update) {
    const error = validateWallet(update);
    if (error) {
        console.error(error);
        throw error;
    }
    const action = {
        type: UPDATE_WALLET,
        payload: {
            id,
            ...update
        }
    };
    dispatch(action);
}
export function removeWallet(id) {
    const error = validateString(id);
    if (error) {
        throw error;
    }
    const action = {
        type: REMOVE_WALLET,
        payload: {
            id
        }
    };
    dispatch(action);
}
export function updateAccount(id, address, update) {
    const action = {
        type: UPDATE_ACCOUNT,
        payload: {
            id,
            address,
            ...update
        }
    };
    dispatch(action);
}
export function updateAccountCenter(update) {
    const error = validateAccountCenterUpdate(update);
    if (error) {
        throw error;
    }
    const action = {
        type: UPDATE_ACCOUNT_CENTER,
        payload: update
    };
    dispatch(action);
}
export function resetStore() {
    const action = {
        type: RESET_STORE
    };
    dispatch(action);
}
export function setLocale(locale) {
    const error = validateLocale(locale);
    if (error) {
        throw error;
    }
    const action = {
        type: SET_LOCALE,
        payload: locale
    };
    dispatch(action);
}
export function updateAllWallets(wallets) {
    const error = validateUpdateBalances(wallets);
    if (error) {
        throw error;
    }
    const action = {
        type: UPDATE_ALL_WALLETS,
        payload: wallets
    };
    dispatch(action);
}
export function setWalletModules(wallets) {
    const modules = initializeWalletModules(wallets);
    const dedupedWallets = uniqueWalletsByLabel(modules);
    const action = {
        type: SET_WALLET_MODULES,
        payload: dedupedWallets
    };
    dispatch(action);
}
// ==== HELPERS ==== //
export function initializeWalletModules(modules) {
    const { device } = internalState;
    return modules.reduce((acc, walletInit) => {
        const initialized = walletInit({ device });
        if (initialized) {
            // injected wallets is an array of wallets
            acc.push(...(Array.isArray(initialized) ? initialized : [initialized]));
        }
        return acc;
    }, []);
}
export function uniqueWalletsByLabel(walletModuleList) {
    return walletModuleList.filter(
      (v,i)=>walletModuleList.findIndex(
        (vv)=>vv.label===v.label
      )===i
    );
}
