import { Avatar, Box, Flex, Icon, Text } from '@chakra-ui/react';
import { ClockIcon } from "components/Icons/Icons.js";
import React from "react";

export function HistoryItem(props) {
  const navbarIcon = "gray.200"
  const notificationColor = "white"
  const spacing = " ";
  return (
    <>
      {props.icon()}
      <Flex flexDirection="column">
        <Text fontSize="14px" mb="5px" color={notificationColor}>
          {props.msg}
        </Text>
        <Flex alignItems="center">
          <ClockIcon color={navbarIcon} w="13px" h="13px" me="3px" />
          <Text fontSize="xs" lineHeight="100%" color={navbarIcon}>
            {props.time}
          </Text>
        </Flex>
      </Flex>
    </>
  );
}
