import { Button, ButtonGroup, Flex, Grid, Heading, Text, } from '@chakra-ui/react';

import React from 'react';

import { MdConstruction } from 'react-icons/md';
import { HFlexCC, TextXs, VFlexCC } from './bits/UtilityTags.js';
import { AppMain } from '../../AppLayout.js';
import { useAppStore } from '../../services/useAppStore.js';
import PondFiatOnboarding from './ponds/PondFiatOnboarding.js';
import PondUniswapWidget from './ponds/PondUniswapWidget.js';

export default function PgUnderConstruction({pgHeadingText}) {

  return (
    <AppMain pgHeadingText={pgHeadingText}
             pgContextBar={null}>

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

    </AppMain>
  );
}
