const  express = require('express');

/* Routes */

//Recommendation routes
const COBITRecRoutes  = require('./routes/Recommendations/COBITRecRoutes.js')
const ISORecRoutes  = require('./routes/Recommendations/ISORecRoutes.js')
const NISTRecRoutes  = require('./routes/Recommendations/NISTRecRoutes.js')

//The routes
const UnitRoutes  = require('./routes/CRUD/UnitRoutes.js')
const LessonRoutes  = require('./routes/CRUD/LessonRoutes.js')
const QuestionRoutes  = require('./routes/CRUD/QuestionRoutes.js')
const ClassroomRoutes  = require('./routes/CRUD/ClassroomRoutes.js')
const userRoutes = require('./routes/userRoutes.js')


/* Imports*/
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config()


/*Express app setup*/
const app = express();
 
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    sameSite: 'none'
   }));
app.use(express.json())




/*Route setup */

app.use('/api/cobitRec', COBITRecRoutes)
app.use('/api/isoRec', ISORecRoutes)
app.use('/api/nistRec', NISTRecRoutes)


/*Route setup*/
app.use('/api/units', UnitRoutes)
app.use('/api/lessons', LessonRoutes)
app.use('/api/questions', QuestionRoutes)
app.use('/api/classrooms', ClassroomRoutes)
app.use('/api/user', userRoutes)

 


const uri = "mongodb+srv://itachi:abcd1234@mernapp.cdmbs.mongodb.net/?retryWrites=true&w=majority&appName=MERNapp";



//mongoose.connect(process.env.CONNECTION_URL)
/*Connection to Mongodb database*/
mongoose.connect(uri)
.then(()=>{
    app.listen(process.env.PORT, () =>{console.log('Listening on port', process.env.PORT)})
})
 .catch((error)=>console.log(error))
