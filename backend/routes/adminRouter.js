const express = require('express');
const Event = require('../model/Event'); 

const router = express.Router();

router.post('/add', async (req, res) => {
  const { name, description, date, thumbnail } = req.body;

  try {
    const event = new Event({
      name,
      description,
      date,
      thumbnail: thumbnail || 'https://via.placeholder.com/250', 
    });

    const createdEvent = await event.save();
    res.status(201).json({ message: 'Event created successfully', event: createdEvent });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/remove/:eventId', async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    await Event.findByIdAndDelete(eventId);
    res.status(200).json({ message: 'Event removed successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
