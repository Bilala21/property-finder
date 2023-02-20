
const MainCategory = require("../../models/MainCategory");
const SubCategory = require("../../models/Category");
const slugify = require("slugify");
const Category = require("../../models/Category");
const PropertyForSal = require("../../models/PropertyForSale");

const createMainCategory = async (req, res) => {

    const name = req.body.name
    const slug = slugify(name);

    if (name === "") {

        return res.status(402).json({ status: 402, "message": "All fields are required" })
    }
    else {

        try {

            const result = await MainCategory.create({ name: name, slug: slug })

            if (result) {

                return res.status(200).json({ "message": `Category ${name} is added` })
            }

            else {

                return res.status(200).json({ status: 200, "message": `Unknown error occured` })
            }

        }

        catch (error) {

            if (error.code === 11000) {
                return res.status(409).json({ status: 409, "message": `This ${name} category is already exist` })
            }

        }
    }
}

const createSubcategory = async (req, res) => {
    // const result = await SubCategory.findById(req.body.id);
    // const newData =result.child_category.push(req.body.child_category)
    // const rel = await result.save()
    // return res.json(rel)

    const obj = {
        name,
        main_category,
        child_category
    } = req.body

    try {

        const result = await SubCategory.insertMany(obj)

        if (result.length > 0) {

            return res.status(200).json({ "message": `Category  is added` })
        }

        else {

            return res.status(200).json({ status: 200, "message": `Unknown error occured` })
        }

    }

    catch (error) {

        if (error.code === 11000) {

            return res.status(409).json({ status: 409, "message": `This  category is already exist` })
        }

        else if ('errors' in error) {

            return res.json(error)

            return res.status(402).json({ status: 402, "message": "All fields are required" })
        }
    }
}

const editCategory = async (req, res) => {
    try {
        const category = await SubCategory.findById(req.params.id).lean();

        if (category._id !== "") {
            return res.status(200).json({ "status": 200, "message": "Category found", "category": category })
        }
        else {
            return res.status(404).json({ "status": 404, "message": "Category not found" })
        }
    } catch (error) {
        return res.status(400).json({ "status": 400, "message": error })
    }
}

const updateCategory = async (req, res) => {

    const filter = { _id: req.params.id }

    const update = { name: req.body.name }
    try {
        const category = await SubCategory.findByIdAndUpdate(filter, update);

        if (category._id !== "") {
            return res.status(200).json({ "status": 200, "message": `${category.name} is successfully updated` })
        }
        else {
            return res.status(404).json({ "status": 404, "message": `${req.body.name} is not updated` })
        }

    } catch (error) {
        return res.status(400).json({ "status": 400, "message": error })
    }
}

const removeCategory = async (req, res) => {
    try {
        const id = req.params.id
        const category = await SubCategory.findByIdAndDelete(id).lean();
        if (category._id !== '') {
            return res.status(200).json({ "status": 200, "message": `${category.name} is deleted` })
        }
        else {
            return res.status(404).json({ "status": 404, "message": "Category is not deleted" })
        }

    } catch (error) {
        return res.status(400).json({ "status": 400, "message": error })
    }
}

// get getcategories
// const getCategories = (req, res) => {

//     try {
//         MainCategory.find({}, (err, data) => {
//             if (!err) {
//                 return res.status(200).send({ "status": 200, "message": "Record  found", categories: data })
//             }
//             else {
//                 return res.status(404).json({ "status": 404, "message": "Record not found" })
//             }
//         })
//     } catch (error) {
//         return res.status(400).json({ "status": 400, "message": error })
//     }
// }



// add category
// method post
const addCategory = async (req, res) => {


    let parent_id = undefined;

    const name = req.body.name;

    parent_id = req.body.parent_id;

    const slug = slugify(name);
    try {
        if (parent_id === undefined) {

            const result = await Category.create({ name: name, slug: slug });

            if (result._id !== '') {
                return res.status(200).json({ "status": 200, "message": `${name} category is added` });
            }
        }
        else if (parent_id !== undefined) {

            const result = await Category.findById(req.body.parent_id);
            const newData = result.child_category.push({ name: name, slug: slug })
            const rel = await result.save()
            return res.json(rel)

            return res.status(200).json({ "status": 200, "message": `${name} category is added` });
        }
        else {
            return res.status(403).json({ "status": 403, "message": `${name} category is not added` });
        }
    } catch (error) {
        return res.status(403).json({ "status": 403, "message": error.message });
    }
}

// get categories
// method get
const categories = async (req, res) => {
    try {
        const categories = await Category.find({}).lean();
        if (categories._id !== '') {
            return res.status(200).json({ "status": 200, "message": "Categories found", categories });
        }
        else {
            return res.status(404).json({ "status": 404, "message": "Categories found" });
        }

    } catch (error) {
        return res.status(403).json({ "status": 403, "message": error.message });
    }
}

// get child categories
// method get
const childCategories = async (req, res) => {

    try {
        const properties = await Category.find({ slug: req.params.slug }).lean();
        if (properties.length > 0) {
            return res.status(200).json({ "status": 200, "message": "properties found", properties });
        }
        else {
            return res.status(404).json({ "status": 404, "message": "properties not found" });
        }

    } catch (error) {
        return res.status(403).json({ "status": 403, "message": error.message });
    }
}


// add property for sale
// method get

const addPropertyForSale = async (req, res) => {

    let propertyForSale = {
        parent_id,
        media,
        title,
        description,
        condition,
        country,
        city,
        neighbourhood,
        property_type,
        buyer_transfer_fee,
        seller_transfer_fee,
        maintenance_fee,
        bedrooms,
        bathrooms,
        size_sq_ft,
        zoned_for,
        occupancy_status,
        community_fee,
        developer,
        furnished_unfurnished,
        freehold,
        property_ref,
        contract_period,
        notice_period,
        security_deposit,
        room_type,
        num_of_tenant,
        tenant_nationality,
        tenant_allowed,
        amenty,
        listed_by,
        seller_type,
        real_estate_egent,
        daily_monthly,
        price,
        call_for_price,
        quantity,
        location
    } = req.body

    // return res.json(req.body)
    try {
        const result = await PropertyForSal.create({
            parent_id,
            media,
            title,
            description,
            condition,
            country,
            city,
            neighbourhood,
            property_type,
            buyer_transfer_fee,
            seller_transfer_fee,
            maintenance_fee,
            bedrooms,
            bathrooms,
            size_sq_ft,
            zoned_for,
            occupancy_status,
            community_fee,
            developer,
            furnished_unfurnished,
            freehold,
            property_ref,
            contract_period,
            notice_period,
            security_deposit,
            room_type,
            num_of_tenant,
            tenant_nationality,
            tenant_allowed,
            amenty,
        })

        if (result) {

            return res.status(200).json({ "message": `Category ${title} is added` })
        }

        else {

            return res.status(2146498270).json({ status: 2146498270, "message": `Unknown error occured` })
        }

    }

    catch (error) {

        if (error.code === 11000) {

            return res.status(402).json({ status: 402, "message": 'All fileds are required' })
        }

    }
}

// property filters
// method get
const propertyFilters = async (req, res) => {
    const pageOptions = {
        page: parseInt(req.body.page) || 0,
        limit: parseInt(req.body.limit) || 2
    }
    if (req.body.amenty) {
        const amenty = req.body.amenty;
        delete req.body.amenty
        const saleProperties = await filterFunction(req.body, pageOptions, req, res)
        const isExist = saleProperties[0].amenty.every((el) => amenty.includes(el))

        if (isExist) {
            return res.status(200).json({ status: 200, "message": 'Recored found', 'properties': await filterFunction(req.body, pageOptions), 'page': pageOptions.page, "limit": pageOptions.limit })
        }
        else {
            return res.status(404).json({ status: 404, "message": 'Recored not found' })
        }
    }
    else {
        const properties = await filterFunction(req.body, pageOptions, req, res)
        if (properties.length > 0) {
            return res.status(200).json({ status: 200, "message": 'Recored found', 'properties': properties, 'page': pageOptions.page, "limit": pageOptions.limit })
        }
        else {
            return res.status(404).json({ status: 404, "message": 'Recored not found' })
        }
    }
}

const filterFunction = async (body, pageOptions, req, res) => {
    const ModelName = body.modelName;

    if (ModelName === "PropertyForSal") { Table = { name: PropertyForSal } }
    if (ModelName === "Category") { Table = { name: Category } }

    delete body.modelName

    const result = await Table.name.find(body).skip(pageOptions.page * pageOptions.limit).limit(pageOptions.limit).lean();
    if (result.length > 0) {
        return result;
    }
    else {
        return res.status(404).json({ status: 404, "message": 'Recored not found' });
    }
}

// get categories,
// method get

const getCategories = async (req, res) => {

    if (req.params.slug) {
        let TableName = undefined;
        if (req.params.slug === 'property-for-sale') {
            TableName = PropertyForSal
        }
        else if (req.params.slug === 'property-for-rent') {
            TableName = PropertyForSal
        }
        try {
            const categories = await Category.find({ slug: req.params.slug }).lean();
            if (categories.length > 0) {
                const pageOptions = {
                    page: parseInt(req.body.page) || 0,
                    limit: parseInt(req.body.limit) || 2
                }
                const properties = await TableName.find({ parent_id: categories[0]._id }).skip(pageOptions.page * pageOptions.limit).limit(pageOptions.limit).lean();

                const products={categories, properties}

                return res.status("200").json({ "status": "200", "message":`Products for ${categories[0].name}`, "products":products})
            }
            else {
                return res.status("404").json({ "status": "404", "message": "Property not found" })
            }
        } catch (error) {
            return res.status("404").json({ "status": "404", "message": error.message })
        }
    }
    else {
        return res.status("403").json({ "status": "403", "message": "Slug is required" })
    }
}



module.exports = {
    createMainCategory,
    createSubcategory,
    removeCategory,
    editCategory,
    updateCategory,
    getCategories,





    categories,
    addCategory,
    childCategories,

    addPropertyForSale,

    propertyFilters
};
