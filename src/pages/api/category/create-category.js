import initDb from "helpers/initDb"
import Category from "models/Category"
import slugify from "slugify"



initDb()

export default async (req, res)=> {
  const name = req.body.name
  const slug = slugify(name.toLowerCase())
  const result = await Category.create({name,slug})
  // const data = await MyPropety.find({});
  res.status(200).json({ name: 'John Doe',result})
}


// import initDb from "@/helpers/initDb"
// import Product from "@/models/Product"

// initDb()
// export default async (req,res)=>{
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     const data = await Product.find();
//     return res.json({message:"hello form there",data})
// }
