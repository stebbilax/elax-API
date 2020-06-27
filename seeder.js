const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env variables
dotenv.config({ path: './config/config.env' });

// Load Models
const Album = require('./models/Album')
const Picture = require('./models/Picture')

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Read JSON files
const albums = JSON.parse(fs.readFileSync(`${__dirname}/data/albums.json`, 'utf-8'));
const pictures = JSON.parse(fs.readFileSync(`${__dirname}/data/pictures.json`, 'utf-8'));

// Import data into DB
const importData = async () => {
    try {
        await Album.create(albums);
        await Picture.create(pictures);

        console.log("Data Imported..".green.inverse);
        process.exit();
    } catch (error) {
        console.error(error);
    }
}

// Delete data
const deleteData = async () => {
    try {
        await Album.create(albums);
        await Picture.create(pictures);

        console.log("Data Destroyed...".red.inverse);
        process.exit();
    } catch (error) {
        console.error(error);

    }
}

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
