const { default: mongoose } = require("mongoose");

const productsShema = new mongoose.Schema({
    name:{
        type:String
    }
})

module.exports = mongoose.models.Product || mongoose.model("product",productsShema)