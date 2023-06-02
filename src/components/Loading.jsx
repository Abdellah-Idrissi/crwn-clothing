import loader from '../assets/Infinity-1s-200px (3).svg'

function Loading() {
  return (
    <div className='min-h-screen bg-gray-100 grid place-items-center'>
      <img className='w-[300px]'  src={loader} alt="" />
    </div>
  )
}

export default Loading