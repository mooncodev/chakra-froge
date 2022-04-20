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
import { PondBrandLinkList } from './sections/PondBrandLinkList.js';
import { PondPrimaryDownloads } from './sections/PondPrimaryDownloads.js';
import { PondBrandAssets, PondEtcGraphicAssets } from './sections/PondBrandAssets.js';

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

        <PondPrimaryDownloads />
        <PondBrandAssets/>
        <PondEtcGraphicAssets/>
        <PondBrandLinkList/>

      </Grid>
    </VFlex>
  );
}

export default PgHomeResources;
