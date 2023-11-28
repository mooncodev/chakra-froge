import { Grid, } from '@chakra-ui/react';
// assets
import React from 'react';
// react icons
import PondNetworkVitals from './ponds/PondNetworkVitals.js';
import PondFrogeXDividends from './ponds/PondFrogeXDividends.js';
import { PondCSSPropsConverter } from './calcs/PondCSSPropsConverter.js';
import { PondBigNumCalc } from './calcs/PondBigNumCalc.js';
import { AppMain } from '../../AppLayout.js';

export default function PgCalculators() {

  return (
    <AppMain pgHeadingText='Calculators'
             pgContextBar={null}>

      <PondBigNumCalc/>
      <PondCSSPropsConverter/>

    </AppMain>
  );
}
