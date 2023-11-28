
export const rpcAPI = {
  wallet_watchAsset: async ()=>{ //adds asset to active account
    window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // In the future, other standards will be supported
        options: {
          address: '0x5fA54fdDF1870C344DbFaBb37dFab8700Ec0Def1', // The address of the token contract
          symbol: 'FROGEX', // A ticker symbol or shorthand, up to 5 characters
          decimals: 9, // The number of token decimals
          image: 'https://foo.io/token-image.svg', // A string url of the token logo
        },
      },
    }).then((success) => {
      if (success) {
        console.log('FOO successfully added to wallet!')
      } else {
        throw new Error('Something went wrong.')
      }
    }).catch(console.error)
  },
  wallet_scanQRCode: async ()=>{ //adds asset to active account
    window.ethereum.request({
      method: 'wallet_scanQRCode',
      // The regex string must be valid input to the RegExp constructor, if provided
      params: ['\\D'],
    }).then((success) => {
      if (success) {
        console.log('FOO successfully added to wallet!')
      } else {
        throw new Error('Something went wrong.')
      }
    }).catch(console.error)
  },
}
