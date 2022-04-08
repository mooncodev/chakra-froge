import React, { useRef, useState } from 'react';
// import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  Image,
  VStack,
  StackDivider,
  HStack,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
  Grid,
  SimpleGrid,
  useBreakpointValue,
} from '@chakra-ui/react';
import signInImage from "assets/img/signInImage.png";
import FrogImg from 'assets/img/stock-frogs/darkbg/wide/006.jpg'
import frogefinity from '../../assets/logos/frogefinity.svg';
import ecodeficircles from '../../assets/logos/ecodefi-circles.svg';
import FrogeEyeEye from '../../assets/logos/froge-eyeeye-outline-halfwhites.svg';
import { HFlex, HFlexCC, S, TextXs, VFlex, VFlexCS, VFlexSC } from '../app/bits/UtilityTags.js';
import { SentenceTabs } from '../app/bits/SentenceTabs.js';
import { FroadMap, FroadMapCard } from './froadmap/FroadMap.js';
import { motion, useViewportScroll, useMotionValue, useTransform } from "framer-motion"
import { NewsMarquee } from './sections/marquee.js';
import { FrogeAtAGlance } from './sections/FrogeAtAGlance.js';

export const WalkyFroge = () => {
  const { scrollYProgress } = useViewportScroll()

  return (
    <motion.path
      d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
      style={{ pathLength: scrollYProgress }}
    />
  )
}
function EcoDefiCircles({ width, height, fill, onToggle }) {
  const [state,setState] = useState('hide')
  const ffinStyle = {
    position: 'absolute',
    left: 'auto',
    top: { base: '96px', md: '86px' },
    right: 'auto',
    opacity:'.6',
    '& ellipse:hover':{fillOpacity:'1', cursor:'pointer'},
    '& g':{pointerEvents:'none'}
  }
  function onClick(dir){
    if(dir === state){
      setState('hide');onToggle('hide');
    }else{
      setState(dir);onToggle(dir);
    }
  }

  return (
    <Box sx={ffinStyle}>
      <svg xmlns="http://www.w3.org/2000/svg" width="319.19" height="242.5" viewBox="0 0 319.19 242.5">
        <ellipse onClick={()=>{onClick('left')}} stroke='#90c63e' strokeWidth='24px' fill='#212e3e' fillOpacity={state==='left'?'1':'0.5'}
                 cx="92.74" cy="121.25" rx="80.74" ry="109.25"/>
        <ellipse onClick={()=>{onClick('right')}} stroke='#212e3e' strokeWidth='24px' fill='#90c63e' fillOpacity={state==='right'?'1':'0.5'}
                 cx="244.18" cy="129.38" rx="63.01" ry="73.63"/>
        <g>
          <path fill="#212e3e" d="M214.44,123.17v-35h13.47a19.79,19.79,0,0,1,7.66,1.39,15.36,15.36,0,0,1,8.88,9.3,20,20,0,0,1,1.14,6.79,19.73,19.73,0,0,1-1.26,7.23,15.59,15.59,0,0,1-3.58,5.53,16,16,0,0,1-5.58,3.55,20,20,0,0,1-7.26,1.26Zm21.37-17.57a12,12,0,0,0-.54-3.7A8.33,8.33,0,0,0,233.72,99a7.13,7.13,0,0,0-2.5-1.85,8.05,8.05,0,0,0-3.31-.66h-3.85v18.26h3.85a7.85,7.85,0,0,0,3.36-.69,7,7,0,0,0,2.49-1.92,8.39,8.39,0,0,0,1.53-2.92A12.15,12.15,0,0,0,235.81,105.6Z" />
          <path fill="#212e3e" d="M262,123.67a16.49,16.49,0,0,1-6.08-1.06,12.89,12.89,0,0,1-4.46-2.89,12.26,12.26,0,0,1-2.74-4.2,13.32,13.32,0,0,1-.94-5,15.42,15.42,0,0,1,.91-5.33,12.39,12.39,0,0,1,2.72-4.4,13.09,13.09,0,0,1,4.44-3,17.36,17.36,0,0,1,12.27,0,13.18,13.18,0,0,1,4.46,3,12.07,12.07,0,0,1,2.72,4.29,14.44,14.44,0,0,1,.91,5.11c0,.49,0,1-.07,1.51s-.11,1-.17,1.35H257.73a3.65,3.65,0,0,0,1.53,3,5.35,5.35,0,0,0,3,.91,6.31,6.31,0,0,0,2.89-.69,3.46,3.46,0,0,0,1.8-1.92l8,2.27a12.59,12.59,0,0,1-4.86,5.08A15.37,15.37,0,0,1,262,123.67Zm4.14-16.24a4.82,4.82,0,0,0-1.38-3,4.47,4.47,0,0,0-5.83,0,4.93,4.93,0,0,0-1.38,3Z" />
          <path fill="#212e3e" d="M226.34,169.17v-35h24v8.4H236v5.82h11.75v7.8H236v13Z"/>
          <path fill="#212e3e" d="M253.29,141v-7.9h9.38V141Zm0,28.13v-26h9.38v26Z"/>
        </g>
        <g>
          <path fill='#90c63e' d="M71.68,129.11v11.22H38.29V93.47h32.8v11.22H51.16v6.6h17v10.43h-17v7.39Z"/>
          <path fill="#90c63e" d="M74.26,123a19.05,19.05,0,0,1,1.25-6.83,16.86,16.86,0,0,1,3.66-5.74,17.75,17.75,0,0,1,6-4A21.09,21.09,0,0,1,93.33,105a19.71,19.71,0,0,1,10.59,2.64,17,17,0,0,1,6.37,6.8l-12.21,3.7a5.55,5.55,0,0,0-4.81-2.58,5.68,5.68,0,0,0-4.36,1.95,9.42,9.42,0,0,0,0,11,5.68,5.68,0,0,0,4.36,2,5.56,5.56,0,0,0,4.81-2.57l12.21,3.69a17,17,0,0,1-6.37,6.8A19.71,19.71,0,0,1,93.33,141a21.09,21.09,0,0,1-8.18-1.49,17.6,17.6,0,0,1-6-4,16.76,16.76,0,0,1-3.66-5.74A19,19,0,0,1,74.26,123Z"/>
          <path fill="#90c63e" d="M131,141a21.12,21.12,0,0,1-8.22-1.49,17.72,17.72,0,0,1-5.94-4,16.4,16.4,0,0,1-3.63-5.74,19.73,19.73,0,0,1,0-13.66,16.49,16.49,0,0,1,3.63-5.74,17.87,17.87,0,0,1,5.94-4,23.34,23.34,0,0,1,16.41,0,17.8,17.8,0,0,1,6,4,16.49,16.49,0,0,1,3.63,5.74,19.73,19.73,0,0,1,0,13.66,16.4,16.4,0,0,1-3.63,5.74,17.65,17.65,0,0,1-6,4A21.17,21.17,0,0,1,131,141Zm-6.14-18a8.07,8.07,0,0,0,1.72,5.48,5.92,5.92,0,0,0,8.84,0,9.59,9.59,0,0,0,0-11,5.92,5.92,0,0,0-8.84,0A8.07,8.07,0,0,0,124.81,123Z"/>
        </g>
      </svg>
    </Box>
  )
}

function PgHomeLanding() {
  // Chakra color mode
  // const titleColor = "green.200"
  // const textColor = "white"
  const ffinityStyle = {
    ':before': {
      content: '" "',
      position: 'absolute',
      left: 'auto',
      top: '0',
      right: 'auto',
      backgroundImage: ecodeficircles,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 50%',
      backgroundSize: '100%',
    },
  }
  const [ecoDefi,setEcoDefi] = useState()

  return (
    <VFlex
      // divider={<StackDivider borderColor='gray.200' />}
      // spacing={0}
    >
      {/** HERO SECTION **/}
      <VFlexCS minHeight='540px' bg='green.800' bgImage={FrogImg} bgSize="cover"
              bgPosition="50%" position='relative' userSelect='none'>
        <EcoDefiCircles onToggle={(val)=>setEcoDefi(val)}/>
        <VFlex position='relative'>
          <Heading as="h1" size="xl" textAlign="center">
            Our Hope,
          </Heading>
          <Heading as="h1" size="xl" textAlign="center">
            Their Hop.
          </Heading>
          <HFlexCC gap={3} fontSize="lg">
            <Text textAlign="right">Welcome to Froge:</Text>
            <Text fontSize='2rem' textAlign="center" color="brand.green" fontWeight='900'>
              the world's
            </Text>
            <Text textAlign="left">first, and leading</Text>
          </HFlexCC>
        </VFlex>
        {ecoDefi === 'left' && (
          <Box pos='absolute' bottom='.6rem' w={{ base:'95%',sm:'80%',md:'60%',lg:'50%', }} bgColor='bog.600' borderRadius='7px' p='6px' opacity='.8' lineHeight='normal'>
            <HFlex alignItems='start'>
              <S fontSize='60px' lineHeight='47px'>F</S>
              <S alignSelf='center'>roge is special as a project geared entirely toward the miracle idea that a currency itself can make things easy by effortlessly raising the funds to manifest the positive change that our world needs.
                (Like taxes, but for good things)</S>
            </HFlex>
          </Box>)}
        {ecoDefi === 'right' && (
          <Box pos='absolute' bottom='.6rem' w={{ base:'90%',sm:'60%',md:'45%',lg:'30%', }} bgColor='bog.600' borderRadius='7px' p='6px' opacity='.8' lineHeight='normal'>
            <HFlex alignItems='start'>
              <S fontSize='60px' lineHeight='47px'>D</S>
              <S alignSelf='center'>eFi is special for being the most attractive, and most valuable form of crypto currency.
              </S>
            </HFlex>
          </Box>)}
      </VFlexCS>


      {/** MARQUEE **/}
      <VFlexCS h='4rem'>
        <NewsMarquee/>
      </VFlexCS>

      {/** FROGE AT A GLANCE **/}
      <FrogeAtAGlance/>

      {/** FROGEX SECTION **/}
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
        <SentenceTabs id={'BBB'}
                      w={{ base:'98%',sm:'90%',md:'70%',lg:'40rem', }}
                      sentence={[`"FrogeX taxes sells at 8% and buys at 5%.  These 
                      settings can be changed, but only within very limited ranges.
                      Taxes are purposed 4-ways by managed proportion: 
                      ETH Dividends, Charity, Marketing, and Liquidity Auto-Pump.`]}
                      panelContents={[]}>
        </SentenceTabs>
      </VFlexCS>

      {/** FROADMAP SECTION **/}
      <VFlexCS py={7} gap={3} id='froadmap'>
        <Heading as={'h1'} color='brand.ltgreen'>Froad Map</Heading>
        <br/>
        <FroadMap/>
      </VFlexCS>
    </VFlex>
  );
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
export default PgHomeLanding;
