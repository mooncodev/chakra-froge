import { atom, useAtom } from 'jotai';
import axios from 'axios';
import create from 'zustand'

const useCrawlStore = create(set => ({
  ethPrice: 0,

  fetchFreshEthPrice: () => set(state => {
    return {
      ethPrice: state.ethPrice + 1
    }
  }),
  resetEthPrice: () => set({ ethPrice: 0 })
}))

const ucs = useCrawlStore.getState()

let v1 = ucs.ethPrice
ucs.fetchFreshEthPrice()

let v2 = useCrawlStore.getState().ethPrice


const useBearStore = create(() => ({ paw: true, snout: true, fur: true }))

// Getting non-reactive fresh state
const paw = useBearStore.getState().paw
// Listening to all changes, fires synchronously on every change
const unsub1 = useBearStore.subscribe(console.log)
// Updating state, will trigger listeners
useBearStore.setState({ paw: false })
// Unsubscribe listeners
unsub1()
// Destroying the store (removing all listeners)
useBearStore.destroy()
