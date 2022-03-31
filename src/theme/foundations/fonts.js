import "@fontsource/raleway/200.css"
import "@fontsource/raleway/400.css"
import "@fontsource/raleway/700.css"
import "@fontsource/raleway/900.css"
import "@fontsource/montserrat/200.css"
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/700.css"
import "@fontsource/montserrat/900.css"

export const fontsTheme = {
  fonts: {
    body: 'Montserrat, Helvetica, sans-serif',
    rale: 'Raleway, Helvetica, sans-serif',
    mont: 'Montserrat, Helvetica, sans-serif',
    mono: "Menlo, monospace",
  },
  fontWeights: {
    rale: { light: 200, medium: 400, bold: 700, heavy: 900, },
    mont: { light: 200, medium: 400, bold: 700, heavy: 900, },
  },
}

function buildFontTree( famStr, weightsObj, sizesObj, rv = {} ){
  for(let [wKey,wVal] of Object.entries(weightsObj)){rv[wKey] = {};
    for(let [sKey,sVal] of Object.entries(sizesObj)){rv[wKey][sKey] = {
        fontFamily: famStr, fontWeight:wVal, fontSize:sVal }}}
  return rv
}
const montFam = 'mont'
const raleFam = 'mont'
const montWeights = {
  lt:200,
  md:400,
  bd:700,
  hv:900,
};
const montSizes = {
  xs:'.4rem',
  sm:'.6rem',
  md:'.9rem',
  lg:'1.2rem',
  xl:'1.5rem',
}
export const mont = buildFontTree(montFam,montWeights,montSizes)
export const rale = buildFontTree(raleFam,montWeights,montSizes)
