import { Link } from 'react-router-dom'


export default function Categories ()  {
  const categories = [
    {
      "id": 1,
      "title": "hats",
      "imageUrl": "https://i.ibb.co/cvpntL1/hats.png",
    },
    {
      "id": 2,
      "title": "jackets",
      "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png",
    },
    {
      "id": 3,
      "title": "sneakers",
      "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png",
    },
    {
      "id": 4,
      "title": "womens",
      "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png",
    },
    {
      "id": 5,
      "title": "mens",
      "imageUrl": "https://i.ibb.co/R70vBrQ/men.png",
    }
  ]


  return (
    <div>

      <div className='flex flex-wrap gap-4'>
      {
        categories.map(category=> (
          <Link key={category.id} to={`/shop/${category.title}`} className='category overflow-hidden relative cursor-pointer w-full md:w-[30%] h-[240px] grow border group border-black rounded-lg'>
            <div style={{backgroundImage: `url(${category.imageUrl})`}} className='w-full h-full bg-center bg-cover group-hover:scale-105 ease-linear duration-200'></div>
            <div className='center bg-white opacity-80  p-4 rounded-md text-center uppercase min-w-[120px] ease-linear duration-200 group-hover:opacity-90'>
              <h2 className='font-[700] mb-[10px] text-[20px] text-[#353434] tracking-tight'>{category.title}</h2>
              <p className='text-[14px] tracking-tighter '>shop now</p>
            </div>
          </Link>
        ))
      }
      </div>

    </div>
  )

}
