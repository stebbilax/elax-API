const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const fileupload = require('express-fileupload');

const connectDB = require("./config/db");
const errorHandler = require('./middleware/error');


// Load env variables
dotenv.config({ path: './config/config.env' });


connectDB();
const app = express();

// Body Parser
app.use(express.json());

// File Uploading
app.use(fileupload({
    useTempFiles: true
}));






// Bring in Routes
const pictures = require('./routes/pictures');
const albums = require('./routes/albums');

// Mount Routes
app.use("/api/v1/pictures", pictures)
app.use("/api/v1/albums", albums)


// Mount Error Handler Middleware
app.use(errorHandler);




const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on PORT: ${PORT}`.blue.bold));
