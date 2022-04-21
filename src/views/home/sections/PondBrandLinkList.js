import { Pond } from '../../app/bits/Pond.js';
import { Box, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { S } from '../../app/bits/UtilityTags.js';

const JSON = {
  'Froge Logo': {
    'froge.png': '7 KB',
    'froge-sm.png': '3 KB',
    'froge.svg': '10 KB',
    'froge-256.png': '15 KB',
    'froge-512.png': '31 KB',
    'froge-800.png': '51 KB',
    'froge-1200.png': '83 KB',
  },
  'Froge Finance': {
    'ff-combo-1200.png': '41 KB',
    'ff-combo.svg': '15 KB',
    'ff-combo-256.png': '8 KB',
    'ff-combo-512.png': '16 KB',
    'ff-combo-800.png': '26 KB',
    'ff-green.svg': '18 KB',
    'ff-green-256.png': '7 KB',
    'ff-green-512.png': '14 KB',
    'ff-green-512o.png': '8 KB',
    'ff-green-800.png': '23 KB',
    'ff-green-1200.png': '36 KB',
    'ff-white-1200.png': '39 KB',
    'ff-white-256.png': '8 KB',
    'ff-white-512.png': '16 KB',
    'ff-white-800.png': '25 KB',
    'ff-white.svg': '15 KB',
  },
  'Froge Finance Foundation': {
    'fff-combo-256.png': '9 KB',
    'fff-combo-512.png': '18 KB',
    'fff-combo-800.png': '29 KB',
    'fff-combo-1200.png': '45 KB',
    'fff-combo.svg': '15 KB',
    'fff-green-1200.png': '40 KB',
    'fff-green.svg': '20 KB',
    'fff-green-256.png': '8 KB',
    'fff-green-512.png': '16 KB',
    'fff-green-512o.png': '9 KB',
    'fff-green-800.png': '26 KB',
    'fff-white.svg': '17 KB',
  }
};

export const PondBrandLinkList = ()=>{
  return (
    <Pond title='Brand Image URLs' collapse>
      {Object.entries(JSON).map(([k,v],i,a)=>(
        <Box key={k}><S>{k}</S>
          {Object.entries(v).map(([kk,vv],ii,aa)=>{
            const url = `${location.origin}/brand/${kk}`
            return (
              <HStack key={url+ii}>
                <Image src={url} maxWidth={14} maxHeight={8}/>
                <Text fontSize={8}>{url}</Text>
                <Text fontSize={8} userSelect='none'>{vv}</Text>
              </HStack>
            )
          })}
        </Box>
      ))}
    </Pond>
  )
}
