import ReactDOM from 'react-dom/client'
import { RouterProvider , createBrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import './toast-style.css'
import './index.css'
import HeaderLayout from './Layouts/HeaderLayout'
import Categories from './routes/Categories'
import ErrorRoute from './routes/ErrorRoute'
import Shop from './routes/Shop'
import Contact from './routes/Contact'
import { ToastContainer } from 'react-toastify'
import Authentication from './routes/authentication/Authentication'
import AuthContext from './contexts/AuthContext'
import ProductsContext from './contexts/ProductsContext'
import CartContext from './contexts/CartContext'
import Checkout from './routes/Checkout'
import Category from './routes/Category'



let route = createBrowserRouter([
  {element:<AuthContext/> , children: [
  {element:<ProductsContext/> , children: [
  {element:<CartContext/> , children: [

    {path:'/' , element: <HeaderLayout/> , errorElement: <ErrorRoute/> , children:[
      {index:true , element: <Categories /> },
      {path:'shop' , element: <Shop/>},
      {path:'shop/:category' , element:<Category/>},
      {path:'contact' , element:<Contact/>},
      {path:'auth', element:<Authentication/>},
      {path:'checkout', element:<Checkout/>}
    ]},


  ]}


    ]}

  ]}

])


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    {/* <StrictMode> */}
      <RouterProvider router={route}/>
      <ToastContainer position="top-center"/>
    {/* </StrictMode>, */}
  </>
)