import initDb from "helpers/initDb"
import Product from "models/Product"

initDb()

export default function  handler(req, res) {
  const resdata = Product.find({}).lean()

  res.status(200).json({resdata })
}
