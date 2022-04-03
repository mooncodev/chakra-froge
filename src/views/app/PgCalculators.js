// Chakra imports
import { Grid, } from '@chakra-ui/react';
// assets
import React from 'react';
// react icons
import PondNetworkVitals from './ponds/PondNetworkVitals.js';
import PondFrogeXDividends from './ponds/PondFrogeXDividends.js';
import { PondLinkTagRow } from '../../services/usePondLinkStore.js';
import { PondTpl_BNCalc } from './ponds/PondTemplates.js';

export default function PgCalculators() {

  return (
    <>
        {/* <BogGlobalStats/> */}
        <PondTpl_BNCalc pondLink={['PgCalculators','Big Number Calc']}/>
        {/* <PondFrogeXVitals/> */}
        {/* <PondRockets/> */}
    </>
  );
}
