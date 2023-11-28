import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilKeyChanged, pluck, filter } from 'rxjs/operators';
import { locale } from 'svelte-i18n';
import { APP_INITIAL_STATE } from '../constants';
import { notNullish } from '../utils';
import { ADD_CHAINS, ADD_WALLET, UPDATE_WALLET, REMOVE_WALLET, RESET_STORE, UPDATE_ACCOUNT, UPDATE_ACCOUNT_CENTER, SET_WALLET_MODULES, SET_LOCALE, UPDATE_ALL_WALLETS } from './constants';
function reducer(state, action) {
    const { type, payload } = action;
    switch (type) {
        case ADD_CHAINS:
            return {
                ...state,
                chains: [...state.chains, ...payload]
            };
        case ADD_WALLET: {
            const wallet = payload;
            const existingWallet = state.wallets.find(({ label }) => label === wallet.label);
            return {
                ...state,
                wallets: [
                    // add to front of wallets as it is now the primary wallet
                    existingWallet || payload,
                    // filter out wallet if it already existed
                    ...state.wallets.filter(({ label }) => label !== wallet.label)
                ]
            };
        }
        case UPDATE_WALLET: {
            const update = payload;
            const { id, ...walletUpdate } = update;
            const updatedWallets = state.wallets.map(wallet => wallet.label === id ? { ...wallet, ...walletUpdate } : wallet);
            return {
                ...state,
                wallets: updatedWallets
            };
        }
        case REMOVE_WALLET: {
            const update = payload;
            return {
                ...state,
                wallets: state.wallets.filter(({ label }) => label !== update.id)
            };
        }
        case UPDATE_ACCOUNT: {
            const update = payload;
            const { id, address, ...accountUpdate } = update;
            const updatedWallets = state.wallets.map(wallet => {
                if (wallet.label === id) {
                    wallet.accounts = wallet.accounts.map(account => {
                        if (account.address === address) {
                            return { ...account, ...accountUpdate };
                        }
                        return account;
                    });
                }
                return wallet;
            });
            return {
                ...state,
                wallets: updatedWallets
            };
        }
        case UPDATE_ALL_WALLETS: {
            const updatedWallets = payload;
            return {
                ...state,
                wallets: updatedWallets
            };
        }
        case UPDATE_ACCOUNT_CENTER: {
            const update = payload;
            return {
                ...state,
                accountCenter: {
                    ...state.accountCenter,
                    ...update
                }
            };
        }
        case SET_WALLET_MODULES: {
            return {
                ...state,
                walletModules: payload
            };
        }
        case SET_LOCALE: {
            // Set the locale in the svelte-i18n internal state
            locale.set(payload);
            return {
                ...state,
                locale: payload
            };
        }
        case RESET_STORE:
            return APP_INITIAL_STATE;
        default:
            throw new Error(`Unknown type: ${type} in appStore reducer`);
    }
}
const _store = new BehaviorSubject(APP_INITIAL_STATE);
const _stateUpdates = new Subject();
_stateUpdates.subscribe(_store);
export function dispatch(action) {
    const state = _store.getValue();
    _stateUpdates.next(reducer(state, action));
}
function select(stateKey) {
    if (!stateKey)
        return _stateUpdates.asObservable();
    const validStateKeys = Object.keys(_store.getValue());
    if (!validStateKeys.includes(String(stateKey))) {
        throw new Error(`key: ${stateKey} does not exist on this store`);
    }
    return _stateUpdates
        .asObservable()
        .pipe(distinctUntilKeyChanged(stateKey), pluck(stateKey), filter(notNullish));
}
function get() {
    return _store.getValue();
}
export const state = {
    select,
    get
};
