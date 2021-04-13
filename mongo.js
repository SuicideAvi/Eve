const mongoose = require('mongoose')
 const { mongoPath } = require('./config.json')
// const mongoPath = 'mongodb+srv://projecteve:rZcB9BZqi24vSJrM@cluster0.mmy4b.mongodb.net/projecteve?retryWrites=true&w=majority'

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    return mongoose
}