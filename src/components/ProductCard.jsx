/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import Button from "./Button"
import { addProductToCart } from "../store/cart/cartHandlers"

export default function ProductCard({product}) {
  let {imageUrl , name , price } = product

  let handleAddProductToCart = ()=> addProductToCart(product)

  return (
    <Link className="flex flex-col group rounded-md overflow-hidden">

      <div className="grow relative">
        <img src={imageUrl} className=" h-full w-full object-cover" alt={name} />
        <div className="bg-gray-500 absolute inset-0 group-hover:opacity-30 ease-linear duration-200 opacity-0"></div>
        <Button btnType={'second'} onClick={handleAddProductToCart} addedStyles={'absolute opacity-0 ease-linear duration-200 group-hover:opacity-100 w-[80%]  bottom-5 left-1/2 -translate-x-1/2 '}>ADD TO CART</Button>
      </div>

      <div className="flex pt-2 font-medium justify-between gap-x-2 text-[15px]">
        <p>{name}</p>
        <p className="lining-nums">${price}</p>
      </div>

    </Link>
  )
}

