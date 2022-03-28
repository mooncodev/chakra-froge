import { extendTheme } from "@chakra-ui/react";
import { globalStyles } from "./global.js";
import { fonts } from "./foundations/fonts.js";
import { breakpoints } from "./foundations/breakpoints";
import { buttonStyles } from "./components/button";
import { accordionStyles } from "./components/accordion";
import { badgeStyles } from "./components/badge";
import { linkStyles } from "./components/link";
import { drawerStyles } from "./components/drawer";
import { CardComponent } from "./additions/card/Card";
import { CardBodyComponent } from "./additions/card/CardBody";
import { CardHeaderComponent } from "./additions/card/CardHeader";
import { MainPanelComponent } from "./additions/layout/MainPanel";
import { PondComponent } from '../views/app/bits/Pond.js';
// import { mode } from "@chakra-ui/theme-tools";
export default extendTheme(
  { breakpoints }, // Breakpoints
  globalStyles,
  fonts, // Global styles
  buttonStyles, // Button styles
  accordionStyles, // Accordion Styles
  badgeStyles, // Badge styles
  linkStyles, // Link styles
  drawerStyles, // Sidebar variant for Chakra's drawer
  CardComponent, // Card component
  CardBodyComponent, // Card Body component
  CardHeaderComponent, // Card Header component
  MainPanelComponent, // Main Panel component
  PondComponent, // Main Panel component
);
