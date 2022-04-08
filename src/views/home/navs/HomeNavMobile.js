/*
import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "../motionexample/use-dimensions.js";
import { chakra, useTheme, useToken,useOutsideClick  } from '@chakra-ui/react';
import { NAV_ITEMS } from './NAV_ITEMS.js';

const Path = props => (<motion.path fill="transparent" strokeWidth="3"
                                    stroke={useToken('colors','brand.green')}
                                    strokeLinecap="round" {...props}/>)
const $$BurgerBtn = {
  outline: "none", border: "none", userSelect: "none", cursor: "pointer",
  position: "absolute", top: "11px", right: "12px", width: "50px", height: "50px",
  borderRadius: "50%", background: "transparent", pointerEvents:'all',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}
export const MenuToggle = ({ toggle }) => {
  return (
  <chakra.button onClick={toggle} style={$$BurgerBtn}>
    <chakra.svg width="23" height="23" viewBox="0 0 23 23">
    <Path variants={{ closed: { d: "M 2 2.5 L 20 2.5" }, open: { d: "M 3 16.5 L 17 2.5" } }}/>
    <Path d="M 2 9.423 L 20 9.423" variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }} transition={{ duration: 0.1 }}/>
    <Path variants={{ closed: { d: "M 2 16.346 L 20 16.346" }, open: { d: "M 3 2.5 L 17 16.346" } }}/>
  </chakra.svg></chakra.button>)};

const fmV_Sidebar = {
  open: (height = 1000) => ({ clipPath: `circle(${height * 2 + 200}px at 262px 33px)`,
    transition: { type: "spring", stiffness: 20, restDelta: 2 } }),
  closed: { clipPath: "circle(26px at 262px 33px)",
    transition: { delay: 0.3, type: "spring", stiffness: 400, damping: 40 } }
}
const fmV_Navigation = {
  open:   { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
}

const itemIds = [0, 1, 2, 3, 4];
const $$ul = { position: "absolute", top: "100px", width: "230px", margin: "0",padding: "25px" }
const $$li = { margin: "0 0 20px 0", padding: "0", listStyle: "none", display: "flex", alignItems: "center", cursor: "pointer"}
export const HomeNavMobile = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  useOutsideClick({ref:containerRef,handler:()=>isOpen&&toggleOpen()})
  const { height } = useDimensions(containerRef);
  const navBase = { position: "fixed", top: "0", right: "0", bottom: "0", width: "300px", zIndex:'900',
    pointerEvents:isOpen?'all':'none', }
  const navBg = { position: "fixed", top: "0", right: "0", bottom: "0", width: "300px", background: useToken('colors','bog.800') }

  return (
    <motion.nav
      style={navBase}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div style={navBg} variants={fmV_Sidebar} />
      <motion.ul style={$$ul} variants={fmV_Navigation}>
        {NAV_ITEMS.map(i => (
          <MenuItem i={i} key={i} />
        ))}
      </motion.ul>
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

const $$Icon = { width: "40px", height: "40px", borderRadius: "50%", flex: "40px 0", marginRight: "20px" }
const $$Text = { width: "200px", height: "20px", borderRadius: "5px", flex: 1 }
const fmV_MenuItem = {
  open:   { y: 0,  opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
  closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } }
}
const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];
export const MenuItem = ({ i }) => {
  const style = { border: `2px solid ${colors[i]}` };
  return (
    <motion.li style={$$li}
               variants={fmV_MenuItem}
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.95 }}
    >
      <div style={{ ...$$Text, ...style }}></div>
      <div style={{ ...$$Icon, ...style }}></div>
    </motion.li>
  );
};
*/
