/* eslint-disable react/prop-types */
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useCartContext } from '../contexts/CartContext'


function CheckoutProductCard({product,productIndex}) {

  let {addProductToCart,decreaseQuantityOfProduct,removeProductFromCart} = useCartContext()
  let {imageUrl , quantity , name , price} = product

  let handleAddProductToCart = ()=> addProductToCart(product)
  let handleDecreaseQuantityOfProduct = ()=> decreaseQuantityOfProduct(productIndex)
  let handleRemoveProductFromCart = ()=> removeProductFromCart(productIndex)



  return (
    <div className="border-b border-black flex gap-x-5 justify-between py-5 items-center ">

      <img src={imageUrl} className="w-[100px] h-[100px] object-cover rounded-md" alt="" />

      <p className="font-semibold">{name}</p>

      <div className='lining-nums flex gap-1'>
        <ChevronLeftIcon className={`w-[20px] cursor-pointer ${quantity === 1 && 'pointer-events-none text-gray-400 cursor-not-allowed'}`} onClick={handleDecreaseQuantityOfProduct}/>
        <p className='select-none font-medium'>{quantity}</p>
        <ChevronRightIcon className='w-[20px] cursor-pointer' onClick={handleAddProductToCart}/>
      </div>

      <p className='font-semibold lining-nums select-none'>${price}</p>

      <XMarkIcon className='w-[20px] cursor-pointer ease-linear duration-200 hover:text-red-500' onClick={handleRemoveProductFromCart}/>

    </div>
  )
}

export default CheckoutProductCard

