import axios from 'axios';

// API URLs
const BASE_URL = 'http://localhost:5000/api';
const USERS_URL = `${BASE_URL}/users`;
const EVENTS_URL = `${BASE_URL}/events`;
const ADMIN_URL = `${BASE_URL}/admin`;

/**
 * Login or register a new user.
 * @param {string} username - The username of the user.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} - The response from the API.
 */
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${USERS_URL}/login`, {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in or registering user:', error);
        throw error;
    }
};

/**
 * Register the user for an event.
 * @param {string} userId - The ID of the user.
 * @param {string} eventId - The ID of the event.
 * @returns {Promise<Object>} - The response from the API.
 */
export const registerForEvent = async (userId, eventId) => {
    try {
        const response = await axios.post(`${USERS_URL}/${userId}/register`, {
            eventId,
        });
        return response.data;
    } catch (error) {
        console.error('Error registering for event:', error);
        throw error;
    }
};

/**
 * Unregister the user from an event.
 * @param {string} userId - The ID of the user.
 * @param {string} eventId - The ID of the event.
 * @returns {Promise<Object>} - The response from the API.
 */
export const unregisterFromEvent = async (userId, eventId) => {
    try {
        const response = await axios.post(`${USERS_URL}/${userId}/unregister`, {
            eventId,
        });
        return response.data;
    } catch (error) {
        console.error('Error unregistering from event:', error);
        throw error;
    }
};

/**
 * Fetch all events.
 * @returns {Promise<Array>} - A list of all events.
 */
export const getAllEvents = async () => {
    try {
        const response = await axios.get(EVENTS_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching all events:', error);
        throw error;
    }
};

/**
 * Filter events by month and year.
 * @param {number} month - The month (1-12) to filter events.
 * @param {number} year - The year (YYYY) to filter events.
 * @returns {Promise<Array>} - A list of filtered events.
 */
export const filterEventsByMonthYear = async (month, year) => {
    try {
        const response = await axios.get(`${EVENTS_URL}/filter`, {
            params: {
                month,
                year,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error filtering events by month and year:', error);
        throw error;
    }
};

/**
 * Fetch a specific event by its ID.
 * @param {string} eventId - The ID of the event.
 * @returns {Promise<Object>} - The event details.
 */
export const getEventById = async (eventId) => {
    try {
        const response = await axios.get(`${EVENTS_URL}/${eventId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching event by ID:', error);
        throw error;
    }
};

/**
 * Add a new event (Admin only).
 * @param {Object} eventData - The event details (name, description, date, thumbnail).
 * @returns {Promise<Object>} - The response from the API.
 */
export const addEvent = async (eventData) => {
    try {
        const response = await axios.post(`${ADMIN_URL}/add`, eventData);
        return response.data;
    } catch (error) {
        console.error('Error adding new event:', error);
        throw error;
    }
};

/**
 * Remove an event by its ID (Admin only).
 * @param {string} eventId - The ID of the event to remove.
 * @returns {Promise<Object>} - The response from the API.
 */
export const removeEvent = async (eventId) => {
    try {
        const response = await axios.delete(`${ADMIN_URL}/remove/${eventId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing event:', error);
        throw error;
    }
};

/**
 * Fetch all events a user has registered for.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} - A list of events the user is registered for.
 */
export const getRegisteredEvents = async (userId) => {
    try {
        const response = await axios.get(`${USERS_URL}/${userId}/events`);
        return response.data.events; // Returning the events array from the response
    } catch (error) {
        console.error('Error fetching registered events:', error);
        throw error;
    }
};