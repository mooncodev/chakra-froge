import { Grid, Text, } from '@chakra-ui/react';
// assets
import React from 'react';
// react icons
// import PondNetworkVitals from './ponds/PondNetworkVitals.js';
import PondFrogeXDividends from './ponds/PondFrogeXDividends.js';
import { AppMain } from '../../AppLayout.js';
import { HFlexCC, VFlexCC } from '../common/UtilityTags.js';
import { MdConstruction } from 'react-icons/md';

export default function PgFrogeX() {

  return (
    <AppMain pgHeadingText='FrogeX'
             pgContextBar={null}>

      {/* <BogGlobalStats/> */}
      <PondFrogeXDividends/>
      {/* <PondNetworkVitals/> */}
      {/* <PondFrogeXVitals/> */}
      {/* <PondRockets/> */}

    </AppMain>
  );
}
