import { mode } from "@chakra-ui/theme-tools";
import 'react-perfect-scrollbar/dist/css/styles.css';
import arsenal from "@fontsource/arsenal"
import actor from "@fontsource/actor"
import mononoki from "@fontsource/mononoki"
import monda from "@fontsource/monda"
import miriamlibre from "@fontsource/miriam-libre"
import mina from "@fontsource/mina"
import raleway from "@fontsource/raleway"
import raleway200 from "@fontsource/raleway/200.css"
import montserrat from "@fontsource/montserrat"
import mochiypopone from "@fontsource/mochiy-pop-one"
const f = [mononoki,
  monda,
  miriamlibre,
  mina,
  raleway,
  montserrat,
  mochiypopone]
//https://themera.vercel.app/
export const globalStyles = {
  initialColorMode: 'light',
  colors: {
    gray: {
      700: "#1e2434",
    },
    "blue": {
      "50": "#EFF1F6",
      "100": "#D2D7E5",
      "200": "#B5BDD4",
      "300": "#98A3C3",
      "400": "#7A8AB3",
      "500": "#5D70A2",
      "600": "#4B5A81",
      "700": "#384361",
      "800": "#252D41",
      "900": "#131620"
    },
    "green": {
      "50": "#F0F9EB",
      "100": "#D6EEC8",
      "200": "#BBE4A5",
      "300": "#A0D982",
      "400": "#86CE5F",
      "500": "#6BC33C",
      "600": "#569C30",
      "700": "#407524",
      "800": "#2B4E18",
      "900": "#15270C"
    }
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("blue.50", "blue.800")(props),
        fontFamily: 'Raleway , Helvetica, sans-serif',
        fontWeight: 200,
      },
      heading: "Raleway",
      html: {
        fontFamily: 'Raleway , Helvetica, sans-serif',
        fontWeight: 200,
      }
    }),
  },
};
