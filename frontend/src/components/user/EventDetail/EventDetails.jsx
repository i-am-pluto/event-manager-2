import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById, registerForEvent, getRegisteredEvents } from '../../../utils/ApiUtils'; // Import the API methods
import { UserContext } from './../../../UserContext'; // Import UserContext for user info

function EventDetails() {
  const { id } = useParams();
  const { user } = useContext(UserContext); // Get the logged-in user from context
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false); // State to track if the user is already registered

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const fetchedEvent = await getEventById(id);
        setEvent(fetchedEvent);
        
        if (user) {
          // Check if the event is in the user's registeredEvents array
          console.log(user.registeredEvents, fetchedEvent._id);
          const alreadyRegistered = ((await getRegisteredEvents(user._id)).map((event) => event._id )).includes(fetchedEvent._id);
          console.log("already registered - ",alreadyRegistered, await getRegisteredEvents(user._id));
          setIsRegistered(alreadyRegistered);
        }
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Event not found');
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id, user]);

  const handleRegister = async () => {
    if (!user) {
      alert('Please log in to register for the event.');
      return;
    }
    try {
      await registerForEvent(user._id, event._id); // Call API to register for the event
      alert('Successfully registered for the event!');
      setIsRegistered(true); // Disable the button after registering
    } catch (err) {
      console.error('Error registering for event:', err);
      alert('Failed to register for the event.');
    }
  };

  const handleShare = () => {
    const eventUrl = window.location.href; // Get the current URL

    if (navigator.share) {
      navigator.share({
        title: event.name,
        text: `Check out this event: ${event.name}`,
        url: eventUrl,
      })
        .then(() => console.log('Event shared successfully!'))
        .catch((error) => console.error('Error sharing event:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(eventUrl)
        .then(() => alert('Event URL copied to clipboard!'))
        .catch((error) => console.error('Error copying URL to clipboard:', error));
    }
  };

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <h2 className="text-center text-3xl font-bold mt-8">{error}</h2>;
  }

  if (!event) {
    return <h2 className="text-center text-3xl font-bold mt-8">Event not found</h2>;
  }

  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString('default', { month: 'long' });
  const year = eventDate.getFullYear();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="relative w-full h-96 bg-gray-300 mb-8">
        <img src={event.thumbnail} alt={`${event.name} cover`} className="object-cover w-full h-full rounded-lg shadow-lg" />
      </div>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{event.name}</h2>

        <p className="text-lg text-gray-600 mb-6">{`${day} ${month} ${year}`}</p>

        <p className="text-gray-700 text-lg mb-8">{event.description}</p>

        <div className="h-64 bg-gray-200 rounded-lg mb-8 flex items-center justify-center">
          <img src='https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg' alt='Map' className='object-cover w-full h-full rounded-lg' />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleRegister}
            disabled={isRegistered} // Disable button if the user is already registered
            className={`${
              isRegistered ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-bold py-2 px-6 rounded transition duration-300`}
          >
            {isRegistered ? 'Already Registered' : 'Register'}
          </button>

          <button 
            onClick={handleShare} 
            className="bg-gray-700 text-white font-bold py-2 px-6 rounded hover:bg-gray-800 transition duration-300"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;