"use client"
import React from 'react'
import Banner from './_components/Banner'
import { useUser } from '@clerk/nextjs'
import SearchComponent from './_components/SearchComponent'

function Home() {
  const { user } = useUser()
  return (
    <div className='p-5'>
      {!user ? <Banner /> : null}
      <SearchComponent />
    </div>
  )
}

export default Home
