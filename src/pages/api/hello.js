import initDb from "helpers/initDb"
import Category from "models/Category";
import PropertyForSale from "models/PropertyForSale";



initDb()

export default async (req, res)=> {
  const data = await Category.find({});
  const saleProducts = await PropertyForSale.find({});
  res.status(200).json({ name: 'John Doe',data:{data,saleProducts}})
}


// import initDb from "@/helpers/initDb"
// import Product from "@/models/Product"

// initDb()
// export default async (req,res)=>{
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     const data = await Product.find();
//     return res.json({message:"hello form there",data})
// }
