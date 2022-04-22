import { Pond } from '../../app/bits/Pond.js';
import { Box, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { S } from '../../app/bits/UtilityTags.js';

//generated with: public/brand/makeLogoDirJSX.js
const JSON = {
  "Froge Logo": {
    "froge.svg": "3 KB",
    "froge256.png": "13 KB",
    "froge512o.png": "14 KB",
    "froge1200.png": "70 KB",
  },
  "Froge Finance": {
    "ff-green.svg": "7 KB",
    "ff-green256.png": "7 KB",
    "ff-green512o.png": "8 KB",
    "ff-green1200.png": "36 KB",
    "ff-white.svg": "7 KB",
    "ff-white256.png": "7 KB",
    "ff-white512o.png": "8 KB",
    "ff-white1200.png": "36 KB",
    "ff-combo.svg": "7 KB",
    "ff-combo256.png": "7 KB",
    "ff-combo512o.png": "8 KB",
    "ff-combo1200.png": "36 KB"
  },
  "Froge Finance Foundation": {
    "fff-green.svg": "9 KB",
    "fff-green256.png": "8 KB",
    "fff-green512o.png": "9 KB",
    "fff-green1200.png": "41 KB",
    "fff-white.svg": "9 KB",
    "fff-white256.png": "8 KB",
    "fff-white512o.png": "9 KB",
    "fff-white1200.png": "40 KB",
    "fff-combo.svg": "9 KB",
    "fff-combo256.png": "8 KB",
    "fff-combo512o.png": "9 KB",
    "fff-combo1200.png": "40 KB"
  },
  "Froge Etc": {
    "hexatoken.svg": "4 KB",
    "hexatoken1200.png": "60 KB",
    "ecodefi-circles.svg": "3 KB",
    "ecodefi-circles1200.png": "50 KB",
    "eyeeye.svg": "4 KB",
    "eyeeye1200.png": "41 KB",
    "frogefinity.svg": "335 Bytes",
    "frogefinity1200.png": "30 KB"
  }
}

export const PondBrandLinkList = ()=>{
  return (
    <Pond title='Brand Image URLs' collapse>
      {Object.entries(JSON).map(([k,v],i,a)=>(
        <Box key={k} mt={2}><S>{k}</S>
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
