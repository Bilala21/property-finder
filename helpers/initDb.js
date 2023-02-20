import mongoose from "mongoose";

function initDb() {
    console.log(process.env.MONGODB_URI)
    if (mongoose.connections[0].readyState) {
        console.log("already connected")
        return
    }
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true
    })
    mongoose.connection.on("connected", () => {
        console.log("Conection established")
    })
    mongoose.connection.on("error", (err) => {
        console.log(err)
    })
}

export default initDb