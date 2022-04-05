import {
  Box,
  Center,
  StylesProvider,
  useMultiStyleConfig,
  useStyles,
  chakra,
  Button,
  VStack,
  Heading,
  Tabs,
  TabList,
  HStack,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  AccordionIcon, Icon, useDisclosure, Collapse, useTheme
} from '@chakra-ui/react';
import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HFlex, S, TextXs, VFlex } from '../../app/bits/UtilityTags.js';
import { mont } from '../../../theme/foundations/fonts.js';
import { froadmapData } from './froadmap-data.js';
import ecodeficircles from '../../../assets/logos/ecodefi-circles.svg';
import FrogImg from 'assets/img/stock-frogs/darkbg/wide/006.jpg'
import { FiChevronDown } from 'react-icons/fi';
import { animate } from 'framer-motion';
import { sSub } from '../../../helpers/math/zmath.mjs';

export function bgBefore({
  opacity='1', bgColor, img,borderRadius='0',
  size='cover',pos='50% 50%',rpt='no-repeat',
}){
  const rv = {opacity:opacity,content:'""',
    pos:"absolute",top:0,right:0,left:0,bottom:0,
    borderRadius:borderRadius}
  if(img){
    rv.backgroundImage = img
    rv.backgroundSize = size
    rv.backgroundRepeat = rpt
    rv.backgroundPosition = pos
  }
  if(bgColor){
    rv.backgroundColor=bgColor
  }
  return {
    _before:rv
  }
  //...bgBefore({opacity:'.6',img:'',})
  //...bgBefore({opacity:'.6',bgColor:'#259',})
}

export function FroadMap({ froadMapObj,id,...rest }) {
  return (<>
    {froadmapData.map((v,i)=>
      (<FroadMapCard froadMapObj={v} key={v.id}/>)
    )}
  </>)

}
const noMarg = {marginStart:'0', marginInline:'0',paddingInline:'0',}
const heights = {
  base:'28rem',
  head:'37%',
  tabrows:'5%',
  body:'55%',
  frogress:'4%'
}

export function FroadMapCard({ froadMapObj,id,...rest }) {
  const v = froadMapObj;
  const theme = useTheme()
  const cardBase = {
    bgColor:'bog.600',
    borderRadius:'12px',
    w:'21.5rem',h:heights.base,
    textAlign: 'center',
    alignItems:'stretch',
    overflow:'hidden',
    color:'bog.200',
    gap: '0.3rem',
  }
  const head = {
    position: 'relative',
    userSelect:'none',
    height:heights.head,
    borderRadius:'12px',
    backgroundImage: require(`./img/${v.headImg}.jpg`),
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0% 0%',
    backgroundSize: '100%',
    cursor:'pointer',
  }
  const headTitle = {
    filter: 'drop-shadow(2px 2px 7px black)',
    textShadow: '2px 2px 7px #000',
    borderRadius:'12px',
    color:'bog.50',
    bgColor:'rgba(17,22,35,.4)',
  }
  const expandIcon = {
    bgColor:'brand.ltgreen',
    borderRadius:'12px',
    color:'brand.dkgreen',
    opacity:'.3',
    w:'1.2rem',h:'1.2rem',
    position: 'absolute',
    top: '.1rem',
    right: '.1rem',
    transition: 'transform .4s ease',
  }
  const collaps = {
    bgColor:'brand.ltgreen',
    borderRadius:'12px',
    color:'brand.dkgreen',
  }

  const tabRow = {
    h: heights.tabrows,
    justifyContent:'space-around',
  }
  const body = {
    marginX:'.2rem',
    borderRadius:'7px',
    bgColor:'bog.650',
    height:heights.body,
    justifyContent:'center', flexGrow:'1', padding:'.9rem',overflowY:'auto',
  }
  const tab = {
    userSelect:'none',
    bgColor:'brand.dkgreen',
    color:'bog.900',
    display:'flex',
    flexGrow:'.48',
    flexBasis:'1px',
    borderRadius:'7px',
    justifyContent:'center',
    alignItems:'center',
    '&[active=true]':{    bgColor:'brand.ltgreen',
    }
  }
  const linksSelected = { color: 'bog.200', bg: 'bog.700' }
  const taskBase = {
    display: 'grid',
    gridTemplateColumns: '1fr 90%',
    width: '95%', textAlign: 'left',
  }

  const headFrogress = {
    position:'absolute',left:'2%',right:'2%',top:'1.5rem',
    h:'.5rem',transition:'all .5s ease',
    w:'unset',
  }


  const panelTitle = { ...mont.lt.sm }
  const panelBody = { ...mont.md.md }
  const [show, setShow] = React.useState(false)
  const toggle = () => setShow(!show)
  const [tabIdx, settabIdx] = React.useState(0)
  const onTab = (elIdx)=>{settabIdx(elIdx)}
  return (
    <Collapse startingHeight={35} in={show} style={collaps}>
    <VFlex sx={cardBase}>
      <Box sx={head} onClick={toggle} position='relative'>
        <S as="h4" sx={headTitle}>{v.title}</S>
        <Center sx={expandIcon} transform={show?'rotate(180deg)':'none'}><FiChevronDown/></Center>
        <FrogressBar style={{ ...headFrogress,opacity:!show?'1':'0' }} pct={v.progress} fillColor={'bog.200'}/>
      </Box>
      <HFlex sx={tabRow}>
        <chakra.button onClick={() => onTab(0)} active={String(tabIdx === 0)} sx={tab}>Description
        </chakra.button>
        <chakra.button onClick={() => onTab(1)} active={String(tabIdx === 1)} sx={tab}>Size
          ({v.sizeRating})
        </chakra.button>
      </HFlex>
      <Box sx={body}>
        {tabIdx === 0 && (<>{v.description}</>)}
        {tabIdx === 1 && (<>{v.sizeText}</>)}
        {tabIdx === 2 && (<>{v.howToHelp}</>)}
        {tabIdx === 3 && (<>{v.tasks.map((v, i) => (
          <Box sx={taskBase} key={i}><S>{i + 1}.</S><S>{v}</S></Box>
        ))}</>)}
      </Box>
      <HFlex sx={tabRow}>
        <chakra.button onClick={() => onTab(2)} active={String(tabIdx === 2)} sx={tab}>How To Help
        </chakra.button>
        <chakra.button onClick={() => onTab(3)} active={String(tabIdx === 3)} sx={tab}>Frogress
          ({v.progress}%)
        </chakra.button>
      </HFlex>
      <FrogressBar onClick={() => onTab(3)} pct={v.progress} imgId={v.prgBarImg}/>
    </VFlex>
    </Collapse>
  )
}
const FrogressBar = ({pct, imgId, onClick, bgColor='bog.650',fillColor='bog.100', style})=>{
  const __before = {
    content: '" "', bgColor:fillColor,
    borderColor:'bog.700', borderRadius:'25px',
    position: 'absolute', top: '0',bottom: '0', left: '0',
    right: `${sSub('100',pct)}%`,opacity:'inherit',
  }
  if(imgId){
   __before.backgroundImage = require(`./img/${imgId}.jpg`)
   __before.backgroundRepeat = 'no-repeat'
   __before.backgroundPosition = '50% 50%'
   __before.backgroundSize = 'cover'
  }
  const frogressBar = {
    bgColor:bgColor,
    position: 'relative',
    border:'1px ridge', borderRadius:'25px', borderColor:'bog.500',
    w:'97%',
    overflow: 'hidden',
    marginBottom:'.3rem',
    alignSelf: 'center',
    cursor:'pointer',
    height:heights.frogress,
    ':before': __before,
    ...style,
  }
  return (
    <HFlex onClick={onClick} sx={frogressBar}/>
  )
}

