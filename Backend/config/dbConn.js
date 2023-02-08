const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log("connected to Database")
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB;