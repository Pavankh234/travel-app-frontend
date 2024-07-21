"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const vehicleImages = {
    TwoWheeler: '/scootycolored.png',
    FourSeater: '/car4colored.png',
    SevenSeater: '/car7colored.png',
    TempoTraveller: '/ttcolored.png',
    MiniBus: '/minibuscolored.png',
    Bus: '/buscolored.png'
};

const TravelAgencyDetailPage = () => {
    const { id } = useParams(); // Get the agency ID from the URL
    const [agency, setAgency] = useState(null);

    useEffect(() => {
        async function fetchAgency() {
            try {
                const response = await fetch(`http://localhost:8000/api/travel-agencies/detail/${id}`);
                const data = await response.json();
                setAgency(data);
            } catch (error) {
                console.error('Error fetching agency details:', error);
            }
        }

        fetchAgency();
    }, [id]);

    if (!agency) {
        return <p>Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 pt-20">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg flex">
                {/* Image and Details Section */}
                <div className="flex-shrink-0 w-1/3 relative h-64">
                    {agency.Image && (
                        <Image
                            src={agency.Image}
                            alt={agency.AgencyName}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    )}
                </div>
                <div className="flex-1 pl-6">
                    <h1 className="text-4xl font-bold mb-4">{agency.AgencyName}</h1>
                    <p className="text-lg mb-2"><strong>Owner:</strong> {agency.OwnerName}</p>
                    <p className="text-lg mb-2"><strong>Contact:</strong> {agency.ContactNumber}</p>
                    <p className="text-lg mb-4"><strong>Email:</strong> {agency.Email}</p>
                    <p className="text-lg mb-4"><strong>Location:</strong> {agency.Location}</p>
                </div>
            </div>
            
            <div className="mt-6">
                <h2 className="text-3xl font-semibold mb-4">Vehicle Types</h2>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(agency.VehicleTypes).map(([type, { count, price }]) => (
                        <div key={type} className="bg-white p-4 rounded-lg shadow-lg flex items-center">
                            {/* Vehicle Image */}
                            <div className="flex-shrink-0 w-20 h-20 relative">
                                <Image
                                    src={vehicleImages[type] || '/default.png'}
                                    alt={type}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="ml-4 flex-1">
                                <h3 className="text-xl font-semibold mb-1">{type.replace(/([A-Z])/g, ' $1').trim()}</h3>
                                <p className="text-lg mb-1">Price: ${price}</p>
                                <p className="text-lg">Available: {count}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TravelAgencyDetailPage;
