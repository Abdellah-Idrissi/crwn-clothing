/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/products/productsSlice";

export default function ProductsLoader({ children }) {
  let dispatch = useDispatch();
  let loading = useSelector((state) => state.products.loading);

  // GET PRODUCTS FROM DB
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return <>{loading === true ? <Loading /> : children}</>;
}
