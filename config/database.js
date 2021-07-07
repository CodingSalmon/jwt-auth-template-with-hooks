const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify: false })
const db = mongoose.connection;

db.on('connected', () => {
    console.log(`Mongoose connected to ${db.host}.`)
})

module.exports = mongoose;