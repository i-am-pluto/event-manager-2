import React, { useState, useEffect } from 'react';
import EventCard from './EventCard'; 
import { getAllEvents } from '../../../utils/ApiUtils'; 

function EventList() {
  const [events, setEvents] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getAllEvents(); 
        setEvents(fetchedEvents); 
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to fetch events'); 
      } finally {
        setLoading(false); 
      }
    };
    fetchEvents(); 
  }, []);

  if (loading) {
    return <p>Loading events...</p>; 
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; 
  }

  return (
    <div className="event-list-container p-4">
      <h2 className="text-3xl font-bold text-center mb-8">All Events</h2>
      <div className="space-y-6">
        {events.length > 0 ? (
          events.map(event => (
            <EventCard key={event._id} event={event} /> 
          ))
        ) : (
          <p>No events found</p> 
        )}
      </div>
    </div>
  );
}

export default EventList;
