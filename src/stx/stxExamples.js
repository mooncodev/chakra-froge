module.exports = {
    router_getWETHaddress: async function () {
        console.log(`init router_getWETHaddress`)
        return this.call({
            from: addr.signer, to: addr.UniswapV2Router02,
            abiLookup: ['UniswapV2Router02', 'WETH'],
        })
    },
    lpToken_validateLpToken: async function (lpTokenAddr) {
        let found_factoryAddr = false, found_symbol = false, found_token0 = false, found_token1 = false;
        const rejectVal = [false, false, false];
        found_symbol = await this.call({
            from: addr.signer, to: lpTokenAddr,
            abiLookup: ['UniswapV2Pair', 'symbol'],
        })
        if (found_symbol !== 'UNI-V2') {
            return rejectVal;
        }
        found_factoryAddr = await this.call({
            from: addr.signer, to: lpTokenAddr,
            abiLookup: ['UniswapV2Pair', 'factory'],
        });
        if (found_factoryAddr !== addr.UniswapV2Factory) {
            return rejectVal;
        }
        found_token0 = await this.call({
            from: addr.signer, to: lpTokenAddr,
            abiLookup: ['UniswapV2Pair', 'token0'],
        });
        if (!found_token0) {
            return rejectVal;
        }
        found_token1 = await this.call({
            from: addr.signer, to: lpTokenAddr,
            abiLookup: ['UniswapV2Pair', 'token1'],
        });
        return [true, found_token0, found_token1];
    },
    lpToken_balanceOf: async function (balOfAddr) {
        //REQUIRES: addr.wip_LpToken was set
        return await this.call({
            from: addr.signer, to: addr.wip_LpToken,
            abiLookup: ['UniswapV2Pair', 'balanceOf'],
            callArgs: [balOfAddr],
        })
    },
    lpToken_allowance_for_FTPLiqLock: async function () {
        //REQUIRES: addr.wip_LpToken was set
        return await this.call({
            from: addr.signer, to: addr.wip_LpToken,
            abiLookup: ['UniswapV2Pair', 'allowance'],
            callArgs: [addr.signer, addr.FTPLiqLock],
        })
    },
    lpToken_approve_FTPLocker: async function (amount) {
        return await this.call({
            from: addr.signer, to: addr.wip_LpToken,
            abiLookup: ['UniswapV2Pair', 'approve'],
            callArgs: [addr.FTPLiqLock, amount],
        })
    },

    erc20Token_name: async function (tokenAddr) {
        return await this.call({
            from: addr.signer, to: tokenAddr,
            abiLookup: ['ERC20', 'name'],
        })
    },
    erc20Token_symbol: async function (tokenAddr) {
        return await this.call({
            from: addr.signer, to: tokenAddr,
            abiLookup: ['ERC20', 'symbol'],
        })
    },
    factory_getPair: async function (tokenAddr) {
        //REQUIRES: addr.WETH was declared via .router_getWETHaddress
        if (!addr.WETH) {
            addr.WETH = await this.router_getWETHaddress();
        }
        const res = await this.call({
            from: addr.signer, to: addr.UniswapV2Factory,
            abiLookup: ['UniswapV2Factory', 'getPair'],
            callArgs: [addr.WETH, tokenAddr],
        })
        return res !== addr.null ? res : false;
    },
    ftpLiqLock_getLockedTokens: async function (lpTokenAddr) {
        const res = await this.call({
            from: addr.signer, to: addr.FTPLiqLock,
            abiLookup: ['FTPLiqLock', 'getLockedTokens'],
            callArgs: [lpTokenAddr],
        })

        return res !== addr.null ? res : false;

    },
    ftpLiqLock_lockTokens: async function (lpTokenAddr, releaseDate, payoutAddr) {
        return await this.call({
            from: addr.signer, to: addr.FTPLiqLock,
            abiLookup: ['FTPLiqLock', 'lockTokens'],
            callArgs: [lpTokenAddr, releaseDate, payoutAddr],
        })
    },
    ftpLiqLock_releaseTokens: async function (lpTokenAddr) {
        return await this.call({
            from: addr.signer, to: addr.FTPLiqLock,
            abiLookup: ['FTPLiqLock', 'releaseTokens'],
            callArgs: [lpTokenAddr]
        })
    },
    signedTx: (_params) => {
        return new Promise(async (resolve, reject) => {
            let nonce = await web3.eth.getTransactionCount(_params.from, 'latest');
            const _encodeFunctionCall = await web3.eth.abi.encodeFunctionCall(_params.function, _params.functionArgs);
            const _tx = {
                from: _params.from,
                to: _params.to,
                data: _encodeFunctionCall,
            }
            if (_params.value) {
                _tx.value = _params.value
            }
            _tx.gas = await web3.eth.estimateGas(_tx);
            _tx.nonce = nonce++;
            const signTx = await signer.signTransaction(_tx, _params.from);
            await web3.eth.sendSignedTransaction(signTx.rawTransaction)
                .on('transactionHash', async (hash) => {
                    await _sleep(2000);
                    resolve(hash)
                })
                .on('error', async (err) => {
                    await _sleep(2000);
                    reject({error: err})
                })
        })
    },
}