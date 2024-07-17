import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

function Header({ toggleSideBar }) {
  const { user } = useUser()
  return (
    <div className='p-3 flex justify-between shadow-sm bg-gray-900 items-center'>
      <div className='flex items-center'>
        <Image src='/logo.svg' alt='logo' width={200} height={100} style={{ marginRight: '20px' }} />
        <Menu className='md:hidden h-7 w-7 text-white cursor-pointer' onClick={() => toggleSideBar()} />
      </div>
      <div className='flex items-center space-x-4'>
        {!user ? (
          <Link href='/sign-in'>
            <Button className='bg-blue-500 hover:bg-blue-600 shadow-sm text-white'>
              Get Started
            </Button>
          </Link>
        ) : (
          <UserButton afterSignOutUrl='/home' />
        )}
      </div>
    </div>
  )
}

export default Header
