"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const vehicleImages = {
    TwoWheeler: '/scootycolored.png',
    FourSeater: '/car4colored.png',
    SevenSeater: '/car7colored.png',
    TempoTraveller: '/ttcolored.png',
    MiniBus: '/minibuscolored.png',
    Bus: '/buscolored.png'
};

const TravelAgencyDetailPage = () => {
    const { id } = useParams();
    const [agency, setAgency] = useState(null);
    const [bookings, setBookings] = useState({}); // To store booking quantities

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

    const handleBookingChange = (type, value) => {
        setBookings(prev => ({ ...prev, [type]: value }));
    };

    const handleBookingSubmit = async (type) => {
        const quantity = bookings[type] || 0;
        if (quantity <= 0) return;
    
        // Assuming you have the user's ID and location in your component's state or props
        const userId = '66974795e579adf60e07dfd1'; // Replace with actual user ID
        const location = agency.Location; // Location from the agency details
    
        try {
            const response = await fetch(`http://localhost:8000/api/travel-agencies/book/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type, quantity, userId, location }),
            });
            const data = await response.json();
    
            if (data.success) {
                toast.success('Booking confirmed!');
                // Reload the page after a short delay to ensure the toast shows first
                setTimeout(() => {
                    window.location.reload();
                }, 1000); // Adjust this delay as needed
            } else {
                toast.error('Booking failed: ' + data.message);
            }
        } catch (error) {
            toast.error('Error during booking');
        }
    };
    

    if (!agency) {
        return <p>Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 pt-20">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg flex">
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
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Quantity"
                                    className="border p-2 rounded-lg w-full mb-2"
                                    onChange={(e) => handleBookingChange(type, e.target.value)}
                                />
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                    onClick={() => handleBookingSubmit(type)}
                                >
                                    Book
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer 
               position="bottom-right"
               autoClose={1000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="dark"
            />
        </div>
    );
};

export default TravelAgencyDetailPage;
