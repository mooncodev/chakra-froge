import { extendTheme } from "@chakra-ui/react";
import { globalStyles } from "./global.js";
import { breakpoints } from "./foundations/breakpoints";
import { buttonStyles } from "./components/button";
import { accordionStyles } from "./components/accordion";
import { badgeStyles } from "./components/badge";
import { linkStyles } from "./components/link";
import { drawerStyles } from "./components/drawer";
import { CardComponent } from "./additions/card/Card";
import { CardBodyComponent } from "./additions/card/CardBody";
import { CardHeaderComponent } from "./additions/card/CardHeader";
import { PondComponent } from '../views/app/bits/Pond.js';
import { SBNavLinkComponent } from '../views/app/bits/SBNavLink.js';
import { BubbleComponent } from '../views/app/bits/Bubble.js';
import { colorWheels } from './foundations/colorWheels.js';
import { SentenceTabsComponent } from '../views/app/bits/SentenceTabs.js';
import { formStyles } from './components/form.js';
// import { mode } from "@chakra-ui/theme-tools";
export default extendTheme(
  { breakpoints },
  globalStyles,
  buttonStyles,
  accordionStyles,
  badgeStyles,
  formStyles,
  linkStyles,
  drawerStyles,
  CardComponent,
  CardBodyComponent,
  CardHeaderComponent,
  PondComponent,
  BubbleComponent,
  SBNavLinkComponent,
  SentenceTabsComponent,
);
