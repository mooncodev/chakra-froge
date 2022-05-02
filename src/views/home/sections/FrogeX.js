import { chakra,
  Box, Flex, Heading, Image, Link, Tab, TabList, TabPanel, TabPanels, Tabs,
  Text, useBreakpointValue
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { HFlex, S, VFlexCS } from '../../app/bits/UtilityTags.js';
import { SentenceTabs } from '../../app/bits/SentenceTabs.js';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { CopyToClipboardButton } from '../../../hooks/CTCBButton.js';
import UniLogo from 'assets/logos-other/uniswap-logo.png'
import EthScanLogoSVG from 'assets/logos-other/etherscan-logo-circle.svg'
import CMCSVG from 'assets/logos-other/coinmarketcap-logo-white.svg'
const uniswapLink = 'https://app.uniswap.org/#/swap?outputCurrency=0x5fA54fdDF1870C344DbFaBb37dFab8700Ec0Def1'
const contractAddress = '0x5fA54fdDF1870C344DbFaBb37dFab8700Ec0Def1'
export const FrogeX = () => {
  const _h = '60px'
  const [copied,setCopied] = useState(false)

  const triggerCopied = ()=>{
    if(copied){return}
    setCopied(true)
    setTimeout(()=>{
      setCopied(false)
    },2000)
  }
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
                    sentence={[`"FrogeX's liquidity `,`##auto-posts`,` itself, `,`##auto-locks`,
                      ` on the contract itself, and achieves `,`##perpetual-lock`,
                      ` through any-time incrementing of its unlock date."`]}
                    panelContents={[FXText.autopump, FXText.autolock,
                      FXText.perpetualLock]}>
      </SentenceTabs>
      <SentenceTabs id={'CCC'}
                    w={{ base:'98%',sm:'90%',md:'70%',lg:'40rem', }}
                    sentence={[`"FrogeX taxes sells at 8%, and buys at 5%.  Regular transfers are tax-free.  
                      These settings can be changed, but only within very limited ranges.
                      Taxes are purposed 4-ways by managed proportion: `,
                      `##ETH Dividends, `,`##Charity, `,`##Marketing, `,` and Liquidity Auto-Posting."`]}
                    panelContents={[FXText.ethDividends,FXText.charity,FXText.marketing]}>
      </SentenceTabs>
      <CopyToClipboardButton text={contractAddress} sx={{
        backgroundColor:'bog.800',border:'1px solid gray',
      }}>
        Copy Contract Address
      </CopyToClipboardButton>
      <Link href={uniswapLink} target='_blank'
            sx={{
              display:'flex',gap:'.3rem',alignItems:'center',border:'1px solid',borderColor:'gray.800',
              backgroundColor:'purple.700',p:'.3rem .8rem',borderRadius:'5rem',_hover:{backgroundColor:'purple.600'}
            }}
      ><Image src={UniLogo} width={6}/>Buy on Uniswap</Link>
      <Link href='https://coinmarketcap.com/currencies/frogex/' target='_blank'
            sx={{
              display:'flex',gap:'.3rem',alignItems:'center',border:'1px solid',borderColor:'gray.800',
              backgroundColor:'#1d318f',p:'.3rem .8rem',borderRadius:'5rem',_hover:{backgroundColor:'#2753ff'}
            }}
      ><Image src={CMCSVG} width={6}/>FrogeX on CoinMarketCap</Link>
      <Link href='https://etherscan.io/token/0x5fA54fdDF1870C344DbFaBb37dFab8700Ec0Def1' target='_blank'
            sx={{
              display:'flex',gap:'.3rem',alignItems:'center',border:'1px solid',borderColor:'gray.800',
              backgroundColor:'gray.700',p:'.3rem .8rem',borderRadius:'5rem',_hover:{backgroundColor:'gray.600'}
            }}
      ><Image src={EthScanLogoSVG} width={6}/>FrogeX on Etherscan</Link>
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
  ethDividends: {title:'ETH Dividends',body:
      <><Text>Holding froge will net you <em>passive income</em> in the form of
        FrogeX's parent coin, Ethereum. Netting
        Ethereum (instead of FrogeX) results in an over-all avoidance of "selling pressure"
        which would otherwise be present.  It also means that the dividends you are earning
        are not subject to FrogeX's market (AKA FrogeX's chart activity).</Text></>
  },
  charity: {title:'Charity',body:
      <><Text>A portion of taxes from each transaction are allocated toward our eco-charity
        initiatives of planting trees and protecting the rainforests.</Text></>
  },
  marketing: {title:'Marketing',body:
      <><Text>Some of the taxes are portioned toward marketing efforts by the team!
        This allows us to engage in operations which draw in new audiences and attention
        to our project, and FrogeX itself.  Another positive for all invested!</Text></>
  },

}
