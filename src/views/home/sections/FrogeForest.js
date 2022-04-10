import {
  Box, chakra,
  Flex,
  Heading, Icon,
  Image, Link, Tab,
  TabList, TabPanel, TabPanels,
  Tabs,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { HFlex, HFlexSC, S, VFlexCS } from '../../app/bits/UtilityTags.js';
import { SentenceTabs } from '../../app/bits/SentenceTabs.js';
import { Parallax, ParallaxProvider, useParallax } from 'react-scroll-parallax';
import FrogeLogoSvg from 'assets/logos/froge-logo.svg';
import forestBG from "assets/parallax-woods/ParallaxWoodsBG.png";
import F1png from "assets/parallax-woods/ParallaxWoodsFAR.png";
import F2png from "assets/parallax-woods/ParallaxWoodsMID.png";
import F3png from "assets/parallax-woods/ParallaxWoodsCLOSE.png";

const $$Icon = {
  borderRadius: "50%", border:'2px solid',borderColor:'bog.400',color:'bog.600', opacity:'.1' }
// const BG = ()=><Image src={forestBG} style={{width:'100%'}}/>
let base = {
  position:'relative',height:'300px',width:'100%',overflow:'hidden',
  userSelect:'none', gap:'10px',backgroundColor:'#1b1e0b'
}
const $$ABS = {
  position: 'absolute',
  left: 'auto',
  top: '0',
  right: 'auto',
  backgroundImage: forestBG,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '50% 50%',
  backgroundSize: '100%',
}
const mfWraps = {
  position:'absolute',top: '0px',bottom: '0px',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '50% 50%',
  backgroundSize: 'cover',
  // height:'300px',
  // width:'300px',
}

const FROGE = ()=>{
  const __Froge = {
    position:'absolute',bottom: '30px',left: '50%',
    width:'100px',height:'100px',backgroundRepeat: 'no-repeat',backgroundPosition: '0 0',backgroundSize: 'contain',
    backgroundImage: FrogeLogoSvg
  }
  const refFroge = useParallax({
    translateX: [-400,400],
    onChange:(el)=>{
      // console.log(el)
    },
  })
  return (
    <Box sx={__Froge} ref={refFroge.ref}/>
)}

export const Forest = () => {
  const refBase = useRef(null);

  const ref1 = useParallax({ translateX: ['-100px', '100px'], targetElement: refBase.current,})
  const ref2 = useParallax({ translateX: ['-150px', '150px'], targetElement: refBase.current, })
  const ref3 = useParallax({  translateX: ['-200px', '200px'], targetElement: refBase.current,})
  const extend1 = 40 * 5 * -1;
  const extend2 = 70 * 5 * -1;
  const extend3 = 100 * 5 * -1;

  return (
    <Flex style={base} id='froge-forest' ref={refBase}>
      <Box ref={ref1.ref} sx={{ ...mfWraps, backgroundImage: F1png, left: extend1, right: extend1,}}/>
      <Box ref={ref2.ref} sx={{ ...mfWraps, backgroundImage: F2png, left: extend2, right: extend2, }}/>
      <FROGE/>
      <Box ref={ref3.ref} sx={{ ...mfWraps, backgroundImage: F3png, left: extend3, right: extend3, }}/>
    </Flex>
  )
}


export const FrogeForest = () => {
  return (
    <ParallaxProvider>
      <Forest/>
    </ParallaxProvider>
  )
}


