import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import store from './redux/store'
import './main.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter> */}
        <App />
      {/* </BrowserRouter> */}
    </Provider>
  </React.StrictMode>
)