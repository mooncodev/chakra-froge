import {
  Box, Image,
} from '@chakra-ui/react';
import React from 'react';
import { abs, bgImg } from '../../views/common/cssHelpers.js';

export function SvgIcon({ svg, ...rest }) {

  const sxBox = {
    w:'20px',h:'20px',
    // ...abs(0,0,null,32),
    // _before: {
    //   content:'""',
    //   ...bgImg(svg),...abs(3,3),
    //   w:'20px',h:'20px',
    //   backgroundSize: '83%',
    //   boxShadow:'0px 0px 1px 0px black inset',
    //   borderRadius:'20px',
    // },
  }

  return (
    <Box sx={sxBox}><Image src={svg} sx={sxBox}/></Box>
  )

}
