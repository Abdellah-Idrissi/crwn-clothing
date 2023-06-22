import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { useSelector } from "react-redux"

export default function Shop() {

  let {products} = useSelector(state=> state.products)

  return (
    <div>

      {
        Object.entries(products).map(category=> {
          let [title,categoryProducts] = category

          return (
            <div key={title} className="my-16">
              <p  className="uppercase text-[30px] mb-4 block font-semibold text-center"><Link to={`${title}`}>{title}</Link> </p>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                { categoryProducts.map((product,index)=> index < 4 && <ProductCard key={product.id} product={product}/>) }
              </div>

            </div>
          )
        })
      }

    </div>
  )
}