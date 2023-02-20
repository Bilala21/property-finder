// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "models/Product"

export default function  handler(req, res) {
  const res = Product.find({}).lean()
  const products = res.json();
  res.status(200).json({products })
}
