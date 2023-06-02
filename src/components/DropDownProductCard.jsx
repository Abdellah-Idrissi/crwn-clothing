/* eslint-disable react/prop-types */

export default function dropDownProductCard({product}) {
  let {name , quantity , imageUrl , price} = product
  return (
    <div className="flex gap-x-[10px] items-center dropdown">
      <img src={imageUrl} alt={name} className="w-[70px] h-[70px] object-cover rounded-md dropdown" />
      <div className="dropdown">
        <p className="font-semibold text-[15px] dropdown">{name}</p>
        <p className="lining-nums text-[15px] dropdown">{quantity} x ${price}</p>
      </div>
    </div>
  )
}
