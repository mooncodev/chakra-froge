import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ColorModeScript } from '@chakra-ui/react'
import PgHomeLanding from './views/home/PgHomeLanding.js';
import PgHomeTeam from './views/home/PgHomeTeam.js';

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

const HomeLayout = React.lazy(() =>
  import(/* webpackChunkName: "views-home" */ './HomeLayout.js')
);
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
