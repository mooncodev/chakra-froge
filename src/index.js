import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HPageLanding from './views/home/HPageLanding.js';
import HPageTeam from './views/home/HPageTeam.js';

import APageBilling from './views/app/APageBilling.js';
import APageDashboard from './views/app/APageDashboard.js';
import APageProfile from './views/app/APageProfile.js';
import APageTables from './views/app/APageTables.js';

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
  <Suspense fallback={<div className="loading" />}>
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />} >
          <Route path={'/'} element={<HPageLanding/>} />
          <Route path={'/team'} element={<HPageTeam/>} />
        </Route>
        <Route path={'/app/*'} element={<AppProvider/>} >
          <Route path={'dash'} element={<APageDashboard/>} />
          <Route path={'billing'} element={<APageBilling/>} />
          <Route path={'profile'} element={<APageProfile/>} />
          <Route path={'tables'} element={<APageTables/>} />
          <Route path={'*'} element={<APageDashboard/>} />
        </Route>
        <Route path='*' element={<HomeLayout/>} />
      </Routes>
    </BrowserRouter>
  </Suspense>

  , document.getElementById("root")
);
