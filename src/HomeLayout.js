import { Box, ChakraProvider, Portal } from "@chakra-ui/react";
// core components
import HomeNavbar from "views/home/navs/HomeNavbar.js";
import React from "react";
import { Route, Outlet  } from "react-router-dom";
import theme from "theme/theme.js";
import HomeFooter from "./views/home/HomeFooter.js";
import { VFlex } from './views/app/bits/UtilityTags.js';
import ResizeObsPoly from 'resize-observer-polyfill';


export default function HomeLayout(props) {
  if(!window.ResizeObserver){window.ResizeObserver=ResizeObsPoly}
  const { ...rest } = props;
  React.useEffect(() => {
    document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return ()=>{};
  });
  document.documentElement.dir = "ltr";
  return (<>
      <HomeNavbar/>
      <Outlet/>
      <HomeFooter/>
</> );
}
