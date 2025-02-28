const  express = require('express');

/* Routes */

const UnitRoutes  = require('./routes/CRUD/UnitRoutes.js')
const LessonRoutes  = require('./routes/CRUD/LessonRoutes.js')
const QuestionRoutes  = require('./routes/CRUD/QuestionRoutes.js')
const ClassroomRoutes  = require('./routes/CRUD/ClassroomRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const scoreRoutes  = require('./routes/Other/scoreRoutes.js')


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





/*Route setup*/
app.use('/api/units', UnitRoutes)
app.use('/api/lessons', LessonRoutes)
app.use('/api/questions', QuestionRoutes)
app.use('/api/classrooms', ClassroomRoutes)
app.use('/api/user', userRoutes)
app.use('/api/scores', scoreRoutes);
 


const uri = "mongodb+srv://itachi:abcd1234@mernapp.cdmbs.mongodb.net/?retryWrites=true&w=majority&appName=MERNapp";



//mongoose.connect(process.env.CONNECTION_URL)
/*Connection to Mongodb database*/
mongoose.connect(uri)
.then(()=>{
    app.listen(process.env.PORT, () =>{console.log('Listening on port', process.env.PORT)})
})
 .catch((error)=>console.log(error))
