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
import { S, VFlex, VFlexCS } from '../common/UtilityTags.js';
import { NewsMarquee } from './sections/marquee.js';
import { Pond, PondHeader } from '../common/Pond.js';
import { CopyIcon } from '@chakra-ui/icons';
import { BiPaste } from 'react-icons/bi';
import { RadioButtons } from '../common/RadioCard.js';
import axios from 'axios';
import { PondFeatureRequest } from './sections/PondFeatureRequest.js';

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

  return (
    <VFlex flexGrow={1}>
      <VFlexCS h='4rem'>
        <NewsMarquee/>
      </VFlexCS>
      <VFlexCS h='4rem'>
        Soon: FAQ / Q&A Page!
      </VFlexCS>
    </VFlex>
  );
}

export default PgHomeFAQ;
