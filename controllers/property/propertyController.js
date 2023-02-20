const PropertyForSale = require("../../models/PropertyForSale");
const PropertyForRent = require("../../models/PropertyForRent");
const Category = require("../../models/Category");
const ChildCategory = require("../../models/ChildCategory");
const slugify = require("slugify");

// create properties
// method post
const createProperty = async (req, res) => {
  // return res.json(req.body)
  const categoryTtype = req.body.category_type;
  delete req.body.category_type;
  req.body.slug = slugify(req.body.property_type.toLowerCase());
  if (categoryTtype !== undefined) {
    try {
      let result = "";
      if (categoryTtype === "property-for-rent") {
        result = await PropertyForRent.create(req.body);
      } else if (categoryTtype === "property-for-sale") {
        //   return res.json(req.body)
        result = await PropertyForSale.create(req.body);
      }

      if (result) {
        return res.status("200").json({ status: 200, message: "test", result });
      }
    } catch (error) {
      return res.status("500").json({ status: 500, message: error.message });
    }
  } else {
    return res
      .status("403")
      .json({ status: 403, message: "Base table not found" });
  }
};

// main category
// method post
const createCategory = async (req, res) => {
  const name = req.body.name;
  const slug = slugify(name.toLowerCase());
  if (name !== "") {
    try {
      const result = await Category.create({ name: name, slug: slug });
      if (result) {
        return res
          .status(200)
          .json({ status: 200, message: `${name} category added` });
      } else {
        return res
          .status(403)
          .json({ status: 403, message: "All field required" });
      }
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  } else {
    return res
      .status(403)
      .json({ status: 403, message: "All fields required" });
  }
};

// main child category
// method post
const createChildCategory = async (req, res) => {
  // return res.json(12)
  const slug = slugify(req.body.name.toLowerCase());
  req.body.slug = slug;
  try {
    // const categoryObject = await Category.findById(req.body.parent_id);

    // const result = categoryObject.child_category.push({ name: name, slug: slug })

    // const rel = await categoryObject.save()
    const result = await ChildCategory.create(req.body);

    if (result) {
      return res
        .status(200)
        .json({ status: 200, message: `${req.body.name} category added` });
    } else {
      return res
        .status(403)
        .json({ status: 403, message: "All field required" });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

// main sub types
// method post
const createSubType = async (req, res) => {
  // return res.json(req.body)
  const parent_type_id = req.body.id;
  const name = req.body.name;
  const slug = slugify(name.toLowerCase());

  try {
    const createSubType = await ChildCategory.findById(req.body.id);

    // return res.json(createSubType)

    // return res.json(createSubType.sub_category.push({ name: name, slug: slug }))

    createSubType.sub_category.push({
      parent_type_id: parent_type_id,
      name: name,
      slug: slug,
    });

    const result = await createSubType.save();

    if (result) {
      return res
        .status(200)
        .json({ status: 200, message: `${req.body.name} sub type added` });
    } else {
      return res
        .status(403)
        .json({ status: 403, message: "All field required" });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

// main sub types
// method post
const getSubType = async (req, res) => {
  try {
    const id = await Category.find({ slug: req.params.slug }, { _id: 1 });
    const category = await ChildCategory.find({
      parent_category: "63dd601fdbc89852f27d618e",
    });

    return res.json(category);

    // return res.json(createSubType.sub_category.push({ name: name, slug: slug }))

    // createSubType.sub_category.push({ name: name, slug: slug })

    // const result = await createSubType.save()

    if (result) {
      return res
        .status(200)
        .json({ status: 200, message: `${req.body.name} sub type added` });
    } else {
      return res
        .status(403)
        .json({ status: 403, message: "All field required" });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

// get categories
// method get
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).lean();

    const propertyforrent = await PropertyForRent.find(
      {},
      {},
      { sort: { createdAt: -1 } }
    )
      .limit(15)
      .lean();
    const propertyforsale = await PropertyForSale.find(
      {},
      {},
      { sort: { createdAt: -1 } }
    )
      .limit(15)
      .lean();
    const products = { categories, propertyforrent, propertyforsale };
    if (categories.length > 0) {
      return res
        .status(200)
        .json({ status: 200, message: "products found", products });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "products not found" });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

// get mix products
// method get
const getMixProducts = async (req, res) => {
  // const categories = await Category.find({}).lean();

  try {
    const pageOptions = {
      page: req.body.page || 0,
      limit: req.body.limit || 20,
    };
    const propertyforrent = await PropertyForRent.find({})
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .lean();
    const propertyforsale = await PropertyForSale.find({})
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .lean();
    const categories = await Category.find({}).lean();

    const products = { categories, propertyforrent, propertyforsale };

    if (propertyforrent.length > 0 || propertyforsale.length > 0) {
      return res.status(200).json({
        status: 200,
        pagemeta: pageOptions,
        message: "products found",
        products,
      });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "products not found" });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

// product detail
// method get
const productDetail = async (req, res) => {
  // return res.json(req.params.id)
  try {
    const rentproduct = await PropertyForRent.findById(req.params.id).lean();
    if (rentproduct !== null) {
      return res
        .status(200)
        .json({ status: 200, message: "products found", rentproduct });
    }

    const saleproduct = await PropertyForSale.findById(req.params.id).lean();

    if (saleproduct !== null) {
      return res
        .status(200)
        .json({ status: 200, message: "products found", saleproduct });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "products not found" });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

// product detail
// method get
const getChildCategories = async (req, res) => {
  try {
    const category = await Category.find({ slug: req.params.slug }).lean();

    if (category !== null) {
      return res
        .status(200)
        .json({ status: 200, message: "products found", category });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "products not found" });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

// filter product
// method post
const filterProduct = async (req, res) => {
 
  if(req.body.neighbourhood < 1){
    delete req.body.neighbourhood
  }
  // if(req.body.amenties < 1){
  //   delete req.body.amenties
  // }
  // return res.json(req.body)
  const pageOptions = {
    page: parseInt(req.body.page) || 0,
    limit: parseInt(req.body.limit) || 20,
  };
  delete req.body.limit
  try {
    if (req.params.slug === "property-for-rent") {
      filterFun(PropertyForRent, req, res, pageOptions);
    } else if (req.params.slug === "property-for-sale") {
      filterFun(PropertyForSale, req, res, pageOptions);
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

// filter for [property for rent & property for sale]
const filterFun = async (Table, req, res, pageOptions) => {
  // return res.json(req.body)

  const maxprice = req.body.maxprice;
  const minprice = req.body.minprice;

  const maxsize = req.body.maxsize;
  const minsize = req.body.minsize;

  delete req.params.slug;

  delete req.body.maxsize;
  delete req.body.minsize;

  delete req.body.maxprice;
  delete req.body.minprice;

  const price = [
    minprice ? { price: { $gt: minprice } } : {},
    maxprice ? { price: { $lt: maxprice } } : {},
  ];

  const size = [
    minsize ? { size: { $gt: minsize } } : {},
    maxsize ? { size: { $lt: maxsize } } : {},
  ];
  // return res.json(size)
  const filters = { ...req.body, $and: [...price, ...size] };
  //  return res.json(filters)
 
  // propducts = await Table.find({ "country": "pakistan","$and": [{"size": { "$gt": 9}},{"size": {"$lt": 2000000}}]})
 products = await Table.find(filters)
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .lean();
    if (products.length > 0) {
      return res
        .status(200)
        .json({ status: 200, message: "Products found", products,pageOptions });
    } 
    else if(products.length < 1) {
      return res.status(404).json({
        status: 404,
        message: "Soory products not found for your filters",
      });
    } 
};

const getCategoryProducts = async (req, res) => {

  if (req.params.slug) {
    try {
      const parent_category = await Category.findOne(req.params, { _id: 1 });
      if (Object.keys(parent_category).length > 0) {
        const categories = await ChildCategory.find({parent_category: parent_category._id}).lean();

        if (categories.length > 0 && req.params.slug === "property-for-sale") {

          getProudcts(PropertyForSale,categories,res)
        }
        if (categories.length > 0 && req.params.slug === "property-for-rent") {
          
          getProudcts(PropertyForRent,categories,res)
        }
      }
    } 
    catch (error) {
      return res.status(403).json({ message: error.message });
    }
  }
   else {
    return res.status(403).json({ message: "slug required" });
  }
}

const getProudcts = async (Table,categories,res) => {
  const products = await Table.find({});
  if (products.length > 0) {
    const data = { categories, products };
    return res.status(200).json({ status: "200", message: "success", data });
  }
}
const getSubCategories = async(req,res) =>{
  
  try {
    const subcategories = await ChildCategory.find({parent_category:req.params.id}).lean();
    if(subcategories.length > 0){
      return res.status(200).json({"message":"Categories found", subcategories})
    }
    return res.status(404).json({"message":"Categories not found"});
  } catch (error) {
    return res.status(403).json({"message":"Something wrong",error})
  }
}
const getMainCategories = async(req,res) =>{
  try {
    const categories = await Category.find({ }).lean();
    if(categories.length > 0){
      return res.status(200).json({"message":"Categories found", categories})
    }
    return res.status(404).json({"message":"Categories not found"});
  } catch (error) {
    return res.status(403).json({"message":"Something wrong",error})
  }
}

module.exports = {
  createProperty,
  createCategory,
  createChildCategory,
  getCategories,
  getMixProducts,
  productDetail,
  getChildCategories,
  filterProduct,
  createSubType,
  getCategoryProducts,
  getSubType,
  getMainCategories,
  getSubCategories,
  
};
