import initDb from "helpers/initDb"
initDb()
import Product from "models/Product"


export default function  handler(req, res) {
  const resdata = Product.find({}).lean()

  res.status(200).json({resdata })
}
