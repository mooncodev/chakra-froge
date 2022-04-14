const [__,__E,__W] = [console.log,console.error,console.warn];
import produce from 'immer';
import create from 'zustand';
import { readFX, stx } from '../stx/stx.js';
import { useW3Store } from './useW3Store.js';
import addr from '../data/addresses.js';
import { PHASE } from '../data/constants.js';
import { mockEthBal, mockFxGetAccount1 } from './mocks.js';
import { useCrawlStore } from './useCrawlStore.js';
import { balToHrTuple } from '../helpers/math/zmath.mjs';
import { useFxStore } from './useFxStore.js';
import axios from 'axios';

export const createAuthCreds = async ()=>{
  const { web3, u_library, u_account } = useW3Store.getState()
  const authMsg = web3.utils.randomHex(4) // "0x6892ffc6"
  const authSig = await u_library.provider.request({
    method: "personal_sign",
    params: [authMsg, u_account]
  });
  return {account:u_account, authParams:[authMsg, authSig]}
}

const defaultOn = (evt, data, err) => { __(evt, data, err);
  if (evt === 'historyUID') {}
  if (evt === 'transactionHash') {}
  if (evt === 'receipt') {}
  if (evt === 'confirmation') {}
  if (evt === 'error') {}
};

export const tplHistoryItem={
  t_created:0,
  t_resolved:0,
  type:'',//buy,sell,
  hash:'',
  from:'',
  to:'',
  path:[],
  value:'',
  args:[],
  rcpt: {},
  confs:0,
  error:[],
  output:'',
}
export const tplUserItem={
  cfgLSEnabled:false,
  history: {},
  ethBal:['', '', ''],
  isClaimEligible: false,
  fxGetAccount: {
    _balance: ['', '', ''],
    _xDivsAvailable: ['', '', ''],
    _xDivsEarnedToDate: ['', '', ''],
    _xDivsWithdrawnToDate: ['', '', ''],
    _isAMMPair: '',
    _isBlackListedBot: '',
    _isExcludedFromRwds: '',
    _isExcludedFromFees: '',
  },
}

export const useUserStore = create((set, get) => ({
  users: {},
  execClaim: (on = defaultOn) => {
    return stx({
      from: useW3Store.getState().u_account,
      to: addr.mainnet.FROGEX.ERC20,
      path: ['FrogeX', 'xClaim'], on: on
    })/* .catch(err => {__('errcaught!');on('error', err);}); */
  },
  hydrateEthBalance: async () => {
    const lib = useW3Store.getState().n_library;
    if (!lib) {return;}
    const a = useW3Store.getState().u_account;
    get().assureUser(a);
    const ethBal = PHASE>0?await lib.getBalance(a):mockEthBal;
    const ethPrice = useCrawlStore.getState().ethPrice;
    const ethBalTuple = balToHrTuple(ethBal.toString(), 18, ethPrice);
    get()._s(s=>{s.users[a].ethBal = ethBalTuple })
  },
  removeAccounts: () => {
    set({ users: {} });
  },
  hydrateFxGetAccount: async () => {
    await get().hydrateEthBalance();
    const u_account = useW3Store.getState().u_account;
    if (!u_account) {return;}
    const acc = PHASE>0?await readFX('getAccount',[u_account]):mockFxGetAccount1;
    const fxPrice = useFxStore.getState().fxPrice;
    const ethPrice = useCrawlStore.getState().ethPrice;
    const minForClaim = useFxStore.getState()._xMinClaimableDivs[0];
    get()._s(s=>{
      s.users[u_account].fxGetAccount = {
        _balance: balToHrTuple(acc._balance, 9, fxPrice),
        _xDivsAvailable: balToHrTuple(acc._xDivsAvailable, 18, ethPrice),
        _xDivsEarnedToDate: balToHrTuple(acc._xDivsEarnedToDate, 18, ethPrice),
        _xDivsWithdrawnToDate: balToHrTuple(acc._xDivsWithdrawnToDate, 18, ethPrice),
        _isAMMPair: acc._isAMMPair,
        _isBlackListedBot: acc._isBlackListedBot,
        _isExcludedFromRwds: acc._isExcludedFromRwds,
        _isExcludedFromFees: acc._isExcludedFromFees,
      }
      s.users[u_account].isClaimEligible = (acc._xDivsAvailable > minForClaim)
    })
  },
  assureUser: (acct) => {
    if (get().users[acct]==null){
      set({users:{[acct]:tplUserItem}})
    }
  },
  setHistory: async (evt,hID,from,data,e) => {
    let { _s,assureUser } = get();
    // const authCreds = await createAuthCreds()
    if(evt==='hID'){
      assureUser(from);
      _s(s=>{s.users[from].history[hID] = {
        ...tplHistoryItem, t_created: Date.now(),
        path:data.path,value:data.value,args:data.args,
        from:data.from,to:data.to
      }})
    }
    if(evt==='hash'){ _s(s=>{s.users[from].history[hID].hash = data })}
    if(evt==='rcpt'){ _s(s=>{s.users[from].history[hID].rcpt = data })
                      _s(s=>{s.users[from].history[hID].t_resolved = Date.now()}) }
    if(evt==='conf'){ _s(s=>{s.users[from].history[hID].confs = data })}
    if(evt==='err'){  _s(s=>{s.users[from].history[hID].error.push(data) })}
    if(evt==='out'){  _s(s=>{s.users[from].history[hID].out = data })}
    if(['hID','hash','rcpt'].includes(evt) && get().users[from].cfgLSEnabled){}
  },
  togglecfgLSEnabled:(b)=>{
    set({ cfgLSEnabled: b });if(b){get().userApplyZStoLS();}
  },
  userApplyZStoLS: async (acct) => {
    let usersLS = JSON.parse(localStorage.getItem('users'));
    Object.assign(usersLS?usersLS:{}, get().users)
    window.localStorage.setItem(acct, JSON.stringify(usersLS));
  },
  userApplyLStoZS: async () => {
    let usersLS = JSON.parse(localStorage.getItem('users'))
    for(const [k,v] of Object.entries(usersLS)){
      get().assureUser(k);//k is the address
      get()._s(s=>{Object.assign(s.users[k],v)})
    }
  },
  clearLS:()=>{window.localStorage.clear();},
  getHistoryDB: async (newHistory) => {
    const authCreds = await createAuthCreds()
    const res = await axios.post('/api/history', {
      ...authCreds, newHistory:newHistory
    });if(res.data) {set({ history: res.data.history});}
  },
  _s: (fn) => set(produce(fn)),
}));
