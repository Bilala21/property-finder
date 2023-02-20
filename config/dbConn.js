const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://bilal:z2Bfl9YSy0k3ODYl@cluster0.bqdbvzr.mongodb.net/property?retryWrites=true&w=majority")
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB