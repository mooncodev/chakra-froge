import { onDestroy, onMount, beforeUpdate, afterUpdate } from 'svelte';
import { Subject, defer, BehaviorSubject } from 'rxjs';
import { take, takeUntil, withLatestFrom, pluck, shareReplay } from 'rxjs/operators';
import { resetStore } from './store/actions';
import { state } from './store';
export const reset$ = new Subject();
export const disconnectWallet$ = new Subject();
export const connectWallet$ = new BehaviorSubject({ inProgress: false, actionRequired: '' });
export const switchChainModal$ = new BehaviorSubject(null);
export const wallets$ = state.select('wallets').pipe(shareReplay(1));
// reset logic
reset$.pipe(withLatestFrom(wallets$), pluck('1')).subscribe(wallets => {
    // disconnect all wallets
    wallets.forEach(({ label }) => {
        disconnectWallet$.next(label);
    });
    resetStore();
});
export const onMount$ = defer(() => {
    const subject = new Subject();
    onMount(() => {
        subject.next();
    });
    return subject.asObservable().pipe(take(1));
});
export const onDestroy$ = defer(() => {
    const subject = new Subject();
    onDestroy(() => {
        subject.next();
    });
    return subject.asObservable().pipe(take(1));
});
export const afterUpdate$ = defer(() => {
    const subject = new Subject();
    afterUpdate(() => {
        subject.next();
    });
    return subject.asObservable().pipe(takeUntil(onDestroy$));
});
export const beforeUpdate$ = defer(() => {
    const subject = new Subject();
    beforeUpdate(() => {
        subject.next();
    });
    return subject.asObservable().pipe(takeUntil(onDestroy$));
});
