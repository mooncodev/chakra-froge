import { useState, useCallback } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import Web3Onboard from '@web3-onboard/core';
export let web3Onboard = null;
export const init = (options) => {
    web3Onboard = Web3Onboard(options);
    return web3Onboard;
};
const HOOK_ERROR_MESSAGE = 'Must initialize before using hooks.';
const useAppState = (stateKey = undefined) => {
    if (!web3Onboard)
        throw new Error(HOOK_ERROR_MESSAGE);
    const { select, get } = web3Onboard.state;
    const subscribe = useCallback((onStoreChange) => {
        const { unsubscribe } = stateKey
            ? select(stateKey).subscribe(onStoreChange)
            : select().subscribe(onStoreChange);
        return () => unsubscribe;
    }, [stateKey]);
    const getSnapshot = useCallback(() => {
        const snapshot = get();
        return stateKey ? snapshot[stateKey] : snapshot;
    }, [stateKey]);
    return useSyncExternalStore(subscribe, getSnapshot);
};
export const useConnectWallet = () => {
    if (!web3Onboard)
        throw new Error(HOOK_ERROR_MESSAGE);
    const { connectWallet, disconnectWallet } = web3Onboard;
    const wallets = useAppState('wallets');
    const wallet = wallets[0] || null;
    const [connecting, setConnecting] = useState(false);
    const connect = useCallback(async (options) => {
        setConnecting(true);
        await connectWallet(options);
        setConnecting(false);
    }, []);
    const disconnect = useCallback(async ({ label }) => {
        setConnecting(true);
        await disconnectWallet({ label });
        setConnecting(false);
    }, []);
    return [{ wallet, connecting }, connect, disconnect];
};
export const useSetChain = (walletLabel) => {
    var _a;
    if (!web3Onboard)
        throw new Error(HOOK_ERROR_MESSAGE);
    const { setChain } = web3Onboard;
    const { wallets, chains } = useAppState();
    const connectedChain = ((_a = (walletLabel
        ? wallets.find(({ label }) => label === walletLabel)
        : wallets[0])) === null || _a === void 0 ? void 0 : _a.chains[0]) || null;
    const [settingChain, setInProgress] = useState(false);
    const set = useCallback(async (options) => {
        setInProgress(true);
        const success = await setChain({ ...options, wallet: walletLabel });
        setInProgress(false);
        return success;
    }, []);
    return [{ chains, connectedChain, settingChain }, set];
};
export const useWallets = () => {
    if (!web3Onboard)
        throw new Error(HOOK_ERROR_MESSAGE);
    return useAppState('wallets');
};
