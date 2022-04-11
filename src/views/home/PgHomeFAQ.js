import React, { useState } from "react";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  HStack,
  IconButton,
  extendTheme,
  FormHelperText,
  FormErrorMessage, Textarea,
} from '@chakra-ui/react';
import { S, VFlex, VFlexCS } from '../app/bits/UtilityTags.js';
import { NewsMarquee } from './sections/marquee.js';
import { Pond, PondHeader } from '../app/bits/Pond.js';
import { CopyIcon } from '@chakra-ui/icons';
import { BiPaste } from 'react-icons/bi';
import { RadioButtons } from '../app/bits/RadioCard.js';
import axios from 'axios';

const mockCreateEpic = {
  "title":"Test Title",
  "img":["000","000"],
  "description":"Test Description",
  "getInvolved":"Test Blurb About Stuff",
  "sizeRating":"1",
  "tasks":["design","implement","test","stall for time","release"],
  "progress": "30"
}


function PgHomeFAQ() {

  const [size, setSize] = useState('1')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [getInvolved, setGetInvolved] = useState('')
  const [status, setStatus] = useState('none')//none|processing|fail|success
  const [step1, setStep1] = useState('')
  const [step2, setStep2] = useState('')
  const [step3, setStep3] = useState('')
  const [step4, setStep4] = useState('')
  const [step5, setStep5] = useState('')
  const onDescription = (e)=>{
    let inputValue = e.target.value
    setDescription(inputValue)
  }
  const onGetInvolved = (e)=>{
    let inputValue = e.target.value
    setGetInvolved(inputValue)
  }
  const onSubmit = async (e)=>{
    setStatus('processing');
    e.target.disabled=true;
    // if(title.length<6
    //   ||description.length<10
    //   || getInvolved.length<10
    // ){
    //   console.log(`come on, dont bullshit me`);
    //   return;
    // }

    const payload = {
      title:title,
      img:['000','000'],
      description:description,
      getInvolved:getInvolved,
      sizeRating:size,
      progress:10,
      tasks:[
        step1?step1:'design',
        step2?step2:'implement',
        step3?step3:'test',
        step4?step4:'stall for time',
        step5?step5:'release',
      ],
    }

    const res = await axios.post('/api/slmdb-submit-feature-request',JSON.stringify(mockCreateEpic)).catch(e=>e)
    // const res = await axios.post('http://localhost:4040/v1/epic/create-epic',JSON.stringify(mockCreateEpic))
    if(res.data === 'success') {
      setStatus('success');
    } else {
      setStatus('fail');
    }

  }

  return (
    <VFlex flexGrow={1}>
      <VFlexCS h='4rem'>
        <NewsMarquee/>
      </VFlexCS>
      <VFlexCS h='4rem'>
        Soon: FAQ / Q&A Page!
      </VFlexCS>

      <Pond>

        <PondHeader size="md">Feature Suggestion</PondHeader>

        <FormControl mt={4} variant='floating' id='first-name' isRequired>
          <Input onChange={(e)=>setTitle(e.target.value)} placeholder=' ' />
          {/* <IconButton aria-label="icon" icon={<BiPaste />} size="xs" /> */}
          <FormLabel>Feature Title</FormLabel>
          <FormErrorMessage>Your First name is invalid</FormErrorMessage>
        </FormControl>

        <HStack alignSelf='start' mt={3}><S>Size:</S><S fontSize=".7rem" color='gray.500'>(loose est. # days of dedicated work)</S></HStack>
        <HStack spacing={2} justifyContent="space-around">
          <RadioButtons onChange={setSize} options={['1','2','3','5','8','13','21',]} defaultOption='1'/>
        </HStack>

        <FormControl mt={6} variant='floating' id='first-name' isRequired>
          <Textarea value={description} onChange={onDescription}
                    placeholder=' ' size='sm'/>
          <FormLabel>Description:</FormLabel>
        </FormControl>

        <FormControl mt={6} variant='floating' id='first-name' isRequired>
          <Textarea value={getInvolved} onChange={onGetInvolved}
                    placeholder=' ' size='sm'/>
          <FormLabel>How people can get involved:</FormLabel>
        </FormControl>


        <S alignSelf='start'>Steps:</S>
        <Input onChange={(e)=>setStep1(e.target.value)} size='xs' placeholder='step1' />
        <Input onChange={(e)=>setStep2(e.target.value)} size='xs' placeholder='step2' />
        <Input onChange={(e)=>setStep3(e.target.value)} size='xs' placeholder='step3' />
        <Input onChange={(e)=>setStep4(e.target.value)} size='xs' placeholder='step4' />
        <Input onChange={(e)=>setStep5(e.target.value)} size='xs' placeholder='step5' />

        <Button disabled={['processing','success'].indexOf(status)>-1}
                onClick={onSubmit}>{
                  status==='processing'?'Processing...'
                  :status==='fail'?'Try Again'
                  :status==='success'?'Success!': 'Submit'
                }</Button>
      </Pond>
    </VFlex>
  );
}

export default PgHomeFAQ;
