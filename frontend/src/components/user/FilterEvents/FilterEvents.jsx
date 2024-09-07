import React, { useState } from 'react';
import EventCard from './../EventList/EventCard'; 
import { filterEventsByMonthYear } from '../../../utils/ApiUtils'; 


const months = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

function FilterEvents() {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  const handleSearch = async () => {
    if (!month || !year) {
      setError('Please select both month and year.');
      return;
    }
    setLoading(true);
    setError('');
    
    try {
      const events = await filterEventsByMonthYear(month, year); 
      setFilteredEvents(events);
    } catch (error) {
      console.error('Error filtering events:', error);
      setError('Failed to fetch events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Filter Events</h2>        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="flex flex-col">
            <label htmlFor="month" className="text-gray-700 font-medium mb-2">Select Month</label>
            <select
              id="month"
              name="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a month</option>
              {months.map((monthOption) => (
                <option key={monthOption.value} value={monthOption.value}>
                  {monthOption.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="year" className="text-gray-700 font-medium mb-2">Select Year</label>
            <input
              type="number"
              id="year"
              name="year"
              placeholder="Year (e.g., 2024)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700 transition duration-300 mb-8"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
        <div className="space-y-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => <EventCard key={event._id} event={event} />)
          ) : (
            !loading && <p className="text-gray-500">No events found for the selected month and year.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterEvents;
