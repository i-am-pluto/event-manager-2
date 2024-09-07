import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';

function Navbar() {

    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        console.log('User in Navbar:', user);
    }, [user]);

    return (
        <nav className="bg-gray-900 shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300 transition duration-300">
                            EventManager
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <ul className="flex space-x-4">
                            <li>
                                <Link to="/events" className="text-gray-300 hover:text-white font-medium transition duration-300">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/events/filter" className="text-gray-300 hover:text-white font-medium transition duration-300">
                                    Filter Events
                                </Link>
                            </li>
                            {user ? (
                                <li>
                                    <Link
                                        to={`/dashboard/${user.username}`}
                                        className="text-gray-300 hover:text-white font-medium transition duration-300"
                                    >
                                        {user.username}
                                    </Link>
                                </li>
                            ) : (
                                <li>
                                    <Link to="/login" className="text-gray-300 hover:text-white font-medium transition duration-300">
                                        Login
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
