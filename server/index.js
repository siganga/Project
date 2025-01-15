const  express = require('express');

/* Routes */
//const workoutRoutes = require('./routes/Workouts.js')
const userRoutes = require('./routes/userRoutes.js')
const productRoutes = require('./routes/productRoutes.js')
const orderRoutes  = require('./routes/orderRoutes.js')


//Recommendation routes
const COBITRecRoutes  = require('./routes/Recommendations/COBITRecRoutes.js')

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

app.use('/uploads', express.static('uploads'));


app.get('/api/images/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product || !product.image) {
      return res.status(404).send('Image not found');
    }
    res.set('Content-Type', product.image.contentType);
    res.send(product.image.data);
  });


/*Route setup */
//app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/products', productRoutes)

app.use('/api/cobitRec', COBITRecRoutes)


const uri = "mongodb+srv://itachi:abcd1234@mernapp.cdmbs.mongodb.net/?retryWrites=true&w=majority&appName=MERNapp";



//mongoose.connect(process.env.CONNECTION_URL)
/*Connection to Mongodb database*/
mongoose.connect(uri)
.then(()=>{
    app.listen(process.env.PORT, () =>{console.log('Listening on port', process.env.PORT)})
})
 .catch((error)=>console.log(error))
