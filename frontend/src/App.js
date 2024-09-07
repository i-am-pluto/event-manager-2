import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import EventList from './components/user/EventList/EventList';
import FilterEvents from './components/user/FilterEvents/FilterEvents';
import EventDetails from './components/user/EventDetail/EventDetails';
import Navbar from './components/navbar/Navbar';
import Login from './components/Login/Login';
import Dashboard from './components/user/Dashboard/Dashboard';
import AdminPage from './components/admin/Admin';
import { UserProvider } from './UserContext'; // Import UserProvider

function App() {
  return (
    <UserProvider> {/* Wrap your app with UserProvider */}
      <Router>
        <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/events" />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/events/filter" element={<FilterEvents />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/:id" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
