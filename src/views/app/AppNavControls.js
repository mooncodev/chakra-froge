// Chakra Icons
import { BellIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
// Chakra Imports
import {
  Button, Center,
  Flex, Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text, useBreakpointValue, useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
// Custom Icons
import { ProfileIcon, SettingsIcon } from "components/Icons/Icons.js";
// Custom Components
import { ItemContent } from "components/Menu/ItemContent.js";
import { AppSidebar } from "views/app/AppSidebar.js";
import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import { BsMoonStarsFill, BsSun } from 'react-icons/bs';
import { useAtom } from 'jotai';
import { appNavDrawerOpenAtom } from '../../services/atoms.js';
import W3RApp from './Wallet/w3rApp.js';
import { MdOutlineHistory } from 'react-icons/md';
import { useDeviceMode } from '../../theme/foundations/breakpoints.js';

export default function AppNavControls(props) {
  const [isMobile, isDesktop] = useDeviceMode()
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const [get_appNavDrawerOpen, set_appNavDrawerOpen] = useAtom(appNavDrawerOpenAtom)

  // Chakra Color Mode
  let mainGreen = useColorModeValue("green.300", "green.300");
  let inputBg = useColorModeValue("white", "gray.800");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  let searchIcon = useColorModeValue("gray.700", "gray.200");

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }
  return (
    <Flex id='FCB-AppNavbarLinks'
      pe={{ sm: "0px", md: "16px" }} w={{ sm: "100%", md: "auto" }}
      alignItems="center" flexDirection="row" gap={2}
    >
      <Button
        aria-label="Toggle Color Mode" onClick={toggleColorMode}
        _focus={{ boxShadow: 'none' }} w="fit-content"
      >{colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
      </Button>
      <Menu id='NotifsMenu'>
        <MenuButton as={Button} id='NotifsButton'>
          <MdOutlineHistory color={'blue.100'} width="25px" height="26px" />
        </MenuButton>
        <MenuList p="16px 8px">
          <Flex flexDirection="column">
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="13 minutes ago" info="from Alicia"
                boldInfo="New Message" aName="Alicia" aSrc={avatar1}
              />
            </MenuItem>
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="2 days ago" info="by Josh Henry"
                boldInfo="New Album" aName="Josh Henry" aSrc={avatar2}
              />
            </MenuItem>
            <MenuItem borderRadius="8px">
              <ItemContent
                time="3 days ago" info="Payment succesfully completed!"
                boldInfo="" aName="Kara" aSrc={avatar3}
              />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>

      <W3RApp/>
      {isMobile && (
        <Button size="md" ml="6px"
                onClick={() => set_appNavDrawerOpen(!get_appNavDrawerOpen)}
                display="inline-flex" fontSize={'sm'} fontWeight={600}
                bg={'gray.600'} _hover={{
          bg: 'gray.400', color: 'gray.800'
        }}
        >
          <HamburgerIcon color={'gray.300'} w="18px" h="18px"/>
        </Button>
      )}

    </Flex>
  );
}

AppNavControls.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
