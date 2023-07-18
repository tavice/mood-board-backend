const mongoose = require('mongoose');
const MoodBoard = require('./models/moodboards.js');
require('dotenv').config();

// Connect to your MongoDB server
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true, 
})

// Check the connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected');
});

// Define some seed data
const seedMoodBoards = [
  {
    name: 'Kitchen Design',
    items: [
      {
        type: 'image',
        content: 'url_of_image',
        position: { x: 100, y: 200 },
        size: { width: 500, height: 600 },
        rotation: 30
      },
      // Add more items as needed
    ],
  },
  {
    name: 'Living Room Design',
    items: [
      {
        type: 'text',
        content: 'Inspirational quote',
        position: { x: 50, y: 150 },
        size: { width: 200, height: 100 },
        rotation: 0
      },
      // Add more items as needed
    ],
  },
  // Add more mood boards as needed
];

// Seed the database
async function seedDB() {
  // Clear the collection
  await MoodBoard.deleteMany({});
  console.log('Removed all mood boards');

  // Insert the seed data
  await MoodBoard.insertMany(seedMoodBoards);
  console.log('Added seed mood boards');

  // Close the connection
  mongoose.connection.close();
}

seedDB();
