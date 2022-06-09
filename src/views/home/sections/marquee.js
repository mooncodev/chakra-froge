import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { HFlex, S } from '../../app/bits/UtilityTags.js';
import Marquee from "react-fast-marquee";

export const NewsMarquee = () => {
  const _h = '60px'

  let textSize = useBreakpointValue({base:'.7rem',md:'.9rem'})

  return (
    <Box h={_h} w='100%' overflow='hidden'>
      <Marquee
        style={{ height:_h }}
        play={true}
        pauseOnClick={true}
        pauseOnHover={false}
        direction={'right'}
        speed={20}
        gradientColor={[21,27,41]}
        gradientWidth={100}
      >
        <Image src={require('assets/memes/froge-news.jpg')} width={'70px'} marginRight={3}/>
        <S fontSize={textSize}>
          <Box>Site currently under <strong>heavy</strong> construction!</Box>
          <Box> Please bear with us.</Box>
        </S>
      </Marquee>
    </Box>
  )
}
