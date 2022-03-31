import {
  Button, Icon, Text, chakra, Center, HStack, VStack,
} from '@chakra-ui/react';
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { FaEthereum } from 'react-icons/fa';

import useCopyToClipboard from "hooks/useCopyToClipboard";
import {
  MdCopyAll,
  MdOutlineCheckCircle,
  MdOutlineHistory,
  MdOutlinePrivateConnectivity
} from 'react-icons/md';
import FrogeEyeEye from 'assets/logos/froge-eyeeye-outline-halfwhites.svg';
import {
  mont
} from '../../../theme/foundations/fonts.js';
import { HamburgerIcon } from '@chakra-ui/icons';
import { GrConnect } from 'react-icons/gr';
import { last4, sIs0 } from '../../../helpers/math/zmath.mjs';
import { useFxAccountStore, useW3Store } from '../../../services/atoms.js';

export function BtnCopyToClipboard({ code }) {
  // isCopied is reset after 3 second timeout
  const [isCopied, handleCopy] = useCopyToClipboard();
  return (
    <button onClick={() => handleCopy(code)}>
      {isCopied ? <MdOutlineCheckCircle /> : <MdCopyAll />}
    </button>
  );
}

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
export const BtnBrandIcon = ({type,children,...rest})=> {
  const _icon = {
    burger: HamburgerIcon,
    history: MdOutlineHistory,
  }[type]
  return (<Button as={_icon} id="BtnBrandIcon"
                  __css={{
                    color: 'global.bg',
                    bgColor: 'brand.green',
                    h: '2rem',
                    w: 'auto',
                    p: '3px',
                    borderRadius: '7px',
                  }} {...rest}><MdOutlineHistory>{children}</MdOutlineHistory></Button>);
}
export const ConnectWalletNavButton = ({active,children,...rest})=> {
  const u_chainId= useW3Store(s=>s.u_chainId);
  const u_account= useW3Store(s=>s.u_account);
  const u_active= useW3Store(s=>s.u_active);
  const _ethBalance= useFxAccountStore(s=>s._ethBalance);
  const buttonStyle = {
    color: 'global.bg', bgColor: 'brand.green',
    h: '1.8rem', w: 'auto', py: '0', px: '8px',
    borderRadius: '25px',
    boxShadow: `hsl(73deg 100% 53%) 1px 1px 5px 0px inset, hsl(83deg 45% 18%) -1px -1px 5px 0px inset`,
    ...mont.hv.md
  }
  const statusIconStyle = {
    backgroundColor: 'brand.green',
    borderRadius: '7px', w: '26px', h: '23px', mx:'4px',
    boxShadow: 'hsl(76deg 100% 61%) 1px 1px 2px 0px, hsl(93deg 28% 27%) -1px -1px 8px 0px inset'
  }
  const ethBalStyle    = {...mont.bd.sm,px:'5px'}
  return (
    <Center id="CWButton" __css={buttonStyle}>
      {!sIs0(_ethBalance[0]) && u_active && (
        <FaEthereum as={Icon}/>
      )}
      {!sIs0(_ethBalance[0]) && u_active && (
        <VStack __css={ethBalStyle}>
          <S lineHeight='12px' {...mont.bd.sm}>{_ethBalance[1]}</S>
          <S lineHeight='11px' {...mont.md.xs}>${_ethBalance[2]}</S>
        </VStack>
      )}
      <Center id="BtnStatusIcon" __css={statusIconStyle}>
        {!u_active ? (<GrConnect size='20px'/>):(<MdOutlinePrivateConnectivity size='20px'/>)}
      </Center>
      {!u_active ? (
        <Text> Connect Wallet</Text>
      ) : (
        <Text fontSize={12}> {u_account&&last4(u_account)}</Text>
      )}
    </Center>
  );
}

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
