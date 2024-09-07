const express = require('express');
const User = require('../model/User');
const Event = require('../model/Event');

const router = express.Router();


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        
        let user = await User.findOne({ username });

        if (!user) {
            
            user = new User({
                username,
                password, 
                isAdmin: false, 
            });

            await user.save();
            return res.status(201).json({ message: 'User registered', user });
        } else {
            
            if (password !== user.password) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            return res.status(200).json({ message: 'Login successful', user });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


router.post('/:userId/register', async (req, res) => {
    const { userId } = req.params;
    const { eventId } = req.body;

    try {
        const user = await User.findById(userId);
        const event = await Event.findById(eventId);

        if (!user || !event) {
            return res.status(404).json({ message: 'User or Event not found' });
        }

        
        if (user.registeredEvents.includes(event._id)) {
            return res.status(400).json({ message: 'User is already registered for this event' });
        }

        
        user.registeredEvents.push(event._id);
        await user.save();

        return res.status(200).json({ message: 'User registered for the event', event });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


router.post('/:userId/unregister', async (req, res) => {
    const { userId } = req.params;
    const { eventId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        const eventIndex = user.registeredEvents.indexOf(eventId);
        if (eventIndex === -1) {
            return res.status(400).json({ message: 'User is not registered for this event' });
        }

        
        user.registeredEvents.splice(eventIndex, 1);
        await user.save();

        return res.status(200).json({ message: 'User unregistered from the event' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


router.get('/:userId/events', async (req, res) => {
    const { userId } = req.params;

    try {
        
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        const events = await Event.find({ _id: { $in: user.registeredEvents } });

        return res.status(200).json({ events });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
