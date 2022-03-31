import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import {
  Box, Flex, Button, FormControl, FormLabel,
  Heading, Input, Link, Switch, Text, Image, VStack, StackDivider, HStack,
} from '@chakra-ui/react';
// Assets
import signInImage from "assets/img/signInImage.png";
import FrogImg from 'assets/img/stock-frogs/darkbg/wide/006.jpg'

function HPageLanding() {
  // Chakra color mode
  // const titleColor = "green.200"
  // const textColor = "white"

  return (
    <VStack
      divider={<StackDivider borderColor='gray.200' />}
      spacing={4}
      align='stretch'
    >
      <HStack minHeight='540px' bg='green.800' bgImage={FrogImg} bgSize="cover" bgPosition="50%">
        Introducing: FrogeX
        <br/><br/>

        How it works:
        <br/><br/>

        FrogeX is a <strong>"managed, hyper-optimized, Eth Reflection smart contract of the ERC20 token
        standard".</strong>
        <br/><br/>
        <strong>Managed:</strong> <br/>
        By not renouncing ownership of the contract, and by making available to the owner of the contract a limited set of configuration controls, we are able to adjust how the token works in order to maintain a balance between project goals and token holder benefits.
        <br/><br/>
        <strong>Hyper-Optimized:</strong>&nbsp;<em>(and the story of FrogeX's creation)</em><br/>
        The development of FrogeX was born from a discovery that existing Eth Reflection tokens might be able to operate at a fraction of the cost, if only a developer would put in the work to integrate the logic from multiple separate contracts into just 1 contract - the contract of the token itself.  One of our developers who goes by Moonco (fully doxxed LINK), found this opportunity and decided to use it to spearhead the project's path toward growth.  The result was astonishing and even better than suspected - Though it took 8 months to develop, he was able to improve on TX costs (measured in what's called "Gas Usage") by up to 70%!  He often reminds this is in part due to sheer luck, because there was no telling at the onset exactly how much optimization could be performed. A win for everyone - especially the rainforests!
        <br/><br/>
        <strong>Eth Reflection:</strong><br/>
        <br/><br/>
        <strong>ERC20 Token Standard:</strong><br/>
      </HStack>
      <Box minHeight='140px' bg='green.300'>
        2
      </Box>
      <Box minHeight='140px' bg='green.400'>
        <img src="https://via.placeholder.com/200x200"/>
        <Box display={{ base: "none", md: "block" }}
             position="absolute" overflowX="hidden"
             h="100%" w="40vw" right="0px"
        >hello
        </Box>
      </Box>
    </VStack>
  );
}

export default HPageLanding;
