import create from 'zustand';
import produce from 'immer';

export const useAppStore = create((set,get) => ({
  appNavDrawerOpen:false,
  set_appNavDrawerOpen: async (bOpen) => {
    set({appNavDrawerOpen:bOpen});
  },
  wcModalIsOpen:false,
  set_wcModalIsOpen: async (bOpen) => {
    set({wcModalIsOpen:bOpen});
  },
  xchangeTab:'fiatonboard',
  set_xchangeTab: async (tabName) => {
    set({xchangeTab:tabName});
  },
  _s: (fn) => set(produce(fn)),
}))

