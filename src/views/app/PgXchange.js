import { Button, Grid, Text, } from '@chakra-ui/react';
import React from 'react';
import PondFiatOnboarding from './ponds/PondFiatOnboarding.js';
import { TextXs } from './bits/UtilityTags.js';

export default function PgXchange() {

  return (
    <>
      <Button flexDir='column' lineHeight='9px'>
        <Text>Guide Me!</Text><br/>
        <TextXs>Ask me what I want</TextXs>
      </Button>
      <PondFiatOnboarding/>
    </>
  );
}
