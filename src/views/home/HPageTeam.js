import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import {
  Box, Flex, Button, FormControl, FormLabel,
  Heading, Input, Link, Switch, Text, useColorModeValue,
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/signInImage.png";


function HPageTeam() {
  // Chakra color mode
  // const titleColor = "green.200"
  // const textColor = "white"

  return (
    <Flex position="relative" mb="40px">
      <Flex h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%" maxW="1044px" mx="auto"
        justifyContent="space-between" mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Box display={{ base: "none", md: "block" }}
          position="absolute" overflowX="hidden"
          h="100%" w="40vw" right="0px"
        >
          <Box position="absolute"
            bgImage={signInImage} bgSize="cover" bgPosition="50%"
            w="100%" h="100%" borderBottomLeftRadius="20px"
          />
        </Box>
      </Flex>
    </Flex>
  );
}

export default HPageTeam;
