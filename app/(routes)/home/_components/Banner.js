

// import { useState, useEffect } from 'react'
// import { Button } from '@/components/ui/button'
// import Link from 'next/link'
// import Image from 'next/image'

// function Banner() {
//   const [currentIndex, setCurrentIndex] = useState(0)

//   const images = [
//     '/image1.jpg',
//     '/image2.jpg',
//     '/image3.jpg',
//     '/image4.jpg',
//     '/image5.jpg',
//     '/image6.jpg',
//     '/image7.jpg',
//     '/image8.jpg',
//     '/image9.jpg',
//     '/image10.jpg'
//   ]

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
//     }, 2000)

//     return () => clearInterval(interval) // Cleanup interval on component unmount
//   }, [images.length])

//   const nextImage = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
//   }

//   const prevImage = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
//   }

//   return (
//     <div className='w-full h-full p-4 bg-blue-100 rounded-xl shadow-sm flex flex-col items-center justify-center'>
//       <div className='text-center mb-4'>
//         <h2 className='font-bold text-2xl mb-2'>WELCOME TO SOCIAL PANDA</h2>
//         <h2 className='mb-4'>Join the Community, Create, and Share Your Thoughts</h2>
//       </div>
      
//       {/* Image Slider */}
//       <div className='relative w-full max-w-2xl h-64 overflow-hidden mb-4'>
//         <div className='flex transition-transform duration-500' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
//           {images.map((src, index) => (
//             <div key={index} className='w-full flex-shrink-0'>
//               <Image src={src} alt={`Slide ${index}`} width={400} height={400} className='w-full h-full object-cover' />
//             </div>
//           ))}
//         </div>
//         <button onClick={prevImage} className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full'>
//           Prev
//         </button>
//         <button onClick={nextImage} className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full'>
//           Next
//         </button>
//       </div>

//       <Link href='/sign-in'>
//         <Button className='bg-blue-500'>Get Started</Button>
//       </Link>
//     </div>
//   )
// }

// export default Banner
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = [
    '/image1.jpg',
    '/image2.jpg',
     '/image3.jpg',
    '/image4.jpg',
    '/image5.jpg',
    '/image6.jpg',
    '/image7.jpg',
    '/image8.jpg',
    '/image9.jpg',
    '/image10.jpg'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 2000)

    return () => clearInterval(interval) // Cleanup interval on component unmount
  }, [images.length])

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className='w-full h-full p-4 bg-blue-100 rounded-xl shadow-sm flex flex-col items-center justify-center'>
      <div className='text-center mb-4'>
        <h2 className='font-bold text-2xl mb-2'>WELCOME TO SANCHAARI </h2>
        <h2 className='mb-4'>YOUR ONE STOP SOLUTION TO DREAM DESTINATIONS</h2>
      </div>
      
      {/* Image Slider */}
      <div className='relative w-full max-w-2xl h-96 overflow-hidden mb-4'>
        <div className='flex transition-transform duration-500' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((src, index) => (
            <div key={index} className='w-full flex-shrink-0'>
              <Image src={src} alt={`Slide ${index}`} width={1200} height={600} className='w-full h-full object-cover' />
            </div>
          ))}
        </div>
        <button onClick={prevImage} className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full'>
          Prev
        </button>
        <button onClick={nextImage} className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full'>
          Next
        </button>
      </div>

      <Link href='/sign-in'>
        <Button className='bg-blue-500'>Get Started</Button>
      </Link>
    </div>
  )
}

export default Banner




