// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "models/Product"


export default function  handler(req, res) {
  const resdata = Product.find({}).lean()

  res.status(200).json({products })
}
