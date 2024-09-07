const express = require('express');
const Event = require('../model/Event'); // Import the Event model

const router = express.Router();

// Route to get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to filter events by month and year
router.get('/filter', async (req, res) => {
  const { month, year } = req.query;

  try {
    // Parse month and year to integers
    const parsedMonth = parseInt(month);
    const parsedYear = parseInt(year);

    if (!parsedMonth || !parsedYear) {
      return res.status(400).json({ message: 'Invalid month or year' });
    }

    // Get the start and end date for filtering
    const startDate = new Date(parsedYear, parsedMonth - 1, 1); // First day of the month
    const endDate = new Date(parsedYear, parsedMonth, 0); // Last day of the month
    // Find events that occur within the specified month and year
    const events = await Event.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get an event by ID
router.get('/:eventId', async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
