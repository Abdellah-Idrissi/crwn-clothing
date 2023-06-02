import { useParams } from "react-router-dom"
import { useProductsContext } from "../contexts/ProductsContext"
import ProductCard from "../components/ProductCard"

export default function Category() {

  let {category} = useParams()

  let categories = useProductsContext()

  let categoryProducts = categories[category]


  return (
    <div> 

      <h2 className="my-5 text-[30px] font-semibold"> <span className="capitalize">{category}</span> categorie</h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {categoryProducts.map(product=> <ProductCard key={product.id} product={product}/>)}
      </div>
    
    </div>
  )
}


