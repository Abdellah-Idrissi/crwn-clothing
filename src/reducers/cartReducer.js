

export default function cartReducer(state,action) {
  let {type , payload} = action
  let { isDropDownOpen } = state

  switch(type) {
    case 'TOGGLE_DROPDOWN' : 
    return {...state , isDropDownOpen:!isDropDownOpen};

    case 'NO_PRODUCTS_IN_CART' : 
    return {...state , numOfProducsInCart:0}

    case 'CLOSE_DROPDOWN' : 
    return {...state , isDropDownOpen:false}

    case 'EDIT_PRODUCTS_AND_NUMBER_OF_THEM' : 
    return {...state , cartProducts:payload.products , numOfProducsInCart:payload.numOfProducts}

    default : 
    throw new Error('')
  }

}


export const initialCartState = {
  numOfProducsInCart: undefined,
  isDropDownOpen: false,
  cartProducts: []
}

export const cartReducerCases = {
  TOGGLE_DROPDOWN:'TOGGLE_DROPDOWN',
  CLOSE_DROPDOWN:'CLOSE_DROPDOWN',
  NO_PRODUCTS_IN_CART:'NO_PRODUCTS_IN_CART',
  EDIT_PRODUCTS_AND_NUMBER_OF_THEM: 'EDIT_PRODUCTS_AND_NUMBER_OF_THEM'
}