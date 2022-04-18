import { motion } from 'framer-motion';
import { Button, chakra, useToken } from '@chakra-ui/react';
import { VFlex } from '../../app/bits/UtilityTags.js';
import React from 'react';

const Path = props =>
  <motion.path fill="transparent" strokeWidth="3" stroke={useToken('colors','brand.green')}
               strokeLinecap="round" {...props}/>
const $$BurgerBtnWrap = {
  position: "absolute", top: "22px", right: "12px", background: "transparent",
  pointerEvents:'all',userSelect: "none", cursor: "pointer",
}
export const MenuToggle = ({ toggle }) => {
  return (
    <VFlex as={Button} onClick={toggle} style={$$BurgerBtnWrap}>
      <chakra.svg width="20px" viewBox="0 0 23 23">
        <Path variants={{ closed: { d: "M 2 2.5 L 20 2.5" }, open: { d: "M 3 16.5 L 17 2.5" } }}/>
        <Path d="M 2 9.423 L 20 9.423" variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }} transition={{ duration: 0.1 }}/>
        <Path variants={{ closed: { d: "M 2 16.346 L 20 16.346" }, open: { d: "M 3 2.5 L 17 16.346" } }}/>
      </chakra.svg></VFlex>)
};
