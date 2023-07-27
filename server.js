//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override')
require('dotenv').config();
const cors = require('cors');

//Get controllers
const moodboardController = require('./controllers/moodboards.js')
const imageUploadController = require('./controllers/imageuploads.js') 
const annotationController= require('./controllers/annotations.js'); 




// Connect to MongoDB
mongoose.set('strictQuery', false)

const SESSION_SECRET = process.env.SESSION_SECRET
console.log('here is the session secret')
console.log(SESSION_SECRET)

app.use(session({
    secret: SESSION_SECRET,
    resave: false,//https://www.npmjs.com/package/express-session#resave 
    saveUninitialized: true
}))

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true, 
})

//Mongo error/succes
const db = mongoose.connection
db.on('error', (err)=> console.log(`${err.message} MongoDB Not Running!`))
db.on('connected', ()=> console.log('mongo connected'))
db.on('disconnected', ()=> console.log('mongo disconnected'))

//Middleware
//body parser give use access to req.body
app.use(express.urlencoded({extended:false}))

//body parser add JSON dada from request to the request object
app.use(express.json());

//This will allow use to make DELETE and UPDATE request
app.use(methodOverride('_method'))

//Cors
const whitelist = ['http://localhost:3000','http://localhost:3001',  'https://moodboard-app.herokuapp.com/']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions))

//Moodboard controller
app.use('/mood-boards', moodboardController)
app.use('/image-uploads', imageUploadController)
app.use('/annotations', annotationController)

//app.get('/', (req, res) => res.send('Hello World Test!'));


//Port
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log('listening on port', PORT);
});
