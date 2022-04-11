import {
  Box, Center, StylesProvider, useMultiStyleConfig, useStyles, chakra,
  Button, VStack, Heading, Tabs, TabList, HStack, Tab, TabPanels, TabPanel,
  Flex, Icon, useDisclosure, Collapse, useTheme, Text
} from '@chakra-ui/react';
import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HFlex, S, TextXs, VFlex, VFlexCS } from '../../../app/bits/UtilityTags.js';
import { mont } from '../../../../theme/foundations/fonts.js';
import { froadmapData_dev_general,
  froadmapData_dev_siteAndDApp,
  froadmapData_admin_general, } from './froadmap-data.js';
import ecodeficircles from '../../../../assets/logos/ecodefi-circles.svg';
import FrogImg from 'assets/img/stock-frogs/darkbg/wide/006.jpg'
import { FiChevronDown } from 'react-icons/fi';
import { animate } from 'framer-motion';
import { sSub } from '../../../../helpers/math/zmath.mjs';
import { FrogeLogoOutlineSvg } from 'assets/FrogeBrand.js';
import { ParallaxProvider, Parallax, useParallax } from 'react-scroll-parallax';

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

const $$Icon = {
  borderRadius: "50%", border:'2px solid',borderColor:'bog.400',color:'bog.600', opacity:'.1' }
const frMapCategoryBox = {
  borderRadius: "12px", border:'2px solid',borderColor:'bog.400',
  bgColor:'bog.950', padding:'1rem',
  display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center', gap: '0.5rem',
}

export function FroadMap({ froadMapObj,id,...rest }) {
  return (
 <ParallaxProvider>
   <VFlexCS py={7} gap={3} id='froadmap' position='relative'>
      <Heading as={'h1'} color='brand.ltgreen'>Froad Map</Heading>
      <br/>
{/*
      <Box style={{ position:'absolute',top:0,right:0,left:0,bottom:0,overflow:'hidden' }}>
        {Array.from({ length: 20 }, (_, i) =>
          <Parallax key={i} style={{position:'absolute'}}
                    translateX={[`${(Math.random()*2600)}px`,`${(Math.random()*2600)}px`]}
                    translateY={[`${(Math.random()*1800)-900}px`,`${(Math.random()*1800)-900}px`]}
                    scale={[(Math.random()*2), Math.random()*2]}
                    rotate={[Math.random()*720, Math.random()*720]}
                    easing="easeInQuad"
          ><Icon sx={{ ...$$Icon, width:'100px',height:'100px', }} as={FrogeLogoOutlineSvg}/>
          </Parallax>
        )}
      </Box>
*/}
     <chakra.fieldset sx={frMapCategoryBox}>
       <chakra.legend>Administrative</chakra.legend>
       {froadmapData_admin_general.map((v,i)=>
         (<FroadMapCard froadMapObj={v} key={v.id}/>)
       )}
     </chakra.fieldset>

     <chakra.fieldset sx={frMapCategoryBox}>
       <chakra.legend>Development - General</chakra.legend>
       {froadmapData_dev_general.map((v,i)=>
         (<FroadMapCard froadMapObj={v} key={v.id}/>)
       )}
     </chakra.fieldset>

     <chakra.fieldset sx={frMapCategoryBox}>
       <chakra.legend>Development - Site/dApp</chakra.legend>
       {froadmapData_dev_siteAndDApp.map((v,i)=>
         (<FroadMapCard froadMapObj={v} key={v.id}/>)
       )}
     </chakra.fieldset>

    </VFlexCS>
 </ParallaxProvider>
 )
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
    backgroundImage: require(`./img/${v.img[0]}.jpg`),
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
    bgColor:'rgba(17,22,35,.7)',
  }
  const expandIcon = {
    bgColor:'bog.750',
    borderRadius:'12px',
    color:'brand.dkgreen',
    opacity:'.3',
    w:'1.2rem',h:'1.2rem',
    position: 'absolute',
    top: '.16rem',
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
    fontSize:'.8rem',
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
  useEffect(()=>{

  },[tabIdx])
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
        <chakra.button onClick={() => onTab(0)} active={String(tabIdx === 0)} sx={tab}>Description</chakra.button>
        <chakra.button onClick={() => onTab(1)} active={String(tabIdx === 1)} sx={tab}>Get Involved</chakra.button>
      </HFlex>
      <Box sx={body}>
        {tabIdx === 0 && (<>{v.description}</>)}
        {tabIdx === 1 && (<>{v.getInvolved}</>)}
        {tabIdx === 2 && (<>{v.tasks.map((v, i) => (
          <Box sx={taskBase} key={i}><S>{i + 1}.</S><S>{v}</S></Box>
        ))}</>)}
      </Box>
      <HFlex sx={tabRow}>
        <chakra.button onClick={() => onTab(2)} active={String(tabIdx === 2)} sx={{ ...tab,flexGrow:'.98' }}>
          <HStack justify='space-around' flexGrow={1} px='15px'>
            <S flex={1}>Size: <strong>{v.sizeRating}</strong></S>
            <S flex={0}>|</S>
            <S flex={1}>Frogress: <strong>{v.progress}%</strong></S>
          </HStack>
        </chakra.button>
      </HFlex>
      <FrogressBar onClick={() => onTab(2)} pct={v.progress} imgId={v.img[1]}/>
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

