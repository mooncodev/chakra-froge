import React, { useState } from "react";
import {
  Box, Flex, Button, FormControl, FormLabel,
  Heading, Input, Link, Switch, Text,
} from "@chakra-ui/react";
import { VFlex, VFlexCS } from '../app/bits/UtilityTags.js';
import { NewsMarquee } from './sections/marquee.js';


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
