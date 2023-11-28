import uniqBy from 'lodash.uniqby'

import { walletsMeta } from './utils.js';
import { remove } from './helpers.js'
import { validateWalletOptions } from './validation.js'
import { device } from './useWalletStore.js';



function injectedModule(options) {
  if (typeof window === 'undefined') return () => null

  if (options) {
    const result = validateWalletOptions(options)

    if (result && result.error) throw result.error
  }

  return helpers => {

    let removeMetaMask = false
    const validWallets = Object.values(walletsMeta).filter((wallet) => {

      const invalidPlatform =
        !wallet.platforms.includes('all') &&
        !wallet.platforms.includes(device.type) &&
        !wallet.platforms.includes(device.os.name)

      const provider = window[wallet.injectedNamespace];

      if (!wallet.supported || invalidPlatform || !provider) {return;}

      let walletExists;
      if (provider.providers && Array.isArray(provider.providers)) {
        walletExists = !!provider.providers.filter(provider =>
          wallet.checkProviderIdentity({ provider, device })
        ).length
      } else {
        walletExists = wallet.checkProviderIdentity({ provider, device })
      }

      if (
        walletExists &&
        provider.isMetaMask &&
        !provider.overrideIsMetaMask &&
        wallet.label !== walletsMeta.MetaMask.label &&
        wallet.label !== 'Detected Wallet'
      ) {
        removeMetaMask = true
      }

      return walletExists
    })



    if (validWallets.length) {
      const removeDetected = validWallets.length > 1
      removeMetaMask = removeMetaMask && validWallets.length > 1
      return validWallets.filter((wallet) => {
        return function (wallet) {
          return !((wallet.label === walletsMeta.Detected.label && wallet.detected) ||
            (wallet.label === walletsMeta.MetaMask.label && wallet.metamask));
        };
      })
      .map(({ label, getIcon, getInterface }) => ({
        label,
        getIcon,
        getInterface
      }))
    }

    return []
  }
}

export default injectedModule
