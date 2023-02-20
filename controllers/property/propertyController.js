const Product=require("../../models/Product")
const createProperty =async (req,res)=>{
  const property =Product.find({}).lean();
}
const getProperty =async (req,res)=>{
  const property =Product.find({}).lean();
}

module.exports={
  createProperty,
  getProperty,
}