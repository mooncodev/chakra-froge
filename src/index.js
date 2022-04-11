import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ColorModeScript } from '@chakra-ui/react'

import XPgBilling from './views/app/XPgBilling.js';
import PgDash from './views/app/PgDash.js';
import XPgProfile from './views/app/XPgProfile.js';
import XPgTables from './views/app/XPgTables.js';
import theme from './theme/theme.js';
import PgEcoAction from './views/app/PgEcoAction.js';
import PgFrogeX from './views/app/PgFrogeX.js';
import PgSponsorships from './views/app/PgSponsorships.js';
import PgGameNight from './views/app/PgGameNight.js';
import PgNFT from './views/app/PgNFT.js';
import PgXchange from './views/app/PgXchange.js';
import PgCalculators from './views/app/PgCalculators.js';

// import PgHomeLanding from './views/home/PgHomeLanding.js';
// import PgHomeTeam from './views/home/PgHomeTeam.js';
// import PgHomeAccounting from './views/home/PgHomeAccounting.js';
// import PgHomeEco from './views/home/PgHomeEco.js';
// import PgHomeFAQ from './views/home/PgHomeFAQ.js';

const HomeLayout = React.lazy(() => import(/* webpackChunkName: "views-homelayout" */ './HomeLayout.js'));
const PgHomeLanding = React.lazy(() => import(/* webpackChunkName: "views-landing" */ './views/home/PgHomeLanding.js'));
const PgHomeTeam = React.lazy(() => import(/* webpackChunkName: "views-team" */ './views/home/PgHomeTeam.js'));
const PgHomeAccounting = React.lazy(() => import(/* webpackChunkName: "views-accounting" */ './views/home/PgHomeAccounting.js'));
const PgHomeEco = React.lazy(() => import(/* webpackChunkName: "views-eco" */ './views/home/PgHomeEco.js'));
const PgHomeFAQ = React.lazy(() => import(/* webpackChunkName: "views-faq" */ './views/home/PgHomeFAQ.js'));
const PgHomeSupport = React.lazy(() => import(/* webpackChunkName: "views-support" */ './views/home/PgHomeSupport.js'));

const AppProvider = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './AppProvider.js')
);
// const ViewError = React.lazy(() =>
//   import(/* webpackChunkName: "views-error" */ './views/error')
// );

ReactDOM.render(
  <><ColorModeScript initialColorMode={theme.config.initialColorMode}/>
    <Suspense fallback={<div className="loading"/>}>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout/>}>
            <Route path={'/'} element={<PgHomeLanding/>}/>
            <Route path={'/team'} element={<PgHomeTeam/>}/>
            <Route path={'/faq'} element={<PgHomeFAQ/>}/>
            <Route path={'/eco'} element={<PgHomeEco/>}/>
            <Route path={'/accounting'} element={<PgHomeAccounting/>}/>
            <Route path={'/support'} element={<PgHomeSupport/>}/>
          </Route>
          <Route path={'/app/*'} element={<AppProvider/>}>
            <Route path={'dash'} element={<PgDash/>}/>
            <Route path={'frogex'} element={<PgFrogeX/>}/>
            <Route path={'eco-action'} element={<PgEcoAction/>}/>
            <Route path={'sponsorships'} element={<PgSponsorships/>}/>
            <Route path={'game-night'} element={<PgGameNight/>}/>
            <Route path={'nft'} element={<PgNFT/>}/>
            <Route path={'xchange'} element={<PgXchange/>}/>
            <Route path={'calc'} element={<PgCalculators/>}/>
            <Route path={'billing'} element={<XPgBilling/>}/>
            <Route path={'profile'} element={<XPgProfile/>}/>
            <Route path={'tables'} element={<XPgTables/>}/>
            <Route path={'*'} element={<PgDash/>}/>
          </Route>
          <Route path="*" element={<HomeLayout/>}/>
        </Routes>
      </BrowserRouter>
    </Suspense></>

  , document.getElementById("root")
);
