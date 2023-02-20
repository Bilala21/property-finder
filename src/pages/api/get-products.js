import initDb from "helpers/initDb"
import Category from "models/Category"
import PropertyForSale from "models/PropertyForSale"

initDb()

export default function  handler(req, res) {
  const categories = Category.find({}).lean()
  const sale_properties = PropertyForSale.find({}).lean()
  const data={categories,sale_properties}

  res.status(200).json({status:200,data})
}
