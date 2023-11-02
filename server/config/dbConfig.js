const mongoose = require("mongoose");
const dotenv = require('dotenv');
// mongoose.connect(process.env.MONGO_URL, {useUnifiedTopology: true,
//     useNewUrlParser: true,
//     }
//     ).then(db => console.log('DB is connected'))
//     .catch(err => console.log(err));


// const connection = mongoose.connection;

// connection.on('connected', () => {
//     console.log('Mongo db connected successfully');
// })

// connection.on('error', (err) => {
//     console.log('Mongo db connection error: ', err);
// })

module.exports = mongoose;