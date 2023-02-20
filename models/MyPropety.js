const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String
    }
})

export default mongoose.models.mypropety || mongoose.model("mypropety",productSchema)
