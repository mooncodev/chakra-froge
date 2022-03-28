// import { Trans } from '@lingui/macro'
import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { network } from './connectors'
import { useEagerConnect, useInactiveListener } from './web3Hooks.js'
import { Text } from '@chakra-ui/react';
import { useCrawlStore, useW3Store } from '../../../services/atoms.js';


export default function W3RManager({ children }) {
  const u_ = useWeb3React()
  const n_ = useWeb3React('NETWORK')
  const {
    library:u_library, chainId:u_chainId,
    account:u_account, error:u_error, active:u_active,
    activate:u_activate, deactivate:u_deactivate,
  } = u_
  const {
    library:n_library, chainId:n_chainId,
    account:n_account, error:n_error, active:n_active,
    activate:n_activate, deactivate:n_deactivate,
  } = n_

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect()
  console.log('rendered W3RManager.js')
  // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate it
  useEffect(() => {
    if (triedEager && !n_active && !n_error && !u_active) {
      n_activate(network)
    }
  }, [triedEager, n_active, n_error, n_activate, u_active])
  useEffect(async () => {
    console.log('activating everything in W3RManager.js')
    // await u_activate(connectors.network);
    // console.log('u_account', u_account)

    await useW3Store.getState().activateNetwork()
    await useCrawlStore.getState().fetch_ethPrice()
    await useCrawlStore.getState().fetch_fx_getConfig()

    useW3Store.setState({
      u_activate:u_activate,
      u_deactivate:u_deactivate,
      n_activate:n_activate,
      n_deactivate:n_deactivate,
    })
  }, [])
  useEffect(() => {
    useW3Store.setState({
      u_chainId:u_chainId,
      u_account:u_account,
      u_active:u_active,
    })
  }, [u_chainId,u_account,u_active,])
  useEffect(() => {
    useW3Store.setState({
      n_chainId:n_chainId,
      n_account:n_account,
      n_active:n_active,
    })
  }, [n_chainId,n_account,n_active])

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager)

  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  if (triedEager && !u_active && n_error) {
    return (
          <Text>
            Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device.
          </Text>
    )
  }

  return children
}
