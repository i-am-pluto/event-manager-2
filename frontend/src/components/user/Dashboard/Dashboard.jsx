import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventCard from './../EventList/EventCard'; 
import { unregisterFromEvent, getRegisteredEvents } from '../../../utils/ApiUtils'; 
import { UserContext } from './../../../UserContext'; 

function Dashboard() {
    const { username } = useParams();
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext); 
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRegisteredEvents();
    }, [user]);

    const fetchRegisteredEvents = async () => {
        if (user) {
            try {
                const events = await getRegisteredEvents(user._id);
                setRegisteredEvents(events);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching registered events:', error);
            }
        }
    };

    const handleUnregister = async (eventId) => {
        try {
            
            await unregisterFromEvent(user._id, eventId);            
            await fetchRegisteredEvents();

            console.log(`User unregistered from event with ID: ${eventId}`);
        } catch (error) {
            console.error('Error while unregistering from event:', error);
        }
    };

    const handleLogout = () => {
        setUser(null); 
        navigate('/login'); 
    };

    const goToAdminPage = () => {
        navigate('/admin');
    };

    if (!user) {
        return <p>Loading... Please log in again.</p>; 
    }

    if (loading) {
        return <p>Loading events...</p>; 
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">Hello, {user.username}</h2>

                    <div className="space-x-4">
                        {/* Show Admin button if the user is an admin */}
                        {user.isAdmin && (
                            <button
                                onClick={goToAdminPage}
                                className="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700 transition duration-300"
                            >
                                Admin Page
                            </button>
                        )}

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="bg-gray-600 text-white font-bold py-2 px-6 rounded hover:bg-gray-700 transition duration-300"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Registered Events */}
                <h3 className="text-xl font-bold text-gray-700 mb-4">Your Registered Events</h3>
                <div className="space-y-6">
                    {registeredEvents.length > 0 ? (
                        registeredEvents.map(event => (
                            <div key={event._id} className="relative">
                                <EventCard event={event} />
                                {/* Unregister Button */}
                                <button
                                    onClick={() => handleUnregister(event._id)}
                                    className="absolute top-4 right-4 bg-red-500 text-white font-bold py-1 px-4 rounded hover:bg-red-600 transition duration-300"
                                >
                                    Unregister
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">You have not registered for any events yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
