import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css'  // This is the default bootstrap css
import './assets/styles/bootstrap.custom.css'  // This is the custom bootstrap css
import './assets/styles/index.css'  // This is the custom css

// React Router
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
// Redux
import { Provider } from 'react-redux'
import store from './store.js'
// Screens
import HomeScreen from './screens/HomeScreen.jsx'
import ProductScreen from './screens/ProductScreen.jsx'
import CartScreen from './screens/CartScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import ShippingScreen from './screens/ShippingScreen.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import PaymentScreen from './screens/PaymentScreen.jsx'

const router = createBrowserRouter( 
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      // Private Routes
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
