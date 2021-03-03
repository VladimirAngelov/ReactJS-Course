const mongoose = require('mongoose');
const {dbURI} = require('./config')

module.exports = () => {
    mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })

    mongoose.connection.once('open', () => console.log(`Connected to database!`));
}