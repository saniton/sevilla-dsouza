// // server.js

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 3001;

// mongoose.connect('mongodb://localhost:27017/upqrade', { useNewUrlParser: true, useUnifiedTopology: true });

// const userDataSchema = new mongoose.Schema({
//   phoneNumber: String,
//   qrNumber: Number,
// });

// const UserData = mongoose.model('UserData', userDataSchema);

// app.use(cors());
// app.use(bodyParser.json());

// app.post('/saveData', async (req, res) => {
//     try {
//       const { phoneNumber, qrNumber } = req.body;
  
//       const userData = new UserData({ phoneNumber, qrNumber });
  
//       await userData.save();
  
//       // Send a JSON response instead of plain text
//       res.status(200).json({ message: 'Data saved successfully' });
//     } catch (error) {
//       console.error('Error saving data:', error.message);
//       res.status(500).json({ error: 'Error saving data to the database' });
//     }
//   });
  
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb+srv://saniton7navelkar:08322777636@cluster0.hiiwdnw.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

const userDataSchema = new mongoose.Schema({
  qrNumber: { type: Number, unique: true },
  name: String,
  phoneNumber: String,

});

const UserData = mongoose.model('eventmanager', userDataSchema);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/saveData', async (req, res) => {const { name, phoneNumber, qrNumber } = req.body;

  // Check if the provided qrNumber exists in the pre-written range (1 to 5)
  if (qrNumber < 1 || qrNumber > 5) {
    return res.status(400).json({ error: 'Invalid qrNumber. It should be between 1 and 5.' });
  }

  try {
    // Check if the qrNumber is available in the database
    const existingRegistration = await UserData.findOne({ qrNumber });

    if (existingRegistration) {
      return res.status(400).json({ error: 'QR Number is already registered.' });
    }

    // Create a new registration document
    const newRegistration = new UserData({
      qrNumber,
      name,
      phoneNumber,
    });

    // Save the registration to the database
    await newRegistration.save();

    return res.status(200).json({ message: 'Registration successful.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// Route to retrieve data for a specific QR number
app.get('/getData/:qrNumber', async (req, res) => {
    const qrNumber = parseInt(req.params.qrNumber);
  
    try {
      // Find the registration document with the specified qrNumber
      const registration = await UserData.findOne({ qrNumber });
  
      if (!registration) {
        return res.status(404).json({ error: 'QR Number not found.' });
      }
  
      return res.status(200).json({
        name: registration.name,
        phoneNumber: registration.phoneNumber,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

