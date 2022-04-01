import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ColorModeScript } from '@chakra-ui/react'
import HPageLanding from './views/home/HPageLanding.js';
import HPageTeam from './views/home/HPageTeam.js';

import A_PgBilling from './views/app/A_PgBilling.js';
import A_PgDash from './views/app/A_PgDash.js';
import A_PgProfile from './views/app/A_PgProfile.js';
import A_PgTables from './views/app/A_PgTables.js';
import theme from './theme/theme.js';

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
            <Route path={'/'} element={<HPageLanding/>}/>
            <Route path={'/team'} element={<HPageTeam/>}/>
          </Route>
          <Route path={'/app/*'} element={<AppProvider/>}>
            <Route path={'dash'} element={<A_PgDash/>}/>
            <Route path={'billing'} element={<A_PgBilling/>}/>
            <Route path={'profile'} element={<A_PgProfile/>}/>
            <Route path={'tables'} element={<A_PgTables/>}/>
            <Route path={'*'} element={<A_PgDash/>}/>
          </Route>
          <Route path="*" element={<HomeLayout/>}/>
        </Routes>
      </BrowserRouter>
    </Suspense></>

  , document.getElementById("root")
);
