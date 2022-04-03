// Chakra imports
import { Grid, } from '@chakra-ui/react';
// assets
import React from 'react';
// react icons
import {
  PondTpl_NFTProduct,
  PondTpl_Spotlight,
  PondTpl_Spotlight2,
  PondTpl_Spotlight3
} from './ponds/PondTemplates.js';

export default function PgNFT() {

  return (
    <>
      <PondTpl_NFTProduct pondLink={['PgNFT','NFTProduct1']}/>
      <PondTpl_NFTProduct pondLink={['PgNFT','NFTProduct2']}/>
      <PondTpl_NFTProduct pondLink={['PgNFT','NFTProduct3']}/>
      <PondTpl_NFTProduct pondLink={['PgNFT','NFTProduct4']}/>
      <PondTpl_NFTProduct pondLink={['PgNFT','NFTProduct5']}/>
    </>
  );
}
