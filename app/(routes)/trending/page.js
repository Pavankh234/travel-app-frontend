// // app/routes/trending/page.js
// import Image from 'next/image';
// import { FaStar } from 'react-icons/fa'; // Import the star icon from react-icons
// import { FaHeart } from 'react-icons/fa';

// const fetchTopLocations = async () => {
//   try {
//     const res = await fetch('http://localhost:8000/api/locations/top', {
//       cache: 'no-store',
//     });
//     if (!res.ok) {
//       console.error('Failed to fetch top locations', res.status, res.statusText);
//       throw new Error('Failed to fetch top locations');
//     }
//     return res.json();
//   } catch (error) {
//     console.error('Error fetching locations:', error);
//     return [];
//   }
// };

// const Trending = async () => {
//   const locations = await fetchTopLocations();

//   return (
//     <div className="p-5 pt-20">
//       <h1 className="text-3xl font-bold mb-5">Top Trending Places</h1>
//       {locations.length === 0 ? (
//         <p className="text-lg">No trending places available.</p>
//       ) : (
//         <div className="max-h-screen overflow-y-auto">
//           <ul className="list-none p-0">
//             {locations.map((location) => (
//               <li key={location._id} className="mb-5 flex items-center border rounded-lg shadow-xl overflow-hidden">
//                 <div className="w-1/3">
//                   <Image src={location.image} alt={location.name} width={200} height={150} objectFit="cover" className="w-full h-full"/>
//                 </div>
//                 <div className="w-1/3 p-5">
//                   <h2 className="text-2xl font-semibold">{location.name}</h2>
//                   <p className="text-l mt-2">{location.other.description}</p>
//                   <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded">Let's Go</button>
//                 </div>
//                 <div className="w-1/3 flex items-center justify-end p-5">
//                   <p className="text-xl mr-2">{location.stars}</p>
//                   <FaHeart className="text-red-500 text-xl" />
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Trending;


// app/routes/trending/page.js

"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
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
  const router = useRouter(); // Initialize the useRouter hook

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
    router.push(`/location/${encodeURIComponent(name)}`); // Navigate to the new route with the location name
  };

  return (
    <div className="p-5 pt-20">
      <h1 className="text-3xl font-bold mb-5">Top Trending Places</h1>
      {locations.length === 0 ? (
        <p className="text-lg">No trending places available.</p>
      ) : (
        <div className="max-h-screen overflow-y-auto">
          <ul className="list-none p-0">
            {locations.map((location) => (
              <li key={location._id} className="mb-5 flex items-center border rounded-lg shadow-xl overflow-hidden">
                <div className="w-1/3">
                  <Image src={location.image} alt={location.name} width={200} height={150} objectFit="cover" className="w-full h-full" />
                </div>
                <div className="w-1/3 p-5">
                  <h2 className="text-2xl font-semibold">{location.name}</h2>
                  <p className="text-l mt-2">{location.other.description}</p>
                  <button
                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => handleLetsGoClick(location.name)}
                  >
                    Let's Go
                  </button>
                </div>
                <div className="w-1/3 flex items-center justify-end p-5">
                  <p className="text-xl mr-2">{location.stars}</p>
                  <FaHeart
                    className={`text-xl cursor-pointer ${clickedHearts[location._id] ? 'text-red-500' : 'text-gray-500'}`}
                    onClick={() => handleHeartClick(location._id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Trending;

