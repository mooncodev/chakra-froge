import { Pond } from '../../common/Pond.js';
import { Box, HStack, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { HFlexCC } from '../../common/UtilityTags.js';
import { MdDownload } from 'react-icons/md';


export const PondPrimaryDownloads = ({ }) => {
  const sxGroupBase = { padding:'.6rem 1.7rem', borderRadius:'12px',_hover:{ bg: 'gray.900' }, justifyContent:'space-between'}
  const H1 = ({children})=><Text sx={{transition:'all .3s ease', _groupHover:{ color: 'green.300' }, fontWeight:'500'}}>{children}</Text>
  const H2 = ({children})=><Text sx={{fontSize:'xs',fontWeight:'300'}}>{children}</Text>
  const sxIconWrap = { transition: 'all .3s ease', transform: 'translateX(-10px)', opacity: '0',
    _groupHover: { opacity: '1', transform: 'translateX(0)' }, justify: 'flex-end', align: 'center', flex: '1'
  }
  return (
    <Pond title='Primary Downloads'>
      <Link href='/downloads/FrogeX_Greenpaper_Ver3_1.pdf' role={'group'}>
        <HFlexCC sx={sxGroupBase}><Box><H1>FrogeX GreenPaper</H1><H2>FrogeX_Greenpaper_Ver3_1.pdf</H2></Box>
          <MdDownload size={17} style={{marginLeft:'4px'}}/></HFlexCC>
      </Link>
      {/* <Link href='/downloads/FrogeX-Articles.docx' role={'group'}> */}
      {/*   <HFlexCC sx={sxGroupBase}><Box><H1>Foundation Articles</H1><H2>FrogeX-Articles.docx</H2></Box> */}
      {/*     <MdDownload size={17} style={{marginLeft:'4px'}}/></HFlexCC> */}
      {/* </Link> */}
      <Link href='/downloads/FrogeX_Brewlabs_Audit.docx' role={'group'}>
        <HFlexCC sx={sxGroupBase}><Box><H1>FrogeX Audit (Brewlabs)</H1><H2>FrogeX_Brewlabs_Audit.docx</H2></Box>
          <MdDownload size={17} style={{marginLeft:'4px'}}/></HFlexCC>
      </Link>
    </Pond>);
};
