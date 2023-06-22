import chad from "../assets/shad.jpg"


export default function Contact () {

  return (
    <div className="flex gap-x-5 items-center bg-red-500 py-4">

      <div className="text-[24px] w-1/2">
        <p>YO TEST TEST HERE</p>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima odit beatae at dolorum molestias ut doloribus molestiae iure, debitis, voluptatem rem aliquam ipsa. Aspernatur beatae, aperiam officiis quam commodi sequi!</h1>
      </div>

      <div className="w-1/2">
        <img src={chad} alt="" className="object-contain h-[300px]" />
      </div>

    </div>

  )
}





