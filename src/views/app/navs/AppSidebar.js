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
  Flex,
  Stack,
} from '@chakra-ui/react';
import IconBox from "components/Icons/IconBox.js";
import { Separator } from "components/Separator/Separator.js";
import { AppSidebarHelp } from "components/Sidebar/AppSidebarHelp.js";
import PropTypes from "prop-types";
import React, { useEffect } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { RocketIcon } from '../../../components/Icons/Icons.js';
import { useAtom } from 'jotai';
import { appNavDrawerOpenAtom } from '../../../services/atoms.js';
import { FrogeLogoSvg } from 'assets/FrogeBrand.js';
import { useDeviceMode } from '../../../theme/foundations/breakpoints.js';
import { desktopSidebarWidth, PHASE } from 'data/constants.js';
import { sxGlassBg,sxGlassBg2 } from '../bits/UtilityTags.js';
import { SBNavLink } from '../bits/SBNavLink.js';
import FrogeEyeEye from '../../../assets/logos/froge-eyeeye-outline-halfwhites.svg';
export function AppSidebar(props) {
  // to check for active links and opened collapses
  let location = useLocation();
  // this is for the rest of the collapses
  // verifies if routeName is the one active (in browser input)
  const [get_appNavDrawerOpen, set_appNavDrawerOpen] = useAtom(appNavDrawerOpenAtom)

  //  Chakra Color Mode
  const mainText = "gray.200"

  const SBCloseButton = ()=>{return(
    <DrawerCloseButton as={Button}
      color={mainText}
      _focus={{ boxShadow: "none" }} _hover={{ boxShadow: "none" }}
    />);
  }

  // SIDEBAR
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
              sx={{
                ':before': {
                  content: '" "',
                  display: 'block',
                  position: 'absolute',
                  left: '10px',
                  top: '10px',
                  right: '10px',
                  bottom: '10px',
                  borderRadius:'panelsRadius',
                  // width: '100%',
                  // height: '100%',
                  backgroundColor: 'global.panel',
                  pointerEvents: 'none',
                },
                position: 'fixed',
                left: '0', top: '0',
                width: desktopSidebarWidth,
                height: '100%'
              }}
        >
          <Box pt={8} textAlign='center' position={'relative'}>
            <FrogeLogoSvg fontSize="69" alignSelf="center"/>
            <Stack m={5} direction="column" flexFlow={'wrap'} gap='5px'>
              <SBNavLink to='./'>Dash</SBNavLink>
              <SBNavLink to='./frogex'>FrogeX</SBNavLink>
              <SBNavLink to='./eco-action'>Eco Action</SBNavLink>
              <SBNavLink to='./sponsorships'>Sponsorships</SBNavLink>
              <SBNavLink to='./game-night'>Game Night</SBNavLink>
              <SBNavLink to='./nft'>NFT</SBNavLink>
              <SBNavLink to='./xchange'>Xchange</SBNavLink>
              <SBNavLink to='./calc'>Calculators</SBNavLink>
            </Stack>
          </Box>

        </Flex>
      ) : (
        <Drawer isOpen={isDesktop?false:get_appNavDrawerOpen}
                onClose={() => set_appNavDrawerOpen(false)}
                finalFocusRef={btnRef} placement="right">
          <DrawerOverlay backdropFilter="saturate(200%) blur(3px)"/>
          <DrawerContent style={{background:'transparent',borderRadius:'9px',
            top:'7px', right:'7px', bottom:'auto', width:'11rem',
          }}>
            <DrawerBody px="1rem">
              <SBCloseButton/>
              <Box pt={8} textAlign='center'>
                <FrogeLogoSvg fontSize="46" _hover={{ opacity:'.8', }}  alignSelf="center"/>
                <Stack my={5} direction="column" alignItems="center">
                  <SBNavLink to='./'>Dash</SBNavLink>
                  <SBNavLink to='./frogex'>FrogeX</SBNavLink>
                  <SBNavLink to='./eco-action'>Eco Action</SBNavLink>
                  <SBNavLink to='./sponsorships'>Sponsorships</SBNavLink>
                  <SBNavLink to='./game-night'>Game Night</SBNavLink>
                  <SBNavLink to='./nft'>NFT</SBNavLink>
                  <SBNavLink to='./xchange'>Xchange</SBNavLink>
                  <SBNavLink to='./calc'>Calculators</SBNavLink>
                  {PHASE<3 &&(<>
                    <SBNavLink to="./billing">billing</SBNavLink>
                    <SBNavLink to="./profile">profile</SBNavLink>
                    <SBNavLink to="./tables">tables</SBNavLink>
                  </>)}
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

