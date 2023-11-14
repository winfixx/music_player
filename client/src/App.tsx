import * as React from 'react'
import { RouterProvider } from 'react-router-dom'
import { userApi } from './api/user.api'
import { ACCESS_TOKEN } from './constants/constants'
import { useActionCreators } from './hooks/useActionCreators'
import { userActions } from './redux/reducers/userSlice'
import { router } from './routes'

const App: React.FC = () => {
  const { data: userData, isLoading, isSuccess } = userApi.useCheckAuthQuery(null, { skip: !localStorage.getItem(ACCESS_TOKEN) })
  const actions = useActionCreators(userActions)

  React.useEffect(() => {
    if (isSuccess) actions.setUser(userData.user)
  }, [userData?.user.id])

  // if (isLoading) {
  //   return (
  //     <Layout>
  //       Loading...
  //     </Layout>
  //   )
  // }

  return (
    <RouterProvider router={router} />
    // <Routes>
    //   {routeIsAuth.map(({ path, Element }) =>
    //     <Route
    //       key={path}
    //       path={path}
    //       element={
    //         <Layout>
    //           <React.Suspense>
    //             <Element />
    //           </React.Suspense>
    //         </Layout>
    //       }
    //     />
    //   )}
    //   {route.map(({ path, Element }) =>
    //     <Route
    //       key={path}
    //       path={path}
    //       element={
    //         <React.Suspense>
    //           <Element />
    //         </React.Suspense>
    //       }
    //     />
    //   )}
    // </Routes>
  )
}

export default App