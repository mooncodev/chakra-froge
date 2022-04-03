// Chakra imports
import { Grid, } from '@chakra-ui/react';
// assets
import React from 'react';
// react icons
import PondGameNightUpcoming from './ponds/PondGameNightUpcoming.js';
import PondGameNightRegister from './ponds/PondGameNightRegister.js';
import { PondTpl_UpcomingEvts } from './ponds/PondTemplates.js';

export default function PgGameNight() {

  return (
    <>
      <PondGameNightUpcoming pondLink={['PgGameNight','Upcoming Events']}/>
      <PondGameNightRegister pondLink={['PgGameNight','Register']}/>
      <PondTpl_UpcomingEvts pondLink={['PgGameNight','Tpl Upcoming']}/>
    </>
  );
}
