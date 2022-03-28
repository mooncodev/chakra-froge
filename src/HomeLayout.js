// chakra imports
import { Box, ChakraProvider, Portal } from "@chakra-ui/react";
// core components
import HomeNavbar from "views/home/HomeNavbar.js";
import React from "react";
import { Route, Outlet  } from "react-router-dom";
import theme from "theme/theme.js";
import HomeFooter from "./views/home/HomeFooter.js";

export default function HomeLayout(props) {
  const { ...rest } = props;
  React.useEffect(() => {
    document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return ()=>{};
  });
  const navRef = React.useRef();
  document.documentElement.dir = "ltr";
  return (
    <ChakraProvider theme={theme} resetCss={false} w="100%">
      <Box ref={navRef} w="100%">
        <HomeNavbar/>
        <Box w="100%">
          <Outlet/>
        </Box>
        <Box px="24px" mx="auto" width="1044px" maxW="100%">
          <HomeFooter/>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
