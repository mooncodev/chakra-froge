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
import { PondFeatureRequest } from './sections/PondFeatureRequest.js';

function PgHomeContactAndSupport() {

  return (
    <VFlexCS>
      <VFlexCS h='4rem'>
        <NewsMarquee/>
      </VFlexCS>
      <VFlexCS h='4rem'>
        <Heading>Contact & Support</Heading>
      </VFlexCS>

      <PondFeatureRequest/>
    </VFlexCS>
  );
}

export default PgHomeContactAndSupport;
