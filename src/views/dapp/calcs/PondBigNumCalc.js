import { Box, Heading, HStack, IconButton, Input, Text, Textarea, } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { HFlex, TextXs, } from 'views/common/UtilityTags.js';
import { Pond } from 'views/common/Pond.js';
import { CopyToClipboard } from 'react-copy-to-clipboard/lib/Component.js';
import { AddIcon, CopyIcon, MinusIcon } from '@chakra-ui/icons';
import {
  FaPlus,
  FaDivide,
  FaMinus,
  FaSquareRootAlt,
  FaTimes,
} from 'react-icons/fa';
import {
  MdOutlineExplicit,
} from 'react-icons/md';
import {
  BsBoxArrowInDownLeft
} from 'react-icons/bs';
import { sAdd, sDiv, sExp, sMul, sNewtonSqRt, sSub } from '../../../helpers/math/zmath.mjs';

const mockTestInput = `bg={'bog.700'} minH={'60px'} py={{ base: 2 }} px={{ base: 4 }}
      borderBottom='1' borderStyle={'solid'} borderColor={'bog.900'} 
      justify='space-between' alignItems={'center'}`

const SignRadios = ({onSign=()=>{}})=>{
  const [_sign,set_sign] = useState('')
  const handleSign = (e,str)=>{
    e.target.classList.add('active');
    set_sign(str)
    onSign(str)
  }
  const SRButton = ({sign,I,onClick})=>{
    const sxSRButton = {
      w:'2.4rem',
      h:'1.7rem',
      p:'.3rem',
      borderRadius:'8px',
      bgColor:'bog.600',
      '&:hover':{bgColor:'bog.700'},
      '&.active':{bgColor:'bog.700'},
      cursor:'pointer',
    }
    return (<Box as={I} onClick={onClick} sx={sxSRButton} _active={{bgColor:'bog.400'}}/>)
  }
  return (
    <HFlex gap={1} my={1}>
      <SRButton onClick={(e)=>handleSign(e,'add')} sign='add' I={FaPlus}/>
      <SRButton onClick={(e)=>handleSign(e,'sub')} sign='sub' I={FaMinus}/>
      <SRButton onClick={(e)=>handleSign(e,'mul')} sign='mul' I={FaTimes}/>
      <SRButton onClick={(e)=>handleSign(e,'div')} sign='div' I={FaDivide}/>
      <SRButton onClick={(e)=>handleSign(e,'exp')} sign='exp' I={MdOutlineExplicit}/>
      <SRButton onClick={(e)=>handleSign(e,'sqr')} sign='sqr' I={FaSquareRootAlt}/>
    </HFlex>
  )
}

export function PondBigNumCalc(props) {
  const [sign,setSign] = useState('')
  const [valueA,setValueA] = useState('')
  const [valueB,setValueB] = useState('')
  const [output1,setOutput1] = useState('')
  const [output2,setOutput2] = useState('')

  const handleA = (e)=>{
    setValueA(e.target.value)
    // calc()
  }
  const handleB = (e)=>{
    setValueB(e.target.value)
    // if(sign&&valueA.length&&valueB.length){}
    // calc()
  }
  const calc = ()=>{
    if(!sign||!valueA.length||!valueB.length){return;}
    setOutput1(({
      'add':()=>sAdd(valueA,valueB),
      'sub':()=>sSub(valueA,valueB),
      'mul':()=>sMul(valueA,valueB),
      'div':()=>sDiv(valueA,valueB),
      'exp':()=>sExp(valueA,valueB),
      'sqr':()=>sNewtonSqRt(valueA,valueB),
    }[sign])())
  }

  return (
    <Pond title='BigNum Calc'>

      <HStack spacing={2}>
        <Input value={valueA} onChange={handleA} size='sm' variant='filled' type='number'/>
        <IconButton title='paste' aria-label="icon" icon={<BsBoxArrowInDownLeft/>} size="xs"/>
        <IconButton title='copy' aria-label="icon" icon={<CopyIcon/>} size="xs"/>
      </HStack>
      <SignRadios onSign={setSign}/>
      <HStack spacing={2}>
        <Input value={valueB} onChange={handleB} size='sm' variant='filled' type='number'/>
        <IconButton title='paste' aria-label="icon" icon={<BsBoxArrowInDownLeft/>} size="xs"/>
        <IconButton title='copy' aria-label="icon" icon={<CopyIcon/>} size="xs"/>
      </HStack>
      <HStack spacing={2} justifyContent="space-between">
        <Text>{output1}</Text>
        <IconButton aria-label="icon" icon={<CopyIcon/>} size="xs"/>
      </HStack>
      <HStack spacing={2} justifyContent="space-between">
        <Text>{output2}</Text>
        <IconButton aria-label="icon" icon={<CopyIcon/>} size="xs"/>
      </HStack>
    </Pond>
  );
}
