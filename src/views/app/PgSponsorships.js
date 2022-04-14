import { Grid, } from '@chakra-ui/react';
// assets
import React from 'react';
// react icons
import PondNetworkVitals from './ponds/PondNetworkVitals.js';
import PondFrogeXDividends from './ponds/PondFrogeXDividends.js';
import { PondTpl_List, PondTpl_Spotlight2, PondTpl_Spotlight3 } from './ponds/PondTemplates.js';

export default function PgSponsorships() {

  return (
    <>
      <PondTpl_List/>
      <PondTpl_Spotlight3/>
      <PondTpl_Spotlight2/>
      <PondTpl_Spotlight2/>
    </>
  );
}
