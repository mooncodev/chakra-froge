import {
  Box,
  Flex,
  Heading,
  Image, Link, Tab,
  TabList, TabPanel, TabPanels,
  Tabs,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { HFlex, S, VFlexCS } from '../../app/bits/UtilityTags.js';
import { SentenceTabs } from '../../app/bits/SentenceTabs.js';

export const FrogeX = () => {
  const _h = '60px'

  return (
    <VFlexCS mb='2rem' gap={5} id='frogex'>
      <Heading as={'h1'} color='brand.ltgreen'>FrogeX</Heading>
      <S fontSize='.7rem'>Click on the sentences for detail!</S>
      <SentenceTabs id={'AAA'}
                    w={{ base:'98%',sm:'90%',md:'70%',lg:'40rem', }}
                    sentence={[`"FrogeX is a `,`##hyper-optimized`,`, `,`##managed`,`, `,
                      `##Eth Reflection`,` smart contract of the `,`##ERC20 token standard`,`."`]}
                    panelContents={[FXText.hyperoptimized, FXText.managed,
                      FXText.ethReflectionSmartContract, FXText.oftheERC20TokenStandard]}>
      </SentenceTabs>
      <SentenceTabs id={'BBB'}
                    w={{ base:'98%',sm:'90%',md:'70%',lg:'40rem', }}
                    sentence={[`"FrogeX's liquidity `,`##auto-pumps`,` itself, `,`##auto-locks`,
                      ` on the contract itself, and achieves `,`##perpetual-lock`,
                      ` through any-time incrementing of its unlock date`]}
                    panelContents={[FXText.autopump, FXText.autolock,
                      FXText.perpetualLock]}>
      </SentenceTabs>
      <SentenceTabs id={'CCC'}
                    w={{ base:'98%',sm:'90%',md:'70%',lg:'40rem', }}
                    sentence={[`"FrogeX taxes sells at 8% and buys at 5%.  These 
                      settings can be changed, but only within very limited ranges.
                      Taxes are purposed 4-ways by managed proportion: 
                      ETH Dividends, Charity, Marketing, and Liquidity Auto-Pump.`]}
                    panelContents={[]}>
      </SentenceTabs>
    </VFlexCS>
  )
}


const FXText = {
  hyperoptimized: {title:'Hyper Optimized',body:
      (<><Text>The development of FrogeX was born from a discovery that existing
        Eth Reflection tokens might be able to operate at a fraction of the cost, if only a developer would
        put in the work to integrate the logic from multiple separate contracts into just 1
        contract - the contract of the token itself.
      </Text>
        <Text>One of our community members (fully doxxed LINK), found this
          opportunity and decided to pursue it, and in doing so spearheaded the project's path toward
          growth.
        </Text>
        <Text>Though it took 8 months to develop, transaction base-costs (measured in a unit
          called "Gas Usage") were improved by between <strong>40-70%</strong>!
        </Text></>)
  },
  managed: {title:'Managed Contract',body:(<>By not renouncing ownership of the contract, and by making available to the owner of
      the contract a limited set of configuration controls, we are able to adjust how the
      token works in order to maintain a balance between project goals and token holder
      benefits, while also avoiding potential shortcomings, risks, and less-than-ideal operation
      (tokenomics).</>)},
  ethReflectionSmartContract: {title:'Eth Reflection',body:<>Holding FrogeX gives you passive income in the form of Ethereum. This is better than
      accruing the token itself as a dividend, because it avoids the creation of sell-pressure
      on the market.</>},
  oftheERC20TokenStandard: {title:'ERC20 Standard',body:(<>This means that our token "hooks in" (integrates) with the DeFi ecosystem at large using this
      particular standard. For example, popular sites (like Etherscan) are able to use this
      standard to "automatically" interact with our token.</>)},

  autopump: {title:'Auto Pump',body:<>Number go up.</>},
  autolock: {title:'Auto Lock',body:
      (<><Text>When FrogeX auto-pumps it collects what's called Liquidity Tokens (aka "Pair Tokens" or "LP Tokens").
        Liquidity Tokens work as a receipt for later claim of the token amounts (WETH, FROGEX, etc) added to
        the liquidity pool. These tokens are what is traded when "rug pulls" occur.</Text>
        <Text>Contracts out in the wild may lock their liquidity at first, but if they have an
          auto-pump feature then the receipt tokens can possibly be accrued to the contract <em>owner</em>, and these
          accrued tokens would be a risk to investors.</Text>
        <Text>FrogeX, by contrast, collects all LP tokens on-contract and there is nothing the owner can do with
          them unless one of the contract's settings named "lockerUnlockDate" is exceeded by the blockchain's
          timestamp. </Text></>)
  },
  perpetualLock: {title:'Perpetual Lock',body:
      <><Text>The owner of FrogeX can, at any time, increment the date when the liquidity would unlock.
        The unlock date can <em>only</em> be incremented.  By continually setting the unlock date forward,
        it is possible for investors to never be faced with the fear that the liquidity will ever unlock.</Text></>
  },

}
