const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://Christopher:chriscollins@cluster0.qyupon7.mongodb.net/FundUs?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const caseSchema = new mongoose.Schema({
  caseNumber: Number,
  description: String,
});

const causeSchema = new mongoose.Schema({
  causeName: String,
  cases: [caseSchema]
});

const Cause = mongoose.model('Cause', causeSchema);

// Routes
app.get('/causes', async (req, res) => {
  try {
    const causes = await Cause.find({});
    res.json(causes);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.get('/causes/:cause', async (req, res) => {
  const { cause } = req.params;
  try {
    const foundCause = await Cause.findOne({ causeName: cause });
    if (foundCause) {
      res.json(foundCause);
    } else {
      res.status(404).send('Cause not found');
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
