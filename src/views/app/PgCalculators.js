import { Grid, } from '@chakra-ui/react';
// assets
import React from 'react';
// react icons
import PondNetworkVitals from './ponds/PondNetworkVitals.js';
import PondFrogeXDividends from './ponds/PondFrogeXDividends.js';
import { PondCSSPropsConverter } from './calcs/PondCSSPropsConverter.js';
import { PondBigNumCalc } from './calcs/PondBigNumCalc.js';

export default function PgCalculators() {

  return (
    <>
      <PondBigNumCalc/>
      <PondCSSPropsConverter/>
    </>
  );
}
