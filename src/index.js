import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ColorModeScript,ChakraProvider } from '@chakra-ui/react'
import theme from './theme/theme.js';

// import XPgBilling from './views/app/XPgBilling.js';
// import XPgProfile from './views/app/XPgProfile.js';
// import XPgTables from './views/app/XPgTables.js';
import PgDash from './views/app/PgDash.js';
import PgFrogeX from './views/app/PgFrogeX.js';
import PgEcoAction from './views/app/PgEcoAction.js';
import PgSponsorships from './views/app/PgSponsorships.js';
import PgGameNight from './views/app/PgGameNight.js';
import PgNFT from './views/app/PgNFT.js';
import PgXchange from './views/app/PgXchange.js';
import PgCalculators from './views/app/PgCalculators.js';

// import HomeLayout from './HomeLayout.js';
import PgHomeLanding from './views/home/PgHomeLanding.js';
import PgHomeTeam from './views/home/PgHomeTeam.js';
import PgHomeAccounting from './views/home/PgHomeAccounting.js';
import PgHomeEco from './views/home/PgHomeEco.js';
import PgHomeFAQ from './views/home/PgHomeFAQ.js';
import PgHomeSupport from './views/home/PgHomeContactAndSupport.js';
import PgUnderConstruction from './views/app/PgUnderConstruction.js';
import PgHomeContactAndSupport from './views/home/PgHomeContactAndSupport.js';
import PgHomeResources from './views/home/PgHomeResources.js';

const HomeLayout = React.lazy(() => import(/* webpackChunkName: "views-homelayout" */ './HomeLayout.js'));
// const PgHomeLanding = React.lazy(() => import(/* webpackChunkName: "views-landing" */ './views/home/PgHomeLanding.js'));
// const PgHomeTeam = React.lazy(() => import(/* webpackChunkName: "views-team" */ './views/home/PgHomeTeam.js'));
// const PgHomeAccounting = React.lazy(() => import(/* webpackChunkName: "views-accounting" */ './views/home/PgHomeAccounting.js'));
// const PgHomeEco = React.lazy(() => import(/* webpackChunkName: "views-eco" */ './views/home/PgHomeEco.js'));
// const PgHomeFAQ = React.lazy(() => import(/* webpackChunkName: "views-faq" */ './views/home/PgHomeFAQ.js'));
// const PgHomeSupport = React.lazy(() => import(/* webpackChunkName: "views-support" */ './views/home/PgHomeSupport.js'));

const AppProvider = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './AppProvider.js')
);
// const ViewError = React.lazy(() =>
//   import(/* webpackChunkName: "views-error" */ './views/error')
// );

ReactDOM.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
    <ChakraProvider theme={theme} resetCss={false} w="100%">

    <Suspense fallback={<div className="loading"/>}>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout/>}>
            <Route path={'/'} element={<PgHomeLanding/>}/>
            <Route path={'/team'} element={<PgHomeTeam/>}/>
            <Route path={'/faq'} element={<PgHomeFAQ/>}/>
            <Route path={'/eco'} element={<PgHomeEco/>}/>
            <Route path={'/accounting'} element={<PgHomeAccounting/>}/>
            <Route path={'/resources'} element={<PgHomeResources/>}/>
            <Route path={'/contact-and-support'} element={<PgHomeContactAndSupport/>}/>
            <Route path={'/contact'} element={<PgHomeContactAndSupport/>}/>
            <Route path={'/support'} element={<PgHomeContactAndSupport/>}/>
          </Route>
          <Route path={'/app/*'} element={<AppProvider/>}>
            <Route path={'dash'} element={<PgDash/>}/>
            <Route path={'frogex'} element={<PgFrogeX/>}/>
            <Route path={'eco-action'} element={<PgUnderConstruction/>}/>
            <Route path={'sponsorships'} element={<PgUnderConstruction/>}/>
            <Route path={'game-night'} element={<PgUnderConstruction/>}/>
            <Route path={'nft'} element={<PgUnderConstruction/>}/>
            <Route path={'xchange'} element={<PgXchange/>}/>
            <Route path={'calc'} element={<PgCalculators/>}/>
            {/* <Route path={'billing'} element={<XPgBilling/>}/> */}
            {/* <Route path={'profile'} element={<XPgProfile/>}/> */}
            {/* <Route path={'tables'} element={<XPgTables/>}/> */}
            <Route path={'*'} element={<PgDash/>}/>
          </Route>
          <Route path="*" element={<HomeLayout/>}/>
        </Routes>
      </BrowserRouter>
    </Suspense>
    </ChakraProvider>

  </>

  , document.getElementById("root")
);
