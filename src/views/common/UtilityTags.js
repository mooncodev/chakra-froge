import React from 'react';
import { Button, chakra, Flex, Icon, Text, } from '@chakra-ui/react';
import { BsArrowRight } from 'react-icons/bs';
import FrogeEyeEye from 'assets/logos/froge-eyeeye-outline-halfwhites.svg';
import { mont } from '../../theme/foundations/fonts.js';

export function BtnReadMore({onClick=()=>{}}) {
  const textColor = "white"

  return (
    <Button
      onClick={()=>onClick()}
      p="0px"
      variant="no-hover"
      bg="transparent"
      my={{ sm: "1.5rem", lg: "0px" }}
    >
      <Text
        fontSize="sm"
        color={textColor}
        fontWeight="bold"
        cursor="pointer"
        transition="all .5s ease"
        my={{ sm: "1.5rem", lg: "0px" }}
        _hover={{ me: "4px" }}
      >
        Read on
      </Text>
      <Icon
        as={BsArrowRight}
        boxSize="20px"
        fontSize="2xl"
        transition="all .5s ease"
        mx=".3rem"
        cursor="pointer"
        pt="4px"
        _hover={{ transform: "translateX(20%)" }}
      />
    </Button>
  );
}
export const BtnXs = ({children,...rest})=>(<Button {...rest}
  sx={{
    w: 'min-content',
    ...mont.md.sm,
    p: '7px',
    h: 'min-content',
  }}>{children}</Button>
)
export const BtnXs2 = ({children,...rest})=>(<Button {...rest}
  sx={{
    w: 'min-content',
    ...mont.md.sm,
    p: '7px',
    h: 'min-content',
    bgColor:'purple.700'
  }}>{children}</Button>
)
export const BtnFrMap = ({children,...rest})=>(
  <chakra.button {...rest}
          sx={{
            w: 'min-content',
            ...mont.md.sm,
            p: '7px',
            h: 'min-content',
          }}>{children}</chakra.button>
)

export const VFlex = (p)=>(
  <Flex display='flex' direction="column" align="stretch" justify='stretch' {...p} />)
export const VFlexCC = (p)=>(
  <Flex display='flex' direction="column" align="center"  justify='center' {...p} />)
export const VFlexCS = (p)=>(
  <Flex display='flex' direction="column" align="center"  justify='stretch' {...p} />)
export const VFlexSC = (p)=>(
  <Flex display='flex' direction="column" align="stretch" justify='center' {...p} />)
export const HFlex = (p)=>(
  <Flex display='flex' direction="row" justify="stretch" align='stretch' {...p} />)
export const HFlexCC = (p)=>(
  <Flex display='flex' direction="row" justify="center"  align='center' {...p} />)
export const HFlexCS = (p)=>(
  <Flex display='flex' direction="row" justify="center"  align='stretch' {...p} />)
export const HFlexSC = (p)=>(
  <Flex display='flex' direction="row" justify="stretch" align='center' {...p} />)

export const TextXs = (props)=>(<Text fontSize="xs" color="gray.400" {...props} />)
export const S = (props)=>(<chakra.span {...props} />)
export const P = (props)=>(<Text {...props} />)

export const sxFrogeEyeEyeBeforeBg = {
  ':before': {
    content: '" "',
    display: 'block',
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    opacity: '0.15',
    backgroundImage: FrogeEyeEye,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%',
    backgroundSize: '100%',
    pointerEvents: 'none',
  }
}
export const sxGlassBg = {
  backgroundColor: "transparent",
  backdropFilter: "saturate(180%) blur(5px)",
  borderWidth: "1px",
  borderStyle: "solid",
  borderRadius: "7px",
  boxShadow: '4px 4px 19px 0 rgba(0, 0, 0, 0.2)'
}
export const sxGlassBg2 = {
  'background': 'rgba(0, 0, 0, 0.15)',
  'borderRadius': '7px',
  backdropFilter: "saturate(180%) blur(5px)",
  border: '1px solid rgba(30, 30, 60, 1)',
  fontWeight:200,
  boxShadow: '4px 4px 19px 0 rgba(0, 0, 0, 0.2)'
}

const cssNeuMoBtn_clear = {
  borderRadius:'13px',
  background:'linear-gradient(-45deg, rgba(0,0,0,0.22), rgba(150,150,150,0.20))',
  boxShadow: '8px 8px 9px 0 rgba(0, 0, 0, 0.15),' +
    '-4px -4px 12px 0 rgba(215, 215, 215, 0.1)',
}
