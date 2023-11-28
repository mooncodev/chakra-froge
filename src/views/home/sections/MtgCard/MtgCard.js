import { Box } from '@chakra-ui/react';
import React from 'react';
import { HFlexSC, S, VFlex } from '../../../common/UtilityTags.js';
// import Based from 'assets/img/team/Based.png'
// import GREENBG from 'assets/img/mtg-texture-green.jpg'
// import RFBG from 'assets/img/stock-rainforest/square/012.jpg'
// import FrogeLogoSvg from 'assets/logos/froge-logo.svg';
import FrogeEyeEyeSvg from 'assets/logos/froge-eyeeye.svg';
import MTGNatureRich from './mtg-cards/MTG-nature-rich.png';
import { abs, bgImg } from '../../../common/cssHelpers.js';

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
    ...abs(-10,-10,-10,-10),
  }
  const artFG = {
    ...bgImg(FGIMAGE),
    ...abs(-10,-10,-10,-10),
    backgroundPosition: '50% 0%',
    backgroundSize: 'contain',
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
        <strong>{title}</strong><br/><br/>{bio}
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
