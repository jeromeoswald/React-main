const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser");
const connectDB = require('./api/config/dbConnect');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose')


require('dotenv').config();
// const express = require('express');
// const connectDB = require('./api/config/dbConnect');
// import 'dotenv/config';
// import express from 'express';
// import connectDB from './api/config/dbConnect.js';

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({origin: '*'}))
app.use(fileUpload())

app.use('/uploads/doctor/profiles', express.static('uploads/doctor/profiles/'))
app.use('/uploads/patient/profiles', express.static('uploads/patient/profiles/'))

// Main Routes
const authRoute = require('./api/routes/auth')
const doctorRoute = require('./api/routes/doctor')
const patientRoute = require('./api/routes/patient')
const chatRoute = require('./api/routes/chat')
const adminRoute = require('./api/routes/admin')
const clientRoute = require('./api/routes/client')

// API URL's
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/doctor', doctorRoute)
app.use('/api/v1/patient', patientRoute)
app.use('/api/v1/chat', chatRoute)
app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/client', clientRoute)

// // Connect to MongoDB
// connectDB();

app.get('/', (req, res) => {
    res.send("Hello I am node.js application")
})


// mongoose.connect(
//  "mongodb+srv://16eiacs080:16eiacs080@cluster0.1wbxw.mongodb.net/doctor?retryWrites=true&w=majority",
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     (err) => {
//         if (!err) {
//             console.log("MongoDB Connection Succeeded.");
//         } else {
//             console.log("Error in DB connection : " + err);
//         }
//     }
// );


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!!!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
});
  })
  .catch((err) => console.log("Error occurred:", err.message));


// App Port
const port = process.env.PORT || 4002
app.listen(port, () => {
    console.log(`App running on ${process.env.PORT} port`)
})