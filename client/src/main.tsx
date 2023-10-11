import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import setupStore from './redux/store'
import { route, routeIsAuth } from './routes'
import Layout from './components/layout/Layout'
import './main.css'

const store = setupStore()

const App: React.FC = () => {

  return (
    <Routes>
      {routeIsAuth.map(({ path, Element }) =>
        <Route
          key={path}
          path={path}
          element={
            <Layout>
              <Element />
            </Layout>
          }
        />
      )}
      {route.map(({ path, Element }) =>
        <Route
          key={path}
          path={path}
          element={
            <Suspense>
              <Element />
            </Suspense>
          }
        />
      )}
    </Routes>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
