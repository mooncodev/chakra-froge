// chakra imports
import { Avatar, Flex, MenuItem, Text, useColorModeValue } from '@chakra-ui/react';
import { ClockIcon } from "components/Icons/Icons";
import PropTypes from "prop-types";
import React from "react";
import { ItemContent } from './ItemContent.js';
import avatar1 from '../../assets/img/avatars/avatar1.png';
import avatar2 from '../../assets/img/avatars/avatar2.png';
import avatar3 from '../../assets/img/avatars/avatar3.png';

export function WalletBrands() {
  const navbarIcon = useColorModeValue("gray.500", "gray.200");
  const notificationColor = useColorModeValue("gray.700", "white");
  const spacing = " ";
  return (
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
  );
}
