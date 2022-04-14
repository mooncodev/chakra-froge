import { Grid, } from '@chakra-ui/react';
// assets
import React from 'react';
// react icons
import {
  PondTpl_Spotlight,
  PondTpl_Spotlight2,
  PondTpl_Spotlight3
} from './ponds/PondTemplates.js';

export default function PgEcoAction() {

  return (
    <>
        {/* <BogGlobalStats/> */}
        <PondTpl_Spotlight/>
        <PondTpl_Spotlight2/>
        <PondTpl_Spotlight3/>
        {/* <PondFrogeXVitals/> */}
        {/* <PondRockets/> */}
    </>
  );
}
