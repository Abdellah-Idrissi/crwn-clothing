import  bagCart from "../assets/shopping-bag.svg"
import { useCartContext } from "../contexts/CartContext"
import { Link } from "react-router-dom"
import DropDownProductCard from "./DropDownProductCard"


export default function Cart() {
  let {isDropDownOpen , changeOpenState,cartProducts , numOfProducsInCart} = useCartContext()

  return (
    <>

      {/*----- CART -----*/}
      <div className="relative cursor-pointer" onClick={changeOpenState}>
        <img src={bagCart} className={`  ${numOfProducsInCart >= 100 ?  'w-[27px]'  : 'w-[22px]'}   `} alt="bag" />
        <span className={`absolute pointer-events-none lining-nums -translate-x-1/2 -translate-y-1/2 left-1/2 top-[67%]  leading-none ${numOfProducsInCart >= 100 ?  'text-[10px]'  : 'text-[12px]'}`}>{numOfProducsInCart}</span>
      </div>

      {/*----- DROPDOWN -----*/}
      <div className={`absolute dropdown ease-linear duration-200 ${isDropDownOpen ? 'show' : 'hide'} bg-white border-[2px] border-black top-[67px] flex flex-col h-[300px] w-[250px]  gap-y-3 right-8 z-50 px-4 py-3 `}>
        

        <div className="grow dropdown overflow-auto flex gap-y-3 flex-col dropDownProducts">

          {cartProducts.length < 1 ?
            <p className="text-center">No products in cart</p> :
            cartProducts.map(product=> <DropDownProductCard key={product.id} product={product}/>)
          }

        </div>

        <Link className="bg-black text-white w-full hover:bg-white border hover:text-black hover:border-black p-3 uppercase text-[15px] duration-200 ease-linear text-center" to={'/checkout'}>go to chekout</Link>
        
      </div>

    </>
  )
}
