const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // Import cors

dotenv.config();

connectDB();

const app = express();

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

const userRouter = require('./routes/userRouter'); 
const eventRouter = require('./routes/eventRouter'); 
const adminRouter = require('./routes/adminRouter'); 

app.use('/api/users', userRouter); 
app.use('/api/events', eventRouter); 
app.use('/api/admin', adminRouter); 

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
