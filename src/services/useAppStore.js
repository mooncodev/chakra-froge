import create from 'zustand';
import { FXP, readFX } from '../stx/stx.js';
import { balToHrTuple } from '../helpers/math/zmath.mjs';
import { useCrawlStore } from 'services';
import produce from 'immer';

export const useAppStore = create((set,get) => ({
  appNavDrawerOpen:false,
  set_appNavDrawerOpen: async (bOpen) => {
    set({appNavDrawerOpen:bOpen});
  },
  wcModalIsOpen:false,
  set_wcModalIsOpen: async (bOpen) => {
    set({appNavDrawerOpen:bOpen});
  },
  xchangeTab:'fiatonboard',
  set_xchangeTab: async (tabName) => {
    set({xchangeTab:tabName});
  },
  _s: (fn) => set(produce(fn)),
}))

