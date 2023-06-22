import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./css/toast-style.css"
import "./css/index.css"
import HeaderLayout from "./Layouts/HeaderLayout";
import Categories from "./routes/Categories";
import ErrorRoute from "./routes/ErrorRoute";
import Shop from "./routes/Shop";
import Contact from "./routes/Contact";
import { ToastContainer } from "react-toastify";
import Authentication from "./routes/authentication/Authentication";
import Checkout from "./routes/Checkout";
import Category from "./routes/Category";
import { Provider } from "react-redux";
import { store } from "./store/store";
import UserListener from "./loaders/UserListener";
import UserDataLoader from "./loaders/UserDataLoader";
import ProductsLoader from "./loaders/ProductsLoader";
import { StrictMode } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./stripe/stripe";


let route = createBrowserRouter([
  {
    path: "/",
    element: <HeaderLayout />,
    errorElement: <ErrorRoute />,
    children: [
      { index: true, element: <Categories /> },
      { path: "shop", element: <Shop /> },
      { path: "shop/:category", element: <Category /> },
      { path: "contact", element: <Contact /> },
      { path: "auth", element: <Authentication /> },
      { path: "checkout", element: <Checkout /> },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <StrictMode>

    <Provider store={store}>
      <Elements stripe={stripePromise}>

        <UserListener>
          <UserDataLoader>
            <ProductsLoader>

              <RouterProvider router={route} />
              <ToastContainer position="top-center" />

            </ProductsLoader>
          </UserDataLoader>
        </UserListener>

      </Elements>
    </Provider>

    </StrictMode>,
  </>
);