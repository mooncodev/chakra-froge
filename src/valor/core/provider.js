import { fromEventPattern } from 'rxjs';
import { filter, takeUntil, take, share, switchMap } from 'rxjs/operators';
import partition from 'lodash.partition';
import { utils, providers } from 'ethers';
import { disconnectWallet$ } from './streams';
import { updateAccount, updateWallet } from './store/actions';
import { validEnsChain } from './utils';
import disconnect from './disconnect';
import { state } from './store';
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
export function requestAccounts(provider) {
    const args = { method: 'eth_requestAccounts' };
    return provider.request(args);
}
export function selectAccounts(provider) {
    const args = { method: 'eth_selectAccounts' };
    return provider.request(args);
}
export function getChainId(provider) {
    return provider.request({ method: 'eth_chainId' });
}
export function listenAccountsChanged(args) {
    const { provider, disconnected$ } = args;
    const addHandler = (handler) => {
        provider.on('accountsChanged', handler);
    };
    const removeHandler = (handler) => {
        provider.removeListener('accountsChanged', handler);
    };
    return fromEventPattern(addHandler, removeHandler).pipe(takeUntil(disconnected$));
}
export function listenChainChanged(args) {
    const { provider, disconnected$ } = args;
    const addHandler = (handler) => {
        provider.on('chainChanged', handler);
    };
    const removeHandler = (handler) => {
        provider.removeListener('chainChanged', handler);
    };
    return fromEventPattern(addHandler, removeHandler).pipe(takeUntil(disconnected$));
}
export function trackWallet(provider, label) {
    const disconnected$ = disconnectWallet$.pipe(filter(wallet => wallet === label), take(1));
    const accountsChanged$ = listenAccountsChanged({
        provider,
        disconnected$
    }).pipe(share());
    // when account changed, set it to first account
    accountsChanged$.subscribe(([address]) => {
        // no address, then no account connected, so disconnect wallet
        // this could happen if user locks wallet,
        // or if disconnects app from wallet
        if (!address) {
            disconnect({ label });
            return;
        }
        const { wallets } = state.get();
        const { accounts } = wallets.find(wallet => wallet.label === label);
        const [[existingAccount], restAccounts] = partition(accounts, account => account.address === address);
        // update accounts without ens and balance first
        updateWallet(label, {
            accounts: [
                existingAccount || { address: address, ens: null, balance: null },
                ...restAccounts
            ]
        });
    });
    // also when accounts change update Balance and ENS
    accountsChanged$
        .pipe(switchMap(async ([address]) => {
        if (!address)
            return;
        const { wallets, chains } = state.get();
        const { chains: walletChains, accounts } = wallets.find(wallet => wallet.label === label);
        const [connectedWalletChain] = walletChains;
        const chain = chains.find(({ namespace, id }) => namespace === 'evm' && id === connectedWalletChain.id);
        const balanceProm = getBalance(address, chain);
        const account = accounts.find(account => account.address === address);
        const ensProm = account.ens
            ? Promise.resolve(account.ens)
            : validEnsChain(connectedWalletChain.id)
                ? getEns(address, chain)
                : Promise.resolve(null);
        return Promise.all([Promise.resolve(address), balanceProm, ensProm]);
    }))
        .subscribe(res => {
        if (!res)
            return;
        const [address, balance, ens] = res;
        updateAccount(label, address, { balance, ens });
    });
    const chainChanged$ = listenChainChanged({ provider, disconnected$ }).pipe(share());
    // Update chain on wallet when chainId changed
    chainChanged$.subscribe(chainId => {
        const { wallets } = state.get();
        const { chains, accounts } = wallets.find(wallet => wallet.label === label);
        const [connectedWalletChain] = chains;
        if (chainId === connectedWalletChain.id)
            return;
        const resetAccounts = accounts.map(({ address }) => ({
            address,
            ens: null,
            balance: null
        }));
        updateWallet(label, {
            chains: [{ namespace: 'evm', id: chainId }],
            accounts: resetAccounts
        });
    });
    // when chain changes get ens and balance for each account for wallet
    chainChanged$
        .pipe(switchMap(async (chainId) => {
        const { wallets, chains } = state.get();
        const { accounts } = wallets.find(wallet => wallet.label === label);
        const chain = chains.find(({ namespace, id }) => namespace === 'evm' && id === chainId);
        return Promise.all(accounts.map(async ({ address }) => {
            const balanceProm = getBalance(address, chain);
            const ensProm = validEnsChain(chainId)
                ? getEns(address, chain)
                : Promise.resolve(null);
            const [balance, ens] = await Promise.all([balanceProm, ensProm]);
            return {
                address,
                balance,
                ens
            };
        }));
    }))
        .subscribe(updatedAccounts => {
        updatedAccounts && updateWallet(label, { accounts: updatedAccounts });
    });
    disconnected$.subscribe(() => {
        provider.disconnect && provider.disconnect();
    });
}
export async function getEns(address, chain) {
    // chain we don't recognize and don't have a rpcUrl for requests
    if (!chain)
        return null;
    const provider = getProvider(chain);
    try {
        const name = await provider.lookupAddress(address);
        let ens = null;
        if (name) {
            const resolver = await provider.getResolver(name);
            if (resolver) {
                const [contentHash, avatar] = await Promise.all([
                    resolver.getContentHash(),
                    resolver.getAvatar()
                ]);
                const getText = resolver.getText.bind(resolver);
                ens = {
                    name,
                    avatar,
                    contentHash,
                    getText
                };
            }
        }
        return ens;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
export async function getBalance(address, chain) {
    // chain we don't recognize and don't have a rpcUrl for requests
    if (!chain)
        return null;
    const provider = getProvider(chain);
    try {
        const balanceWei = await provider.getBalance(address);
        return balanceWei
            ? { [chain.token || 'eth']: utils.formatEther(balanceWei) }
            : null;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
export function switchChain(provider, chainId) {
    return provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }]
    });
}
export function addNewChain(provider, chain) {
    return provider.request({
        method: 'wallet_addEthereumChain',
        params: [
            {
                chainId: chain.id,
                chainName: chain.label,
                nativeCurrency: {
                    name: chain.label,
                    symbol: chain.token,
                    decimals: 18
                },
                rpcUrls: [chain.rpcUrl]
            }
        ]
    });
}
