import ethers from 'ethers';

import addr from 'data/addresses.js'
import { MaxUint256 } from 'helpers/math/zmath.mjs'
const stx = require('./stx');

function _sleep(ms) {//usage: await _sleep(5000);
  return new Promise(resolve => setTimeout(resolve, ms));
}



const stxFns = {
  router_getWETHaddress: async function(){
    // console.log(`init router_getWETHaddress`)
    const _s = addr.signer==addr.null?'0xda46eee9b7E7f5d40d599c778a5E607F7e8242BD':addr.signer;
    return stx({
      from: _s, to: addr.UniswapV2Router02,
      abiLookup: ['UniswapV2Router02','WETH'],
    })
  },
  lpToken_validateLpToken: async function(lpTokenAddr){
    let found_factoryAddr=false, found_symbol=false, found_token0=false, found_token1=false;
    const rejectVal = [false,false,false];
    const _s = addr.signer==addr.null?'0x1011f61Df0E2Ad67e269f4108098c79e71868E00':addr.signer;
    found_symbol = await stx({
      from: _s, to: lpTokenAddr,
      abiLookup: ['UniswapV2Pair','symbol'],
    })
    if(found_symbol!=='UNI-V2'){return rejectVal;}
    found_factoryAddr = await stx({
      from: _s, to: lpTokenAddr,
      abiLookup: ['UniswapV2Pair','factory'],
    });
    if(found_factoryAddr!==addr.UniswapV2Factory){return rejectVal;}
    found_token0 = await stx({
      from: _s, to: lpTokenAddr,
      abiLookup: ['UniswapV2Pair','token0'],
    });
    if(!found_token0){return rejectVal;}
    found_token1 = await stx({
      from: _s, to: lpTokenAddr,
      abiLookup: ['UniswapV2Pair','token1'],
    });
    return [true, found_token0, found_token1];
  },
  lpToken_balanceOf: async function(balOfAddr){
    //REQUIRES: addr.wip_LpToken was set
    const _s = addr.signer==addr.null?'0x1011f61Df0E2Ad67e269f4108098c79e71868E00':addr.signer;
    return await stx({
      from: _s, to: addr.wip_LpToken,
      abiLookup: ['UniswapV2Pair','balanceOf'],
      callArgs: [balOfAddr],
    })
  },
  lpToken_totalSupply: async function(){
    const _s = addr.signer==addr.null?'0x1011f61Df0E2Ad67e269f4108098c79e71868E00':addr.signer;
    return await stx({
      from: _s, to: addr.wip_LpToken,
      abiLookup: ['UniswapV2Pair','totalSupply'],
    })
  },
  lpToken_allowance_for_FTPLiqLock: async function(){
    //REQUIRES: addr.wip_LpToken was set
    return await stx({
      from: addr.signer, to: addr.wip_LpToken,
      abiLookup: ['UniswapV2Pair','allowance'],
      callArgs: [addr.signer, addr.FTPLiqLock],
    })
  },
  lpToken_approve_FTPLocker: async function(amount){
    return await stx({
      from: addr.signer, to: addr.wip_LpToken,
      abiLookup: ['UniswapV2Pair','approve'],
      callArgs: [addr.FTPLiqLock, amount],
    })
  },

  erc20Token_name: async function(tokenAddr){
    return await stx({
      from: addr.signer, to: tokenAddr,
      abiLookup: ['ERC20','name'],
    })
  },
  erc20Token_symbol: async function(tokenAddr){
    return await stx({
      from: addr.signer, to: tokenAddr,
      abiLookup: ['ERC20','symbol'],
    })
  },
  erc20Token_balanceOf: async function(tokenAddr, balOfAddr){
    const _s = addr.signer==addr.null?'0x1011f61Df0E2Ad67e269f4108098c79e71868E00':addr.signer;
    return await stx({
      from: _s, to: tokenAddr,
      abiLookup: ['ERC20','balanceOf'],
      callArgs: [balOfAddr]
    })
  },
  factory_getPair: async function(tokenAddr){
    //REQUIRES: addr.WETH was declared via .router_getWETHaddress
    const _s = addr.signer==addr.null?'0x1011f61Df0E2Ad67e269f4108098c79e71868E00':addr.signer;
    if(!addr.WETH){
      addr.WETH = await this.router_getWETHaddress();
    }
    var currencyStr = "WETH";
    var res = await stx({
      from: _s, to: addr.UniswapV2Factory,
      abiLookup: ['UniswapV2Factory','getPair'],
      callArgs: [addr.WETH, tokenAddr],
    })
    if (res == addr.null){
      currencyStr = "USDC";
      res = await stx({
        from: _s, to: addr.UniswapV2Factory,
        abiLookup: ['UniswapV2Factory','getPair'],
        callArgs: [addr.USDC, tokenAddr],
      })
    }
    const resObj = {
      address: res,
      currency: currencyStr
    }
    return resObj.address !== addr.null ? resObj : false;
  },
  ftpLiqLock_getLockedTokens: async function(lpTokenAddr){
    const _s = addr.signer==addr.null?'0x1011f61Df0E2Ad67e269f4108098c79e71868E00':addr.signer;
    const res = await stx({
      from: _s, to: addr.FTPLiqLock,
      abiLookup: ['FTPLiqLock','getLockedTokens'],
      callArgs: [lpTokenAddr],
    })

    return res !== addr.null ? res : false;

  },
  ftpLiqLock_lockTokens: async function(lpTokenAddr, releaseDate, payoutAddr){
    return await stx({
      from: addr.signer, to: addr.FTPLiqLock,
      abiLookup: ['FTPLiqLock','lockTokens'],
      callArgs: [lpTokenAddr, releaseDate, payoutAddr, addr.router],
    })
  },
  ftpLiqLock_releaseTokens: async function(lpTokenAddr){
    return await stx({
      from: addr.signer, to: addr.FTPLiqLock,
      abiLookup: ['FTPLiqLock','releaseTokens'],
      callArgs: [lpTokenAddr]
    })
  },
  ilo_getListingInfo1: async function(tokenAddr){
    return await stx({
      from: addr.signer, to: addr.FTPILO,
      abiLookup: ['FTPILO','getListingInfo1'],
      callArgs: [tokenAddr, addr.signer]
    })
  },
  ilo_getListingInfo2: async function(tokenAddr){
    return await stx({
      from: addr.signer, to: addr.FTPILO,
      abiLookup: ['FTPILO','getListingInfo2'],
      callArgs: [tokenAddr, addr.signer]
    })
  },
  ilo_getListingInfo3: async function(tokenAddr){
    return await stx({
      from: addr.signer, to: addr.FTPILO,
      abiLookup: ['FTPILO','getListingInfo3'],
      callArgs: [tokenAddr]
    })
  },
  ilo_stake: async function(tokenAddr, amount){
    return await stx({
      from: addr.signer, to: addr.FTPILO,
      abiLookup: ['FTPILO','stake'],
      callArgs: [tokenAddr, addr.signer, amount]
    })
  },
  ilo_sendEth: async function(amount, addrDestination){
    return await stx({
      from: addr.signer, to: addrDestination, value: amount
    })
  },
}
export default stxFns;
