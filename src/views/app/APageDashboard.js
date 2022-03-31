// Chakra imports
import {
  Box, Button, Flex, Grid, Icon,
} from "@chakra-ui/react";
// assets
import React, { useState } from "react";
// react icons
import PondNetworkVitals from './ponds/PondNetworkVitals.js';
import PondMyFrogeXRewards from './ponds/PondMyFrogeXRewards.js';

export default function APageDashboard() {

  return (
    <Flex flexDirection="column" flexGrow='1' pt={{ base: "120px", md: "75px" }}>

      {/* <BogGlobalStats/> */}
      <Grid
        templateColumns={{ md: "1fr", lg: "1.8fr 1.2fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        my="26px"
        gap="24px"
      >
        <PondMyFrogeXRewards/>
        <PondNetworkVitals/>
        {/* <PondFrogeXVitals/> */}
        {/* <PondRockets/> */}
      </Grid>
      <Grid
        templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
        gap="24px"
        mb={{ lg: "26px" }}
      >
        {/* <PondActiveUsers/> */}

        {/* <PondSalesOverview/> */}
      </Grid>
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr" }}
        templateRows={{ sm: "1fr auto", md: "1fr", lg: "1fr" }}
        gap="24px"
      >
        {/* <PondProjects/> */}
        {/* <PondOrdersOverview/> */}

      </Grid>
    </Flex>
  );
}
