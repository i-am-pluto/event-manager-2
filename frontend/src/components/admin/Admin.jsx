import React, { useState, useEffect } from 'react';
import EventCard from './../user/EventList/EventCard'; // Reuse EventCard component
import { getAllEvents, removeEvent, addEvent } from '../../utils/ApiUtils'; // Import the API methods

function AdminPage() {
    const [events, setEvents] = useState([]); // State to store event list
    const [newEvent, setNewEvent] = useState({
        name: '',
        description: '',
        day: '',
        month: '',
        year: '',
        thumbnail: '',
    });

    const fetchEvents = async () => {
        try {
            const fetchedEvents = await getAllEvents();
            setEvents(fetchedEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // Handle delete event
    const handleDelete = async (eventId) => {
        try {
            await removeEvent(eventId); // Call the backend to delete the event
            await fetchEvents(); // Fetch the updated list of events
            console.log(`Deleted event with ID: ${eventId}`);
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    // Handle add event form submission
    const handleAddEvent = async (e) => {
        e.preventDefault();

        const newEventData = {
            name: newEvent.name,
            description: newEvent.description,
            date: `${newEvent.year}-${newEvent.month}-${newEvent.day}`,
            thumbnail: newEvent.thumbnail || 'https://via.placeholder.com/250',
        };

        try {
            const addedEvent = await addEvent(newEventData);

            fetchEvents();
            setNewEvent({
                name: '',
                description: '',
                day: '',
                month: '',
                year: '',
                thumbnail: '',
            });

            console.log('Added new event:', addedEvent);
        } catch (error) {
            console.error('Error adding new event:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Add New Event</h2>
                <form onSubmit={handleAddEvent} className="space-y-4 mb-8">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Event Name</label>
                        <input
                            type="text"
                            value={newEvent.name}
                            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                            required
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Event Name"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Event Description</label>
                        <textarea
                            value={newEvent.description}
                            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                            required
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Event Description"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Day</label>
                            <input
                                type="number"
                                value={newEvent.day}
                                onChange={(e) => setNewEvent({ ...newEvent, day: e.target.value })}
                                required
                                min="1"
                                max="31"
                                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
                                placeholder="Day"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Month</label>
                            <input
                                type="number"
                                value={newEvent.month}
                                onChange={(e) => setNewEvent({ ...newEvent, month: e.target.value })}
                                required
                                min="1"
                                max="12"
                                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
                                placeholder="Month"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Year</label>
                            <input
                                type="number"
                                value={newEvent.year}
                                onChange={(e) => setNewEvent({ ...newEvent, year: e.target.value })}
                                required
                                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
                                placeholder="Year"
                            />
                        </div>
                    </div>

                    {/* Event Thumbnail */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Thumbnail URL</label>
                        <input
                            type="text"
                            value={newEvent.thumbnail}
                            onChange={(e) => setNewEvent({ ...newEvent, thumbnail: e.target.value })}
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Thumbnail URL (optional)"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Add Event
                    </button>
                </form>

                <h3 className="text-xl font-bold text-gray-700 mb-4">All Events</h3>
                <div className="space-y-6">
                    {events.map(event => (
                        <div key={event._id} className="relative">
                            <EventCard event={event} />
                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(event._id)}
                                className="absolute top-4 right-4 bg-red-500 text-white font-bold py-1 px-4 rounded hover:bg-red-600 transition duration-300"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
