import { Box, Button, ButtonGroup, Grid, Heading, Text, useToken, } from '@chakra-ui/react';
import React from 'react';
import PondFiatOnboarding from './ponds/PondFiatOnboarding.js';
import { TextXs } from './bits/UtilityTags.js';
import { useAppStore } from '../../services/useAppStore.js';
import PondUniswapWidget from './ponds/PondUniswapWidget.js';
import { CISVG_PageAccent } from '../../assets/FrogeBrand.js';
import { abs } from '../home/sections/MtgCard/MtgCard.js';
import { AppMain } from '../../AppLayout.js';

export function AppPgHeading({ children }){
  return (
    <Heading as={'h4'} size='md' width={'fit-content'} ml={'12px'} position={'relative'} style={{color:useToken('colors','brand.green')}}>
      <CISVG_PageAccent sx={{...abs('-4px',null,null,'-8px')}}/>
      {children}
      <CISVG_PageAccent sx={{...abs(null,'-8px','-8px',null), transform:'rotate(180deg)'}}/>
    </Heading>
  )
}
export default function PgXchange() {
  const xchangeTab = useAppStore(s=>s.xchangeTab)
  return (
    <AppMain pgHeadingText={'Xchange'}
    pgContextBar={
      <ButtonGroup size='sm' isAttached variant='outline'>
        <Button size={'sm'} isActive={xchangeTab==='fiatonboard'}>
          <Text onClick={()=>useAppStore.getState().set_xchangeTab('fiatonboard')}>
            Fiat Onboard</Text>
        </Button>
        <Button size={'sm'} isActive={xchangeTab==='uniswap'}>
          <Text onClick={()=>useAppStore.getState().set_xchangeTab('uniswap')}>
            Uniswap</Text>
        </Button>
        <Button flexDir='column' lineHeight='6px'>
          <Text>Guide Me!</Text><br/>
          <TextXs>Ask me questions</TextXs>
        </Button>
      </ButtonGroup>
    }>

      {xchangeTab==='fiatonboard' && <PondFiatOnboarding/>}
      {xchangeTab==='uniswap' && <PondUniswapWidget/>}

    </AppMain>
  )
}
