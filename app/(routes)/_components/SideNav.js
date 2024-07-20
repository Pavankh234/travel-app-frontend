// "use client"
// import MenuList from '@/app/_utils/MenuList'
// import { Button } from '@/components/ui/button'
// import { UserButton, useUser } from '@clerk/nextjs'
// import { LogIn } from 'lucide-react'
// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// function SideNav({ toggleSideBar }) {
//   const { user } = useUser()
//   return (
//     <div className='h-full p-5 bg-gray-900 text-gray-300'>
//       <div className='flex flex-col mt-7'>
//         {MenuList.map((item, index) => (
//           <Link href={item.path} key={index} onClick={() => toggleSideBar(false)}>
//             <h2 variant="ghost" 
//               className="group p-4 flex gap-5 items-center
//               justify-start rounded-md cursor-pointer
//               hover:bg-gray-700 text-gray-300">
//               <item.icon className='group-hover:animate-bounce text-gray-300' />
//               {item.name}
//             </h2>
//           </Link>
//         ))}
//       </div>
//       <div className='absolute bottom-10 flex gap-3 items-center'>
//         {!user ? (
//           <Link href='/sign-in'>
//             <Button variant="ghost" className='flex gap-2 items-center cursor-pointer text-gray-300 bg-gray-800 hover:bg-gray-700'>
//               <LogIn className='text-gray-300' />
//               Sign In
//             </Button>
//           </Link>
//         ) : (
//           <div className='flex items-center gap-3'>
//             <UserButton afterSignOutUrl='/home' />
//             <span>Profile</span>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default SideNav

// components/SideNav.js
import MenuList from '@/app/_utils/MenuList'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import { LogIn } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function SideNav({ toggleSideBar }) {
  const { user } = useUser()
  return (
    <div className='fixed top-0 left-0 h-full p-5 bg-gray-900 text-gray-300 w-60 z-40'>
      <div className='flex flex-col mt-16'>
        {MenuList.map((item, index) => (
          <Link href={item.path} key={index} onClick={() => toggleSideBar(false)}>
            <h2 variant="ghost" 
              className="group p-4 flex gap-5 items-center
              justify-start rounded-md cursor-pointer
              hover:bg-gray-700 text-gray-300">
              <item.icon className='group-hover:animate-bounce text-gray-300' />
              {item.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className='absolute bottom-10 flex gap-3 items-center'>
        {!user ? (
          <Link href='/sign-in'>
            <Button variant="ghost" className='flex gap-2 items-center cursor-pointer text-gray-300 bg-gray-800 hover:bg-gray-700'>
              <LogIn className='text-gray-300' />
              Sign In
            </Button>
          </Link>
        ) : (
          <div className='flex items-center gap-3'>
            <UserButton afterSignOutUrl='/home' />
            <span>Profile</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default SideNav
