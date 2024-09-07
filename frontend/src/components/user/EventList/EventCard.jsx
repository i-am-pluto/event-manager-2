import React from 'react';
import { Link } from 'react-router-dom';

function EventCard({ event, showDate = true, actionButton, actionButtonText = '' }) {
  return (
    <div className="group block w-full max-w-lg mx-auto relative">
      <Link to={`/events/${event._id}`} className="block">
        <div className="relative flex items-center h-48 bg-gray-200 rounded-lg shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105">
          <div
            className="w-1/2 h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${event.thumbnail})` }}
          ></div>

          <div className="w-1/2 p-4 bg-white h-full flex flex-col justify-center">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition duration-300">
              {event.name}
            </h3>
            {showDate && (
              <p className="text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
            )}
            <p className="text-gray-700 mt-2 truncate">{event.description}</p>
          </div>
        </div>
      </Link>

      {actionButton && (
        <button
          onClick={() => actionButton(event._id)}
          className="absolute top-4 right-4 bg-red-500 text-white font-bold py-1 px-4 rounded hover:bg-red-600 transition duration-300"
        >
          {actionButtonText}
        </button>
      )}
    </div>
  );
}

export default EventCard;
