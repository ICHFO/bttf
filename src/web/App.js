import React from 'react'
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home"
import Error from "./components/Error";
import Detail from "./pages/Detail";
import TestPage from "./pages/TestPage";



export default function App () {
  return (
      <main>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/testpage' component={TestPage} />
          <Route component={Error} />
        </Switch>
      </main>
  )
}
