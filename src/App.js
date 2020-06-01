import React, { lazy, Suspense } from "react"
import { render } from "react-dom"
import { Router } from '@reach/router'
import { Provider } from 'react-redux'

import NavBar from "./NavBar"
import store from "./store"

const Details = lazy(() => import("./Details"))
const SearchParams = lazy(() => import("./SearchParams"))

const App = () => (
  <Provider store={store}>
    <React.StrictMode>
      <div>
        <NavBar />
        <Suspense fallback={<h1>loadding route...</h1>}>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </Suspense>
      </div>
    </React.StrictMode>
  </Provider>
)

render(<App />, document.getElementById("root"))
