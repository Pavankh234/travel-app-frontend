"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function SearchComponent() {
  const [startDate, setStartDate] = useState(new Date());
  const [searchClicked, setSearchClicked] = useState(false);

  const handleSearchClick = () => {
    setSearchClicked(true);
    // Perform any search-related functionality here
  };

  return (
    <div className='p-5 bg-gray-900 shadow-md rounded-md text-white text-center'>
      {!searchClicked && (
        <div className='mb-4 text-gray-300 font-semibold'>
          <h1 className='text-3xl mb-2'>
            Find your next adventure with us...
          </h1>
          <p className='text-xl'>
            Explore destinations, plan your dates, and travel with ease.
          </p>
        </div>
      )}
      <div className='flex flex-col md:flex-row items-center justify-center space-x-4'>
        <input
          type='text'
          placeholder='Enter place'
          className='p-2 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className='p-2 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <input
          type='number'
          placeholder='Number of people'
          className='p-2 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <Button
          className='bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md'
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default SearchComponent;
