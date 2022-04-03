// Chakra imports
import { Grid, } from '@chakra-ui/react';
// assets
import React from 'react';
// react icons
import PondNetworkVitals from './ponds/PondNetworkVitals.js';
import PondFrogeXDividends from './ponds/PondFrogeXDividends.js';
import { PondLinkTagRow } from '../../services/usePondLinkStore.js';

export default function PgFrogeX() {

  return (
    <>
        {/* <BogGlobalStats/> */}
        <PondFrogeXDividends pondLink={['PgDash','FrogeX Dividends']}/>
        <PondNetworkVitals pondLink={['PgDash','Network Vitals']}/>
        {/* <PondFrogeXVitals/> */}
        {/* <PondRockets/> */}
    </>
  );
}
