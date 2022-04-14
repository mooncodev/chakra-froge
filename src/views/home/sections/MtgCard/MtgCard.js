import {
  Box, Center, StylesProvider, useMultiStyleConfig, useStyles, chakra,
  Button, VStack, Heading, Tabs, TabList, HStack, Tab, TabPanels, TabPanel,
  Flex, Icon, useDisclosure, Collapse, useTheme, Text, Image
} from '@chakra-ui/react';
import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { mont } from 'theme/foundations/fonts.js';
import FrogImg from 'assets/img/stock-frogs/darkbg/wide/006.jpg'
import { FiChevronDown } from 'react-icons/fi';
import { animate } from 'framer-motion';
import { FrogeLogoOutlineSvg } from 'assets/FrogeBrand.js';
import { ParallaxProvider, Parallax, useParallax } from 'react-scroll-parallax';
import { HFlexSC, S, VFlex, VFlexCS } from '../../../app/bits/UtilityTags.js';
import Based from 'assets/img/team/Based.png'
import GREENBG from 'assets/img/mtg-texture-green.jpg'
import RFBG from 'assets/img/stock-rainforest/square/012.jpg'
import ecodeficircles from '../../../../assets/logos/ecodefi-circles.svg';
import FrogeLogoSvg from 'assets/logos/froge-logo.svg';
import FrogeEyeEyeSvg from 'assets/logos/froge-eyeeye.svg';
import MTGNatureRich from './mtg-cards/MTG-nature-rich.svg';

/**@example
 *  ...bgImg(Based), ...abs(0,0,'20px',0),
 */
export const bgImg = (img)=>({ background:`50% 50%/cover no-repeat url(${img})` })
export const pxNumToRem = (v)=>{
  if(['vw','vh','em','%','px'].indexOf(v)>-1){return v}return (parseInt(v) * .0625) + 'rem'}
export const numToPxStr = (v)=>{
  if(/\D/.test(v)){return v}return (v + 'px')}
export const absXY=(x='0',y='0')=>({position:'absolute',top:numToPxStr(y),right:numToPxStr(x),bottom:numToPxStr(y),left:numToPxStr(x),})
export const absX=(x='0')=>({ position:"absolute", right:numToPxStr(x), left:numToPxStr(x),})
export const absY=(y='0')=>({ position:"absolute", top:numToPxStr(y), bottom:numToPxStr(y),})
export const abs=(top,right,bottom,left,rv={position:"absolute"})=>{
  if(top||top===0){rv.top=numToPxStr(top)}if(right||right===0){rv.right=numToPxStr(right)}
  if(bottom||bottom===0){rv.bottom=numToPxStr(bottom)}if(left||left===0){rv.left=numToPxStr(left)}return rv;
}

const $$ = {
  descriptionText: `When Oath of Nissa enters the battlefield,
    look at the top three cards of your library. 
    You may reveal a creature, land, or
    planeswalker card from among them and put 
    it into your hand. Put the rest on the
    bottom of your library in any order.
  `,
  descriptionText2: `You may spend mana as though it were mana of any color to cast planeswalker spells.`,
  quoteText: `"For the life of every plane, I will keep watch."`,
}
export function MtgCard({ cardObj, ...rest }) {
  const { imgs, name, tgHandle, title, bio } = cardObj
  const FGIMAGE = imgs[0]
  const BGIMAGE = imgs[1]
  const base = {//width:'21.875rem',height:'30.625rem'
    width:'350px',height:'490px',position:'relative',
    ...bgImg(MTGNatureRich),
    fontFamily:'xiao', color:'black',fontSize:'1.1rem',
  }
  const titlePlate = {
    fontWeight:'900',
    ...abs(24,0,0,32)
  }
  const artPlate = {
    ...abs(56,27,218,27),
    overflow:'hidden',
  }
  const artBG = {
    ...bgImg(BGIMAGE),
    ...abs(-10,-10,-10,-10)
  }
  const artFG = {
    ...bgImg(FGIMAGE),
    ...abs(-10,-10,-10,-10)
  }
  const typePlate = {
    ...abs(275,0,null,32),
    _before: {
      content:'""',
      ...bgImg(FrogeEyeEyeSvg),...abs(3,29),
      w:'20px',h:'20px',
      backgroundSize: '83%',
      boxShadow:'0px 0px 1px 0px black inset',
      borderRadius:'20px',
    },
  }
  const descPlate = {
    ...abs(311,29,42,31),
    fontSize:'.95rem',
    overflowY:'auto',
    px:'.1rem',
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      width: "2px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "green.700",
      borderRadius: "24px",
    },
    "&::-webkit-scrollbar-button:end:increment": {
      height: '13%',
      display: 'block',
      background: 'transparent',
    },
    clipPath:'polygon(0 0, 100% 0, 100% 89%, 83% 89%, 83% 100%, 0 100%)',
  }
  const powerPlate = {
    ...abs(null,37,28)
  }
  const footer = {
    ...abs(null,36,12,34),lineHeight: 'normal',
    fontSize:'.55rem',color:'#BBBBBB',
  }
  const footMidAccent = {
    ...abs(null,null,29,'calc(50% - 1rem)'),
    borderRadius:'50%',
    border:'2px solid black',
    bgColor:'green.700',
    w:'2rem',h:'1rem',
  }

  return (
    <Box sx={base}>
      <Box sx={titlePlate}>{name}</Box>
      <Box sx={artPlate}>
        <Box sx={artBG}/>
        <Box sx={artFG}/>
      </Box>
      <Box sx={typePlate}>{tgHandle}</Box>
      <Box sx={descPlate} pb={4}>
        {bio}
      </Box>
      <Box sx={powerPlate}>4/4</Box>
      <Box sx={footMidAccent} flex={0}/>
      <HFlexSC sx={footer} justify='space-between' alignItems='end'>
        <VFlex flex={1}>
          <Box>123/321 R</Box>
          <Box>Ribbit Ribbit</Box>
        </VFlex>
        <S flex={1} textAlign={'right'}>2022 Wizards of the Froge</S>
      </HFlexSC>
    </Box>
  )
}
