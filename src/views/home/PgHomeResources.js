import React, { useState } from "react";
import {
  Box, Flex, Button, FormControl, FormLabel,
  Heading, Input, Link, Switch, Text, Stack, Image, Grid, Spacer, Divider, HStack, Icon,
} from '@chakra-ui/react';
// Assets
import { HFlexCC, VFlex, VFlexCS } from '../app/bits/UtilityTags.js';
import { NewsMarquee } from './sections/marquee.js';
import { MtgCard } from './sections/MtgCard/MtgCard.js';
import { MdDownload } from 'react-icons/md';
import { Pond } from '../app/bits/Pond.js';
import { DownloadIcon } from '@chakra-ui/icons';
import { AiFillDropboxCircle } from 'react-icons/ai';

const ResourcesPond = ({ }) => {
  const sxGroupBase = { padding:'.6rem 1.7rem', borderRadius:'12px',_hover:{ bg: 'gray.900' }, justifyContent:'space-between'}
  const H1 = ({children})=><Text sx={{transition:'all .3s ease', _groupHover:{ color: 'green.300' }, fontWeight:'500'}}>{children}</Text>
  const H2 = ({children})=><Text sx={{fontSize:'xs',fontWeight:'300'}}>{children}</Text>
  const sxIconWrap = { transition: 'all .3s ease', transform: 'translateX(-10px)', opacity: '0',
    _groupHover: { opacity: '1', transform: 'translateX(0)' }, justify: 'flex-end', align: 'center', flex: '1'
  }
  return (
    <Pond title='Downloads'>
      <Link href='/downloads/FrogeX-Green-Paper.docx' role={'group'}>
        <HFlexCC sx={sxGroupBase}><Box><H1>FrogeX GreenPaper</H1><H2>FrogeX-Green-Paper.docx</H2></Box>
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
const download = e => {
  console.log(e.target.href);
  fetch(e.target.href, {
    method: "GET",
    headers: {}
  })
  .then(response => {
    response.arrayBuffer().then(function(buffer) {
      const url = window.URL.createObjectURL(new Blob([buffer]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "image.png"); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  })
  .catch(err => {
    console.log(err);
  });
};

function PgHomeResources() {
  const DlBtn = ({label, filename, filetype})=>{
    return (
      <HStack justify='space-between' mt={2}>
        {filetype!=='.ai'&&<Image src={`/downloads/${filename}`} width={10}/>}
        <Text fontSize={14}>{label}</Text>
        <Link as={Button} href={`/downloads/${filename}`} onClick={e => download(e)}>{filetype}
          <MdDownload style={{marginLeft:'4px',marginTop:'5px'}}/></Link>
      </HStack>
    )
  }
  return (
    <VFlex flexGrow={1} gap={6}>
      <VFlexCS h='4rem'>
        <NewsMarquee/>
      </VFlexCS>
      <VFlexCS textAlign='center'>
        <Heading>Resources & Downloads</Heading>
        <Text fontWeight={200}><em>Files and other goodies to munch on.</em></Text>
        <Divider/><br/>
      </VFlexCS>

      <Grid templateColumns="repeat(auto-fill, 350px)" gridAutoFlow='dense'
            gap={6} justifyContent={'center'} alignSelf='center' width='98%' maxW='1360px'>
        <ResourcesPond />
        <Pond style={{gridRowEnd:'span 3'}} title='Brand Assets'>
          <DlBtn label='Original Master Logo Workfile' filename='Froge-Logo-Master.ai' filetype='.ai'/>
          <DlBtn label='New Optimized Vector Workfile' filename='logo-vector-optimized.ai' filetype='.ai'/>
          <DlBtn label='Optimized Logo SVG' filename='logo-vector-optimized.svg' filetype='.svg'/>
          <DlBtn label='EcoDefi' filename='ecodefi-circles.svg' filetype='.svg'/>
          <DlBtn label='Froge Hexatoken' filename='froge-eyeeye.svg' filetype='.svg'/>
          <DlBtn label='Froge Hexatoken' filename='froge-eyeeye-outline-nowhites.svg' filetype='.svg'/>
          <DlBtn label='Logo SVG' filename='froge-logo.svg' filetype='.svg'/>
          <DlBtn label='Logo PNG' filename='froge-logo-1200.png' filetype='.png'/>
          <DlBtn label='Logo Outline' filename='froge-logo-outline.svg' filetype='.svg'/>
          <DlBtn label='Title Logo White SVG' filename='froge-title-logo-ff.svg' filetype='.svg'/>
          <DlBtn label='Title Logo White PNG' filename='froge-title-logo-ff-1200.png' filetype='.png'/>
          <DlBtn label='Title Logo Green SVG' filename='froge-title-logo-ff-allgreen.svg' filetype='.svg'/>
          <DlBtn label='Title Logo Green PNG' filename='froge-title-logo-ff-allgreen-1200.png' filetype='.png'/>
          <DlBtn label='Title Logo Combo SVG' filename='froge-title-logo-ff-color.svg' filetype='.svg'/>
          <DlBtn label='Title Logo Combo PNG' filename='froge-title-logo-ff-color-1200.png' filetype='.png'/>
          <DlBtn label='FrogeFinity' filename='frogefinity.svg' filetype='.svg'/>
        </Pond>
        <Pond title='Etc Graphic Assets'>
          <DlBtn label='Hop On Poster' filename='hop-on.jpg' filetype='.jpg'/>
          <DlBtn label='Comfy Froge' filename='frog1600x600.png' filetype='.png'/>
          <DlBtn label='Froge Reporting' filename='froge-news.jpg' filetype='.jpg'/>
          <Link as={Button} my={6} href='https://www.dropbox.com/sh/k0cy4qzyphf4hol/AAD7FiiwqnxxQ1wMYR1GoxrUa?dl=0'>
            <Icon as={AiFillDropboxCircle} mr={2} boxSize={8} color={'blue.300'}/>Meme Storage Dropbox </Link>
        </Pond>

      </Grid>
    </VFlex>
  );
}

export default PgHomeResources;
