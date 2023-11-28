import { Grid, } from '@chakra-ui/react';
// assets
import React from 'react';
// react icons
// import PondNetworkVitals from './ponds/PondNetworkVitals.js';
import PondFrogeXDividends from './ponds/PondFrogeXDividends.js';
import { AppMain } from '../../AppLayout.js';
import PondNetworkVitals from './ponds/PondNetworkVitals.js';

export default function PgDash() {

  return (
    // <Flex flexDirection="column" flexGrow='1' pt="75px">

    <AppMain pgHeadingText='Dash'
             pgContextBar={null}>

      {/* <BogGlobalStats/> */}
      {/* <PondFrogeXDividends/> */}
      <PondNetworkVitals/>
      {/* <PondFrogeXVitals/> */}
      {/* <PondRockets/> */}

    </AppMain>
  );
}
