const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('YOUR_MONGODB_ATLAS_CONNECTION_STRING', { useNewUrlParser: true, useUnifiedTopology: true });

const caseSchema = new mongoose.Schema({
  caseNumber: Number,
  description: String,
});

const causeSchema = new mongoose.Schema({
  causeName: String,
  cases: [caseSchema]
});

const Education = mongoose.model('Education', causeSchema);
const Health = mongoose.model('Health', causeSchema);
const Food = mongoose.model('Food', causeSchema);

// Routes
app.get('/causes', async (req, res) => {
  const education = await Education.find({});
  const health = await Health.find({});
  const food = await Food.find({});
  res.json({ education, health, food });
});

app.get('/causes/:cause', async (req, res) => {
  const { cause } = req.params;
  if (cause === 'education') {
    const cases = await Education.find({});
    res.json(cases);
  } else if (cause === 'health') {
    const cases = await Health.find({});
    res.json(cases);
  } else if (cause === 'food') {
    const cases = await Food.find({});
    res.json(cases);
  } else {
    res.status(404).send('Cause not found');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
