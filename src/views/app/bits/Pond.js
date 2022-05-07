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
  userSelect:'none',
}
const fmV_PondBod = {
  open:   { height: '100%',  opacity: 1, transition: { height: { stiffness: 1000, velocity: -100 } } },
  closed: { height: '0', opacity: 0, transition: { height: { stiffness: 1000 } } }
}

export function Pond(props) {
  const initOpen = collapse?[false, true]:[true, false];
  const [isOpen, toggleOpen] = useCycle(...initOpen);
  const { children, collapse=false,title,...rest } = props;
  const sxMinBar = { w:'100%', h:'1rem', bgColor:'bog.700', borderRadius:'0 0 5px 5px' }
  const sxMinHR = { position:'relative', w:'70%', }
  const stPondBod = {height:'100%',flexDirection: 'column',}

  return (
    <VFlexSC name='pond' sx={sxPond} {...rest}>
      <Button as={Center} sx={sxMinBar} onClick={()=>toggleOpen()} >
        <chakra.hr sx={sxMinHR}/>
      </Button>
      {props.title&&<VFlexCC __css={sxPondHeader}>{props.title}</VFlexCC>}
      <motion.div style={stPondBod}
                  variants={fmV_PondBod}
                  animate={isOpen ? "open" : "closed"}
      >
        {children}
      </motion.div>
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

