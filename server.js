const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const fileupload = require('express-fileupload');
const path = require("path");

const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');


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

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

// Sanitize Data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 min
    max: 100
});

app.use(limiter);

// Cookie parser
app.use(cookieParser());

// Bring in Routes
const pictures = require('./routes/pictures');
const albums = require('./routes/albums');
const blogposts = require('./routes/blogposts');
const auth = require('./routes/auth');

// Mount Routes
app.use("/api/v1/pictures", pictures)
app.use("/api/v1/albums", albums)
app.use("/api/v1/blogposts", blogposts)
app.use("/api/v1/auth", auth)


// Mount Error Handler Middleware
app.use(errorHandler);




const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on PORT: ${PORT}`.blue.bold));
