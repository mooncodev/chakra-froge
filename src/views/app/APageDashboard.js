// Chakra imports
import {
  Box, Button, Flex, Grid, Icon,
  Image, Portal, Progress, SimpleGrid, Spacer,
  Stat, StatHelpText, StatLabel, StatNumber,
  Table, Tbody, Text, Th, Thead, Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// assets
import peopleImage from "assets/img/people-image.png";
import logoChakra from "assets/svg/logo-white.svg";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
import IconBox from "components/Icons/IconBox";
// Custom icons
import {
  CartIcon, DocumentIcon, GlobeIcon, RocketIcon, StatsIcon, WalletIcon,
} from "components/Icons/Icons.js";
import DashboardTableRow from "components/Tables/DashboardTableRow";
import TimelineRow from "components/Tables/TimelineRow";
import React, { useState } from "react";
// react icons
import { BsArrowRight } from "react-icons/bs";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { dashboardTableData, timelineData } from "data/general";
import PondFrogeXVitals from './ponds/PondFrogeXVitals.js';
import PondSalesOverview from './ponds/PondSalesOverview.js';
import PondProjects from './ponds/PondProjects.js';
import PondOrdersOverview from './ponds/PondOrdersOverview.js';
import PondActiveUsers from './ponds/PondActiveUsers.js';
import BogGlobalStats from './ponds/BogGlobalStats.js';
import PondRockets from './ponds/PondRockets.js';
import PondNetworkVitals from './ponds/PondNetworkVitals.js';
import PondMyFrogeXRewards from './ponds/PondMyFrogeXRewards.js';

export default function APageDashboard() {
  const value = "$100.000";
  // Chakra Color Mode
  const { colorMode, toggleColorMode } = useColorMode();
  const iconTeal = "green.300"
  const iconBoxInside = "white"
  const textColor = "white"
  const [series, setSeries] = useState([
    {
      type: "area",
      name: "Mobile apps",
      data: [190, 220, 205, 350, 370, 450, 400, 360, 210, 250, 292, 150],
    },
    {
      type: "area",
      name: "Websites",
      data: [400, 291, 121, 117, 25, 133, 121, 211, 147, 25, 201, 203],
    },
  ]);
  const overlayRef = React.useRef();

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
