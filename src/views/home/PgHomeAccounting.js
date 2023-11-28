import React, { useState } from "react";
import {
  Box, Flex, Button, FormControl, FormLabel,
  Heading, Input, Link, Switch, Text,
} from "@chakra-ui/react";
import { VFlex, VFlexCS } from '../common/UtilityTags.js';
import { NewsMarquee } from './sections/marquee.js';


function PgHomeAccounting() {

  return (
    <VFlex flexGrow={1}>
      <VFlexCS h='4rem'>
        <NewsMarquee/>
      </VFlexCS>
      <VFlexCS h='4rem'>
        Soon: Charity Accounting Page!
      </VFlexCS>

    </VFlex>
  );
}

export default PgHomeAccounting;
