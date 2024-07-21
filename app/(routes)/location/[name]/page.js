
// "use client";

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';

// const LocationPage = ({ params }) => {
//     const { name } = params;
//     const [agencies, setAgencies] = useState([]);

//     useEffect(() => {
//         async function fetchAgencies() {
//             try {
//                 const response = await fetch(`http://localhost:8000/api/travel-agencies/${name}`);
//                 const data = await response.json();
//                 setAgencies(data);
//             } catch (error) {
//                 console.error('Error fetching agencies:', error);
//             }
//         }

//         fetchAgencies();
//     }, [name]);

//     return (
//         <div className="min-h-screen bg-gray-100 p-6">
//             <h1 className="text-4xl font-bold text-center mb-6">{name}</h1>
//             <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//                 {agencies.map((agency) => (
//                     <div key={agency._id} className="bg-white p-4 rounded-lg shadow-lg">
//                         {agency.Image && (
//                             <div className="relative w-full h-48 mb-4">
//                                 <Image
//                                     src={agency.Image}
//                                     alt={agency.AgencyName}
//                                     layout="fill"
//                                     objectFit="cover"
//                                     className="rounded-t-lg"
//                                 />
//                             </div>
//                         )}
//                         <h2 className="text-2xl font-semibold">{agency.AgencyName}</h2>
//                         <p><strong>Owner:</strong> {agency.OwnerName}</p>
//                         <p><strong>Contact:</strong> {agency.ContactNumber}</p>
//                         <p><strong>Email:</strong> {agency.Email}</p>
//                         <p><strong>Location:</strong> {agency.Location}</p>
//                         <div className="mt-4">
//                             <h3 className="text-lg font-semibold">Vehicle Types:</h3>
//                             <ul>
//                                 {Object.entries(agency.VehicleTypes).map(([type, { count, price }]) => (
//                                     <li key={type}>
//                                         {type.replace(/([A-Z])/g, ' $1').trim()}: {count} vehicles at ${price} each
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default LocationPage;

"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LocationPage = ({ params }) => {
    const { name } = params;
    const [agencies, setAgencies] = useState([]);
    const router = useRouter();

    // Decode the location name
    const decodedName = decodeURIComponent(name);

    useEffect(() => {
        async function fetchAgencies() {
            try {
                const response = await fetch(`http://localhost:8000/api/travel-agencies/${name}`);
                const data = await response.json();
                setAgencies(data);
            } catch (error) {
                console.error('Error fetching agencies:', error);
            }
        }

        fetchAgencies();
    }, [name]);

    return (
        <div className="min-h-screen bg-gray-100 p-6 pt-20">
            <h1 className="text-4xl font-bold text-center mb-6">{decodedName}</h1>
            <div className="space-y-6">
                {agencies.map((agency) => (
                    <div key={agency._id} className="flex items-center bg-white p-4 rounded-lg shadow-lg">
                        {agency.Image && (
                            <div className="relative w-1/3 h-48 flex-shrink-0">
                                <Image
                                    src={agency.Image}
                                    alt={agency.AgencyName}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-l-lg"
                                />
                            </div>
                        )}
                        <div className="flex-1 p-4 pl-10">
                            <h2 className="text-3xl font-semibold mb-2">{agency.AgencyName}</h2>
                            <p className="text-xl"><strong>Contact:</strong> {agency.ContactNumber}</p>
                        </div>
                        <div className="flex-shrink-0 pr-10">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                                onClick={() => router.push(`/agency/${agency._id}`)}
                            >
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationPage;
