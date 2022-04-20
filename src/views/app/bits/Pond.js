import {
  Box, Center,
  StylesProvider,
  useMultiStyleConfig,
  useStyles, chakra, Button, VStack, Heading, Collapse, useTheme, Flex
} from '@chakra-ui/react';
import React, { useCallback, useRef } from 'react';
import { VFlexCC, VFlexSC } from './UtilityTags.js';
import { motion, useCycle } from 'framer-motion';


const sxPond={
  position: "relative",
  width: "345px",
  height: 'fit-content',
  padding: "0 1.2rem",
  gap:'5px',
  // minWidth: "300px",
  // maxWidth: "360px",
  // wordBreak: "break-all",
  backgroundColor: 'global.panel',
  borderRadius:'panelsRadius',
  backgroundClip: "border-box",
  overflow:'hidden',
}
const sxPondHeader={
  justifyContent:'center',
  marginTop: '.17rem',
  marginBottom: '.1rem',
  fontFamily: 'rale',
  fontSize: '1.3rem',
  fontWeight: 'rale.heavy',
}
export function Pond(props) {
  const { children,
    collapse,...rest } = props;
  const initShow = collapse?false:true;
  const theme = useTheme();
  const minBarStyle = {
    w:'100%', h:'1rem', bgColor:'bog.500', opacity:'.4',borderRadius:'0 0 5px 5px'
  }
  const minHr = {
    position:'relative',
    // _hover:{bgColor:'#fff'},
    w:'70%',
  }
  const collaps = {
    borderRadius:'panelsRadius',
  }
  const toggle = () => setShow(!show)
  const [show, setShow] = React.useState(initShow)
  let AnimBox = motion(Flex);
  return (
    <VFlexSC sx={sxPond} {...rest}>
      <Center as={Button} {...minBarStyle} onClick={toggle} >
        <chakra.hr sx={minHr}/>
      </Center>
      {props.title&&<VFlexCC __css={sxPondHeader}>{props.title}</VFlexCC>}
      <AnimBox style={{height:'0'}} animate={{ height: show ? 'fit-content' : '0' }} flexDirection='column'>
        {children}
      </AnimBox>
    </VFlexSC>

  );
}

export function PondHeader(props) {
  return <VFlexCC __css={sxPondHeader} {...props}/>;
}
const sxPondBody={
  display: "flex",
  width: "100%",
  fontFamily: 'mont',
  fontSize: '0.9rem',
  fontWeight: 'mont.medium',
}
export function PondBody(props) {
  return <VStack __css={sxPondBody} {...props}/>;
}

