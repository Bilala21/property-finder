import initDb from "helpers/initDb"
import MyPropety from "models/MyPropety"



initDb()

export default async (req, res)=> {
  const data = await MyPropety.find({});
  res.status(200).json({ name: 'John Doe',data})
}


// import initDb from "@/helpers/initDb"
// import Product from "@/models/Product"

// initDb()
// export default async (req,res)=>{
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     const data = await Product.find();
//     return res.json({message:"hello form there",data})
// }
