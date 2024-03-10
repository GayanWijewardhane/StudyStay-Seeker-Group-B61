import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import { getListings } from './controllers/listing.controller.js';
//import { addReview } from './controllers/listing.controller.js';
import  path  from 'path';

dotenv.config();

mongoose
.connect(process.env.MONGO)
.then(() =>{
    console.log('Successfully Conected to MongoDB!');
   })
   .catch((err) =>{
    console.log(err);
   });


  const _dirname = path.resolve(); 

const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000,()=> {console.log('Server Is Running On Port 3000 !!!!') ;
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(_dirname, '../client/dist')));
app.get('*', (req, res) =>{
    res.sendFile(path.join(_dirname, 'client' ,'dist' ,'index.html'));
});

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
app.post('/api/listing/addReview/:listingId', (req, res) => {
    const { listingId } = req.params;
    const { text } = req.body;
  
    // Find the listing by ID 
    const listing = getListings.find((listing) => listing.id === listingId);
  
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }
  
    // Add the review to the listing 
    listing.addReview.push({ text });
  
    res.json({ success: true, message: 'Review added successfully' });
  });