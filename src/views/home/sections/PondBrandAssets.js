import { Pond } from '../../common/Pond.js';
import { Box, Button, chakra, HStack, Icon, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { HFlexCC } from '../../common/UtilityTags.js';
import { MdDownload } from 'react-icons/md';
import { AiFillDropboxCircle } from 'react-icons/ai';


const sxFileDlBtn = {
  display: 'flex',
  backgroundColor: 'bog.700',
  padding: '2px 10px',
  borderRadius: '8px'
}
const DlBtn = ({label, path, ext})=>{
  return (
    <HStack justify='space-between' mt={2}>
      {ext!=='.ai'&&<Image src={`${path}`} width={10}/>}
      <Text fontSize={14}>{label}</Text>
      <Link as={chakra.a} download href={`${path}`} sx={sxFileDlBtn}>
        {ext}<MdDownload style={{marginLeft:'4px',marginTop:'5px'}}/></Link>
    </HStack>
  )
}

const sxGroupBase = { padding:'.6rem 1.7rem', borderRadius:'12px',_hover:{ bg: 'gray.900' }, justifyContent:'space-between'}
const H1 = ({children})=><Text sx={{transition:'all .3s ease', _groupHover:{ color: 'green.300' }, fontWeight:'500'}}>{children}</Text>
const H2 = ({children})=><Text sx={{fontSize:'xs',fontWeight:'300'}}>{children}</Text>
const sxIconWrap = { transition: 'all .3s ease', transform: 'translateX(-10px)', opacity: '0',
  _groupHover: { opacity: '1', transform: 'translateX(0)' }, justify: 'flex-end', align: 'center', flex: '1'
}

export const PondBrandAssets = ({ }) => {
  return (
    <Pond style={{gridRowEnd:'span 3'}} title='Brand Assets'>
      <DlBtn path='/downloads/Froge_Brand_Workfile_v2.ai' ext='.ai' label='Froge_Brand_Workfile_v2'/>
      <DlBtn path='/brand/froge.svg' ext='.svg' label='New Optimized Logo SVG'/>
      <DlBtn path='/brand/froge512o.png' ext='.png' label='Logo medium PNG8'/>
      <DlBtn path='/brand/froge1200.png' ext='.png' label='Logo large PNG'/>
      <DlBtn path='/downloads/froge-logo-outline.svg' ext='.svg' label='Logo Outline'/>
      <DlBtn path='/brand/ff-combo.svg' ext='.svg' label='FF Combo SVG'/>
      <DlBtn path='/brand/ff-combo1200.png' ext='.png' label='FF Combo PNG'/>
      <DlBtn path='/brand/ff-green.svg' ext='.svg' label='FF Green SVG'/>
      <DlBtn path='/brand/ff-green1200.png' ext='.png' label='FF Green PNG'/>
      <DlBtn path='/brand/ff-white.svg' ext='.svg' label='FF White SVG'/>
      <DlBtn path='/brand/ff-white1200.png' ext='.png' label='FF White PNG'/>
      <DlBtn path='/downloads/ecodefi-circles.svg' ext='.svg' label='EcoDefi'/>
      <DlBtn path='/downloads/froge-eyeeye.svg' ext='.svg' label='Froge Hexatoken'/>
      <DlBtn path='/downloads/froge-eyeeye-outline-nowhites.svg' ext='.svg' label='Froge Hexatoken'/>
      <DlBtn path='/brand/frogefinity.svg' ext='.svg' label='FrogeFinity'/>
      <DlBtn path='/brand/frogefinity1200.png' ext='.png' label='FrogeFinity'/>
      <br/>
    </Pond>
  )
};
export const PondEtcGraphicAssets = ({ }) => {
  return (
    <Pond title='Etc Graphic Assets'>
      <DlBtn path='/downloads/hop-on.jpg' ext='.jpg' label='Hop On Poster'/>
      <DlBtn path='/downloads/frog1600x600.png' ext='.png' label='Comfy Froge'/>
      <DlBtn path='/downloads/froge-news.jpg' ext='.jpg' label='Froge Reporting'/>
      <Button as={Link} sx={sxFileDlBtn} target='_blank' my={6} href='https://www.dropbox.com/sh/9ev3vrtp43c989i/AAAeoW0gTe9meg9dhD0EvgMDa?dl=0'>
        <Icon as={AiFillDropboxCircle} mr={2} boxSize={8} color={'blue.300'}/>Meme Storage Dropbox </Button>
    </Pond>
  )
};
