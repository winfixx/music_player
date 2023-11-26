import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { userApi } from './api/rtk/user.api'
import Layout from './components/layout/Layout'
import Loader from './components/loader/Loader'
import { ACCESS_TOKEN } from './constants/constants'
import { useActionCreators } from './hooks/useActionCreators'
import { userActions } from './redux/reducers/userSlice'
import { route, routeIsAuth } from './routes'

const App: React.FC = () => {
  const { data: userData, isLoading, isSuccess } = userApi.useCheckAuthQuery(null, { skip: !localStorage.getItem(ACCESS_TOKEN) })
  const actions = useActionCreators(userActions)

  React.useEffect(() => {
    if (isSuccess) actions.setUser(userData.user)
  }, [userData?.user.id])

  return (
    <Routes>
      {routeIsAuth.map(({ path, Element }) =>
        <Route
          key={path}
          path={path}
          element={
            <Layout>
              <React.Suspense>
                {isLoading
                  ? <Loader />
                  : <Element />
                }
              </React.Suspense>
            </Layout>
          }
        />
      )}
      {!userData?.user.id
        && route.map(({ path, Element }) =>
          <Route
            key={path}
            path={path}
            element={
              <React.Suspense>
                <Element />
              </React.Suspense>
            }
          />
        )

      }
    </Routes>
  )
}

export default App