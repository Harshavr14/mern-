const express = require('express');
const mongoose = require('mongoose');
const axios=require('axios');
const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Health', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const healthSchema = new mongoose.Schema({
      name: String,
      weight: Number,
      age:Number
});
const Health = mongoose.model('Health', healthSchema);
  

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Routes


app.post('/api/health', async (req, res) => {
  try {
      const record = new Health(req.body);
      await record.save();
      res.status(201).json({ message: 'Record added successfully' });
  } catch (error) {
      console.error('Error saving record:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
