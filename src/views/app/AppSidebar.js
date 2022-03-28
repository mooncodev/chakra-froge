import { HamburgerIcon } from "@chakra-ui/icons";
// chakra imports
import {
  Box,
  Button, Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex, HStack, Icon,
  Link,
  Stack,
  Text, useBreakpointValue,
  useColorModeValue as ucmv,
  useDisclosure, useStyleConfig, VStack,
} from '@chakra-ui/react';
import IconBox from "components/Icons/IconBox.js";
import { Separator } from "components/Separator/Separator.js";
import { AppSidebarHelp } from "components/Sidebar/AppSidebarHelp.js";
import PropTypes from "prop-types";
import React, { useEffect } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { RocketIcon } from '../../components/Icons/Icons.js';
import { useAtom } from 'jotai';
import { appNavDrawerOpenAtom } from '../../services/atoms.js';
import { FrogeLogo } from '../../components/Icons/FrogeBrandSvgs.js';
import { useDeviceMode } from '../../theme/foundations/breakpoints.js';
import { desktopSidebarWidth } from 'data/constants.js';
import { sxGlassBg,sxGlassBg2 } from './bits/UtilityTags.js';
export function AppSidebar(props) {
  // to check for active links and opened collapses
  let location = useLocation();
  // this is for the rest of the collapses
  // verifies if routeName is the one active (in browser input)
  const [get_appNavDrawerOpen, set_appNavDrawerOpen] = useAtom(appNavDrawerOpenAtom)

  //  Chakra Color Mode
  const mainText = ucmv("gray.50", "gray.200");
  let hamburgerColor = ucmv("gray.500", "gray.200");
  if (props.secondary === true) {
    hamburgerColor = "white";
  }
  const SBNavLink = ({to,children})=>{
    const [w,h] = isDesktop?['160px','40px']:['200px','40px']
    return(
    <Button as={NavLink} to={to} _hover={{ opacity: ".8" }} {...sxGlassBg2}
            onClick={()=>set_appNavDrawerOpen(false)}
            w={w} h={h} color={mainText}>{children}</Button>);
  }
  const SBCloseButton = ()=>{return(
    <DrawerCloseButton as={Button}
      color={mainText}
      _focus={{ boxShadow: "none" }} _hover={{ boxShadow: "none" }}
    />);
  }

  // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile, isDesktop] = useDeviceMode()

  useEffect(()=>{console.log('deviceMode changed');
    set_appNavDrawerOpen(false);},[isDesktop])

  const btnRef = React.useRef();
  // Color variables
  return (
    isDesktop? (
        <Flex id='AppSidebarDesktop'
              display="flex"
              alignItems="start"
              justifyContent='center'
              style={{
                left: '0', top: '0',
                width: desktopSidebarWidth,
                position: 'fixed',
                height: '100%'
              }}
        >
          <Box pt={8} textAlign='center'>
            <FrogeLogo opacity='.7' fontSize="46" _hover={{ opacity:'.8', }}  alignSelf="center"/>
            <Stack m={5} direction="column" alignItems="center">
              <SBNavLink to='./'>Dash</SBNavLink>
              <SBNavLink to='./billing'>Billing</SBNavLink>
              <SBNavLink to='./profile'>Profile</SBNavLink>
              <SBNavLink to='./tables'>Tables</SBNavLink>
              <SBNavLink to='./tables'>Calculators</SBNavLink>
            </Stack>
          </Box>

        </Flex>
      ) : (
        <Drawer isOpen={isDesktop?false:get_appNavDrawerOpen}
                onClose={() => set_appNavDrawerOpen(false)}
                finalFocusRef={btnRef} placement="right">
          <DrawerOverlay backdropFilter="saturate(200%) blur(3px)"/>
          <DrawerContent style={{background:'transparent',borderRadius:'9px',
            top:'7px', right:'7px', bottom:'auto', width:'auto',
          }}>
            <DrawerBody px="1rem">
              <SBCloseButton/>
              <Box pt={8} textAlign='center'>
                <FrogeLogo opacity='.7' fontSize="46" _hover={{ opacity:'.8', }}  alignSelf="center"/>
                <Stack my={5} direction="column" alignItems="center">
                  <SBNavLink to='./'>Dash</SBNavLink>
                  <SBNavLink to='./billing'>Billing</SBNavLink>
                  <SBNavLink to='./profile'>Profile</SBNavLink>
                  <SBNavLink to='./tables'>Tables</SBNavLink>
                  <SBNavLink to='./tables'>Calculators</SBNavLink>
                </Stack>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )
  );
}
// PROPS

AppSidebar.propTypes = {};
export default AppSidebar;

