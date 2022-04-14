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
      <PondGameNightUpcoming/>
      <PondGameNightRegister/>
      <PondTpl_UpcomingEvts/>
    </>
  );
}
const g = {
  'status': '1',
  'message': 'OK-Missing/Invalid API Key, rate limit of 1/5sec applied',
  'result': {
    'LastBlock': '14511509',
    'SafeGasPrice': '31',
    'ProposeGasPrice': '31',
    'FastGasPrice': '31',
    'suggestBaseFee': '30.950784257',
    'gasUsedRatio': '0.20325788132111,0.349828926506998,0.235684233333333,0.6734173,0.287804366666667'
  }
};
