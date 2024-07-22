"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';

const fetchTopLocations = async () => {
  try {
    const res = await fetch('http://localhost:8000/api/locations/top', {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error('Failed to fetch top locations', res.status, res.statusText);
      throw new Error('Failed to fetch top locations');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
};

const Trending = () => {
  const [locations, setLocations] = useState([]);
  const [clickedHearts, setClickedHearts] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTopLocations();
      setLocations(data);
    };
    fetchData();
  }, []);

  const handleHeartClick = async (id) => {
    const isClicked = clickedHearts[id];
    const increment = isClicked ? -1 : 1;

    try {
      const res = await fetch(`http://localhost:8000/api/locations/${id}/stars`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ increment }),
      });

      if (!res.ok) {
        console.error('Failed to update star count', res.status, res.statusText);
        throw new Error('Failed to update star count');
      }

      const updatedLocation = await res.json();
      setLocations((prevLocations) =>
        prevLocations.map((location) =>
          location._id === id ? updatedLocation : location
        )
      );

      setClickedHearts((prevClickedHearts) => ({
        ...prevClickedHearts,
        [id]: !isClicked,
      }));
    } catch (error) {
      console.error('Error updating star count:', error);
    }
  };

  const handleLetsGoClick = (name) => {
    router.push(`/location/${encodeURIComponent(name)}`);
  };

  return (
    <div className="p-5 pt-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Top Trending Places</h1>
      {locations.length === 0 ? (
        <p className="text-lg text-center">No trending places available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location) => (
            <div key={location._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative w-full h-48">
                <Image src={location.image} alt={location.name} layout="fill" objectFit="cover" className="w-full h-full"/>
              </div>
              <div className="p-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">{location.name}</h2>
                <button
                  className="ml-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => handleLetsGoClick(location.name)}
                >
                  Let's Go
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trending;
