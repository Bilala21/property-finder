import initDb from "helpers/initDb"
import Category from "models/Category";
import PropertyForSale from "models/PropertyForSale";



initDb()

export default async (req, res)=> {
  const categories = await Category.find({});
  const saleProducts = await PropertyForSale.find({});
  res.status(200).json({ name: 'John Doe',data:{categories,saleProducts}})
}
