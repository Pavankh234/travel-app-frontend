

// "use client";
// import React, { useState } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import Banner from './_components/Banner';
// import { useUser } from '@clerk/nextjs';
// import SearchComponent from './_components/SearchComponent';
// import Trending from './_components/Trending';

// const fetchSearchedLocation = async (query) => {
//   try {
//     const res = await fetch(`http://localhost:8000/api/locations/search?query=${encodeURIComponent(query)}`, {
//       cache: 'no-store',
//     });
//     if (!res.ok) {
//       console.error('Failed to fetch location', res.status, res.statusText);
//       throw new Error('Failed to fetch location');
//     }
//     return res.json();
//   } catch (error) {
//     console.error('Error fetching location:', error);
//     return null;
//   }
// };

// function Home() {
//   const { user } = useUser();
//   const [searchResults, setSearchResults] = useState(null);
//   const router = useRouter();

//   const handleSearch = async (query) => {
//     const result = await fetchSearchedLocation(query);
//     setSearchResults(result);
//   };

//   return (
//     <div className='p-5 pt-20'>
//       {!user ? <Banner /> : null}
//       {user ? (
//         <>
//           <SearchComponent onSearch={handleSearch} />
//           {searchResults ? (
//             <div className="mt-10 flex justify-center">
//               <div className="bg-white rounded-lg shadow-lg overflow-hidden flex w-full">
//                 <div className="relative w-1/3 h-64">
//                   <Image 
//                     src={searchResults.image} 
//                     alt={searchResults.name} 
//                     layout="fill" 
//                     objectFit="cover" 
//                     className="w-full h-full"
//                   />
//                 </div>
//                 <div className="p-6 flex-1">
//                   <h2 className="text-2xl font-semibold">{searchResults.name}</h2>
//                   <p className="text-gray-700 mt-2">{searchResults.description}</p>
//                 </div>
//                 <div className="p-6 flex items-center">
//                   <button
//                     className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                     onClick={() => router.push(`/location/${encodeURIComponent(searchResults.name)}`)}
//                   >
//                     Let's Go
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <Trending />
//           )}
//         </>
//       ) : null}
//     </div>
//   );
// }

// export default Home;



"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import Banner from './_components/Banner';
import { useUser } from '@clerk/nextjs';
import SearchComponent from './_components/SearchComponent';
import Trending from './_components/Trending';

const fetchSearchedLocation = async (query) => {
  try {
    const res = await fetch(`http://localhost:8000/api/locations/search?query=${encodeURIComponent(query)}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error('Failed to fetch location', res.status, res.statusText);
      throw new Error('Failed to fetch location');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
};

function Home() {
  const { user } = useUser();
  const [searchResults, setSearchResults] = useState(null);
  const [clickedHearts, setClickedHearts] = useState({});
  const router = useRouter(); // Initialize the useRouter hook

  const handleSearch = async (query) => {
    const result = await fetchSearchedLocation(query);
    console.log(result);
    setSearchResults(result);
  };

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
      setSearchResults((prevResults) => ({
        ...prevResults,
        stars: updatedLocation.stars,
      }));

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
    <div className='p-5 pt-20'>
      {!user ? <Banner /> : null}
      {user ? (
        <>
          <SearchComponent onSearch={handleSearch} />
          {searchResults ? (
            <div className="mt-10 flex justify-center">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden flex w-full max-w-4xl">
                <div className="relative w-1/3 h-64">
                  <Image 
                    src={searchResults.image} 
                    alt={searchResults.name} 
                    layout="fill" 
                    objectFit="cover" 
                    className="w-full h-full"
                  />
                </div>
                <div className="w-1/3 p-5">
                  <h2 className="text-2xl font-semibold">{searchResults.name}</h2>
                  <p className="text-gray-700 mt-2">{searchResults.other.description}</p>
                  <button
                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => handleLetsGoClick(searchResults.name)}
                  >
                    Let's Go
                  </button>
                </div>
                <div className="w-1/3 flex items-center justify-end p-5">
                  <p className="text-xl mr-2">{searchResults.stars}</p>
                  <FaHeart
                    className={`text-xl cursor-pointer ${clickedHearts[searchResults._id] ? 'text-red-500' : 'text-gray-500'}`}
                    onClick={() => handleHeartClick(searchResults._id)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <Trending />
          )}
        </>
      ) : null}
    </div>
  );
}

export default Home;

