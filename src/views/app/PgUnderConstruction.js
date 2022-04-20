import { Flex, Grid, Heading, Text, } from '@chakra-ui/react';

import React from 'react';

import { MdConstruction } from 'react-icons/md';
import { HFlexCC, VFlexCC } from './bits/UtilityTags.js';

export default function PgUnderConstruction() {

  return (
    <VFlexCC>
      <HFlexCC bg={'bog.900'} w={300} h={200} gap={5}>
        <MdConstruction size={50}/>
        <Text flexBasis='60%'>This page under construction.</Text>
      </HFlexCC>
      <HFlexCC bg={'bog.900'} w={300} h={200} gap={5}>
        <Text flexBasis='60%'>Please look forward to updates - coming sooner than you can say "Froge to the Mooooooon!"</Text>
        <MdConstruction size={50}/>
      </HFlexCC>
    </VFlexCC>
  );
}