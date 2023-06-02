/* eslint-disable react/prop-types */

export default function Button({children,btnType,addedStyles,loadingState,...otherProps}) {
  
  let style = btnType === 'first' ? 'bg-black text-white hover:bg-white hover:text-black hover:border-black' : 
              btnType === 'google' ? 'bg-[#3978EF] text-white hover:opacity-90' : 
              btnType === 'second' ? 'bg-[#EAEBEE] hover:bg-black hover:text-[#EAEBEE] border-gray-900 '  : ''
  return (
    <button disabled={loadingState} className={` ${loadingState && 'cursor-not-allowed' }  p-3 w-[150px] uppercase text-[15px] duration-200 ease-linear text-center border border-transparent ${addedStyles} ${style}`} {...otherProps}>{children}</button>
  )
}
