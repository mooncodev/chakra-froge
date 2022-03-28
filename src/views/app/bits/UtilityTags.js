import {
   Button, Icon, Text,chakra,
  useColorMode, useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

import useCopyToClipboard from "hooks/useCopyToClipboard";
import { MdCopyAll, MdOutlineCheckCircle } from 'react-icons/md';
import FrogeEyeEye from 'assets/logos/froge-eyeeye-outline-halfwhites.svg';

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
  const textColor = useColorModeValue("gray.700", "white");

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
  style={{
    width: 'min-content',
    fontSize: '12px',
    fontWeight: '400',
    padding: '7px',
    height: 'min-content',
  }}>{children}</Button>
)
export const TextXs = ({children,...rest})=>(<chakra.p {...rest} fontSize="xs" color="gray.400">{children}</chakra.p>)

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
  'backdropFilter': 'blur(8px)',
  '-webkit-backdrop-filter': 'blur(8px)',
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
