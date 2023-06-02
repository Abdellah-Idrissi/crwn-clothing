import { collection, getDocs } from "firebase/firestore"
import { createContext, useContext, useEffect, useState } from "react"
import { Outlet, useLoaderData } from "react-router-dom"
import { db } from "../../firebase.js"


const productsContext = createContext()

export default function ProductsContext() {
  let data = useLoaderData()
  let [products,setProducts] = useState(data)

  useEffect(()=> {
    let fetchCategories = async ()=> {
      let collectionRef = collection(db,'categories')

      let response = await getDocs(collectionRef)
    
      let documents = response.docs
    
      let data = documents.reduce((finalObj,document)=> {
        let {title,items} = document.data()
    
        finalObj[title.toLowerCase()] = items
    
        return finalObj
      },{})

      setProducts(data)
    }

    fetchCategories()

  },[])


  return (
    <productsContext.Provider value={products}>
      <Outlet/>
    </productsContext.Provider>
  )
}

export const useProductsContext = ()=> useContext(productsContext)


