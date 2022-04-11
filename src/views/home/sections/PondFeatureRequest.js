import {
  Box, Button,
  FormControl, FormErrorMessage, FormLabel,
  HStack,
  Input,
  Text, Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {  S,  } from '../../app/bits/UtilityTags.js';
import { Pond, PondHeader } from '../../app/bits/Pond.js';
import { RadioButtons } from '../../app/bits/RadioCard.js';
import axios from 'axios';

export const PondFeatureRequest = () => {

  const [size, setSize] = useState('1')
  const [title, setTitle] = useState('')
  const [titleErr, setTitleErr] = useState(false)
  const [description, setDescription] = useState('')
  const [descriptionErr, setDescriptionErr] = useState(false)
  const [getInvolved, setGetInvolved] = useState('')
  const [getInvolvedErr, setGetInvolvedErr] = useState(false)
  const [status, setStatus] = useState('none')//none|processing|fail|success
  const [step1, setStep1] = useState('research')
  const [step2, setStep2] = useState('design')
  const [step3, setStep3] = useState('implement')
  const [step4, setStep4] = useState('release')
  const [step5, setStep5] = useState('')
  const onChangeTitle = (e)=>{
    let inputValue = e.target.value
    setTitle(inputValue)
    setTitleErr(inputValue.length>30||inputValue.length<3)
  }
  const onChangeDescription = (e)=>{
    let inputValue = e.target.value
    setDescription(inputValue)
    setDescriptionErr(inputValue.length>300||inputValue.length<10)
  }
  const onChangeGetInvolved = (e)=>{
    let inputValue = e.target.value
    setGetInvolved(inputValue)
    setGetInvolvedErr(inputValue.length>300||inputValue.length<10)
  }
  const onSubmit = async (e)=>{
    setStatus('processing');
    setTitleErr(title.length>30||title.length<3)
    setDescriptionErr(description.length>300||description.length<10)
    setGetInvolvedErr(getInvolved.length>300||getInvolved.length<10)

    if( titleErr
     || descriptionErr
     || getInvolvedErr
    ){
      setStatus('none');
      console.log(`come on, dont bullshit me`);
      return;
    }

    const payload = {
      title:title,
      img:['000','000'],
      description:description,
      getInvolved:getInvolved,
      sizeRating:size,
      progress:10,
      tasks:[],
    }
    if(step1){payload.tasks.push(step1)}
    if(step2){payload.tasks.push(step2)}
    if(step3){payload.tasks.push(step3)}
    if(step4){payload.tasks.push(step4)}
    if(step5){payload.tasks.push(step5)}

    const res = await axios.post('/api/slmdb-submit-feature-request',JSON.stringify(payload)).catch(e=>'fail')
    // const res = await axios.post('http://localhost:4040/v1/epic/create-epic',JSON.stringify(mockCreateEpic))
    if(res && res.data === 'success') {
      setStatus('success');
    } else {
      setStatus('fail');
    }

  }

  return (
    <Pond>

      <PondHeader size="md">Feature Suggestion</PondHeader>

      <FormControl mt={4} variant='floating' id='first-name' isRequired isInvalid={titleErr}>
        <Input onChange={onChangeTitle} placeholder=' ' />
        {/* <IconButton aria-label="icon" icon={<BiPaste />} size="xs" /> */}
        <FormLabel>Feature Title</FormLabel>
        <FormErrorMessage>Your First name is invalid</FormErrorMessage>
      </FormControl>

      <HStack alignSelf='start' mt={3}><S>Size:</S><S fontSize=".7rem" color='gray.500'>(loose est. # days of dedicated work)</S></HStack>
      <HStack spacing={2} justifyContent="space-around">
        <RadioButtons onChange={setSize} options={['1','2','3','5','8','13','21',]} defaultOption='1'/>
      </HStack>

      <FormControl mt={6} variant='floating' id='first-name' isRequired isInvalid={descriptionErr}>
        <Textarea value={description} onChange={onChangeDescription}
                  placeholder=' ' size='sm'/>
        <FormLabel>Description:</FormLabel>
      </FormControl>

      <FormControl mt={6} variant='floating' id='first-name' isRequired isInvalid={getInvolvedErr}>
        <Textarea value={getInvolved} onChange={onChangeGetInvolved}
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
  )
}

