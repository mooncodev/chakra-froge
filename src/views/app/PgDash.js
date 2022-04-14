import { Grid, } from '@chakra-ui/react';
// assets
import React from 'react';
// react icons
// import PondNetworkVitals from './ponds/PondNetworkVitals.js';
import PondFrogeXDividends from './ponds/PondFrogeXDividends.js';

export default function PgDash() {

  return (
    // <Flex flexDirection="column" flexGrow='1' pt="75px">

    <>
        {/* <BogGlobalStats/> */}
        <PondFrogeXDividends/>

      {/* <PondNetworkVitals/> */}
        {/* <PondFrogeXVitals/> */}
        {/* <PondRockets/> */}
    </>
      // <Grid
      //   templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
      //   templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
      //   gap="24px"
      //   mb={{ lg: "26px" }}
      // >
      //   {/* <PondActiveUsers/> */}
      //
      //   {/* <PondSalesOverview/> */}
      // </Grid>
      // <Grid
      //   templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr" }}
      //   templateRows={{ sm: "1fr auto", md: "1fr", lg: "1fr" }}
      //   gap="24px"
      // >
      //   {/* <PondProjects/> */}
      //   {/* <PondOrdersOverview/> */}
      //
      // </Grid>
    // </Flex>
  );
}
