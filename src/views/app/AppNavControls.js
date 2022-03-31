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
import { useDeviceMode } from '../../theme/foundations/breakpoints.js';
import { BtnBrandIcon } from './bits/UtilityTags.js';
import HistoryWidget from './Wallet/HistoryWidget.js';

export default function AppNavControls(props) {
  const [isMobile, isDesktop] = useDeviceMode()
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;
  const [get_appNavDrawerOpen, set_appNavDrawerOpen] = useAtom(appNavDrawerOpenAtom)

  return (
    <Flex id='FCB-AppNavbarLinks'
      pe={{ sm: "0px", md: "16px" }} w={{ sm: "100%", md: "auto" }}
      alignItems="center" flexDirection="row" gap={2}
    >
      <HistoryWidget/>

      <W3RApp/>
      {isMobile && (
        <BtnBrandIcon type='burger'
          onClick={() => set_appNavDrawerOpen(!get_appNavDrawerOpen)}
        />

        // <Button size="md" ml="6px"
        //         onClick={() => set_appNavDrawerOpen(!get_appNavDrawerOpen)}
        //         display="inline-flex" fontSize={'sm'} fontWeight={600}
        //         bg={'gray.600'} _hover={{
        //   bg: 'gray.400', color: 'gray.800'
        // }}
        // >
        //   <HamburgerIcon color={'gray.300'} w="18px" h="18px"/>
        // </Button>
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
