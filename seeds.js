const mongoose = require('mongoose');
const MoodBoard = require('./models/moodboards.js');
const Annotation = require('./models/annotations.js');
require('dotenv').config();

// Connect to your MongoDB server
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
});

// Check the connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected');
});

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

const seedAnnotations = [
  {
    content: 'A sample annotation for kitchen mood board',
    position: { x: 100, y: 200 }
  },
  {
    content: 'A sample annotation for living room mood board',
    position: { x: 50, y: 150 }
  },
  // Add more annotations as needed
];

// Seed the database
async function seedDB() {
  // Clear the collections
  await MoodBoard.deleteMany({});
  await Annotation.deleteMany({});
  console.log('Removed all mood boards and annotations');

  // Insert the seed data
  for (let i = 0; i < seedMoodBoards.length; i++) { //ood boards and annotations are created in a loop. For each iteration, a mood board is created first, and its _id is then used to create a corresponding annotation. 
    const moodBoard = new MoodBoard(seedMoodBoards[i]);
    const savedMoodBoard = await moodBoard.save();

    const annotation = new Annotation({
      ...seedAnnotations[i],
      moodboardId: savedMoodBoard._id
    });
    await annotation.save();
  }

  console.log('Added seed mood boards and annotations');

  // Close the connection
  mongoose.connection.close();
}

seedDB();
