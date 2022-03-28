const ethers = require('ethers');
const { MaxUint256 } = ethers.constants;
const stx = require('../../components/stx');

function _sleep(ms) {//usage: await _sleep(5000);
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const mainnetAddr = {//mainnet
    UniswapV2Router02: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    UniswapV2Factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    FTPLiqLock: "0x55E2aDaEB2798DDC474311AD98B23d0B62C1EBD8",
    FTPILO: "0xa15dD6E744820A7A00803784dE9b69C9Ff1998BB",
    //FTP token:
    ERC20_InfinityToken: "0x7fe4fbad1fee10d6cf8e08198608209a9275944c",
    Pair_InfinityToken_WETH: "0x4a9275d2217ed01e49d5b6746e01f8deb11bd1d3",
    //NONFTP token:
    Pair_FLOKI_WETH: "0x10e4a463f2ace6e3836fe547e885993844299be6",
    Pair_HOGE_WETH: "0x7fd1de95fc975fbbd8be260525758549ec477960",
    ERC20_HOGE: "0xfad45e47083e4607302aa43c65fb3106f1cd7607",
    Pair_HOGE_DAI: "0xb3e88fffce1a7be5b901338506d3ec4b395e18d1",
    Pair_HOGE_USDT: "0xb4a890fcfd936a338f703b502ccdf8892d5f6aec",
  };
  const ropstenAddr = {//ropsten
    UniswapV2Router02: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    UniswapV2Factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    // FTPLiqLock: "0x3Fcc7d2decE3750427Aa2a6454c1f1FE6d7B1c92",
    FTPLiqLock: "0x607B9777Ba987C8384BD9BE4f0268394ae043ce5",
    FTPILO: "0xA6772cFbeDf2536b6D18299364cdF1107Bedb268",
    //FTP token:
    ERC20_Sandstorm: "0x46b8f5e10e2e74f562e15018e7f24cc3eb3fb668",
    Pair_Sandstorm_WETH: "0x37661ae374133f59fc31d6d37b8af4ca9d992987",
    ERC20_WHALE: "0xce84ae79cddff13af623a54ec832313077f44c66",
    Pair_WHALE_WETH: "0x344c2eeeb608ab88560404019e9ec27366cea033",
    //NONFTP token:
    ERC20_HOGE: "0x209cab706528909f032b81acfde859c3a2202b28",
    ERC20_LuckyFloki: "0x82dde4e90b63757d4ac133ed4538bb1c10f86f51",
    Pair_LuckyFloki_WETH: "0x2941c8e0b23dc6b1f43020ee2947ea6aba03db6e",
    ERC20_MockyToken: "0x4c15FAd8dbD839eC793727b18b50A336E63a9370",
    Pair_MockyToken_WETH: "0x5aC81813F5eF63eE6fE5D380d6f9d338FBF38F85",
  };
  var addr = ropstenAddr;
  addr.null = "0x0000000000000000000000000000000000000000";
  addr.router = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  addr.WETH = false;

  try{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const network = await provider.getNetwork();
    const signer = await provider.getSigner();
    if (network.chainId == 1) {
      addr = mainnetAddr;
      addr.null = "0x0000000000000000000000000000000000000000";
    }
    addr.signer = await signer.getAddress();
  }catch(e){
    addr.signer = addr.null
  }
  

  const stxFns = {
    router_getWETHaddress: async function(){
      // console.log(`init router_getWETHaddress`)
      const _s = addr.signer==addr.null?'0x1011f61Df0E2Ad67e269f4108098c79e71868E00':addr.signer;
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
  };
  return {
    addr,
    stxFns,
  };
}
module.exports = main;
