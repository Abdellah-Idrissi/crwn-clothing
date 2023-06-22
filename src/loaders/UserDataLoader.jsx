/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Loading from "../components/Loading";
import { updateCartBasedOnUserState } from "../store/cart/cartHandlers";
import { useSelector } from "react-redux";

export default function UserDataLoader({ children }) {
  let numOfProductsInCart = useSelector(
    (state) => state.cart.numOfProductsInCart
  );
  let user = useSelector((state) => state.user.user);

  useEffect(() => {
    return updateCartBasedOnUserState();
  }, [user]);

  return <>{numOfProductsInCart === undefined ? <Loading /> : children}</>;
}
