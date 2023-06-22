import { useSelector } from "react-redux"
import CheckoutProductCard from "../components/CheckoutProductCard"
import { countTotalPrice } from "../store/cart/cartHandlers"
import PaymentForm from "../components/PaymentForm"

export default function Checkout() {
  let cartProducts = useSelector(state=> state.cart.cartProducts)
  
  let totalPriceOfProducts = countTotalPrice()
  return (
    <div className="">
      
      {cartProducts.length === 0 ? 
        <p className="text-center">You didn&apos;t add any product to your cart yet</p> : 
        <>
          <div className="overflow-auto pb-4 productsContainer">
            <div className="min-w-[600px]">
              {cartProducts.map((product,index)=> <CheckoutProductCard key={product.id} product={product} productIndex={index}/>)}   
            </div>
          </div>
          <p className="text-right text-[22px] lining-nums py-5 font-medium"> TOTAL: {totalPriceOfProducts}$</p>
          <PaymentForm amount={totalPriceOfProducts}/ >
        </>   
      }

    </div>
  )
}
