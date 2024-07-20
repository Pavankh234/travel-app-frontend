// // app/routes/trending/page.js
// import Image from 'next/image';
// import { FaStar } from 'react-icons/fa'; // Import the star icon from react-icons

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
//     <div className="p-5">
//       <h1 className="text-3xl font-bold mb-5">Top Trending Places</h1>
//       {locations.length === 0 ? (
//         <p className="text-lg">No trending places available.</p>
//       ) : (
//         <ul className="list-none p-0">
//           {locations.map((location) => (
//             <li key={location._id} className="mb-5 flex items-center border rounded-lg shadow-xl overflow-hidden">
//               <div className="w-1/3">
//                 <Image src={location.image} alt={location.name} width={200} height={150} objectFit="cover" className="w-full h-full"/>
//               </div>
//               <div className="w-1/3 p-5">
//                 <h2 className="text-2xl font-semibold">{location.name}</h2>
//               </div>
//               <div className="w-1/3 flex items-center justify-end p-5">
//                 <p className="text-lg mr-2">{location.stars}</p>
//                 <FaStar className="text-yellow-500" />
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Trending;


// app/routes/trending/page.js
import Image from 'next/image';
import { FaStar } from 'react-icons/fa'; // Import the star icon from react-icons

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

const Trending = async () => {
  const locations = await fetchTopLocations();

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
                  <Image src={location.image} alt={location.name} width={200} height={150} objectFit="cover" className="w-full h-full"/>
                </div>
                <div className="w-1/3 p-5">
                  <h2 className="text-2xl font-semibold">{location.name}</h2>
                </div>
                <div className="w-1/3 flex items-center justify-end p-5">
                  <p className="text-lg mr-2">{location.stars}</p>
                  <FaStar className="text-yellow-500" />
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
