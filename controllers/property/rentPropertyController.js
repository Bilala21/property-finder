const SubCategory = require("../../models/Category")
const MainCategory = require("../../models/MainCategory")
const PropertyForRent = require("../../models/PropertyForRent")
const PropertySaleDetails = require("../../models/PropertySaleDetails")


const createRentProperty = async (req, res) => {

    let rentPropertyObj = {
        sub_category,
        media,
        title,
        description,
        condition,
        country,
        city,
        neighbourhood,
        property_type,
        bedrooms,
        bathrooms,
        size,
        furnished_unfurnished,
        rent_paid,
        property_ref,
        listed_by,
        real_estate_agent,
        amenties,
        price,
        call_for_price,
        quantity,
        daily_monthly,
        mini_contract_period,
        notice_period_in_month,
        security_deposit,
        room_type,
        number_of_tenant,
        prefered_tenant,
        type_of_tenant,
        location
    } = req.body

    try {
        const result = await PropertyForRent.create(rentPropertyObj)

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
// get all rent properties
const getRentProperties = async (req, res) => {
    const rentProperties = await PropertyForRent.find({}).lean().exec();
    if (rentProperties.length > 0) {
        return res.status(200).json({ status: 200, "message": 'Recored found', 'rent_properties': rentProperties })
    }
    return res.status(404).json({ status: 404, "message": 'Property not found' })
}

// edit by id property
const editProperty = async (req, res) => {
    const id = req.params.id
    const rentProperties = await PropertyForRent.findById(id).lean().exec();
    if (rentProperties.length > 0) {
        return res.status(200).json({ status: 200, "message": 'Recored found', 'rent_properties': rentProperties })
    }
    return res.status(404).json({ status: 404, "message": 'Property not found' })
}

// update by ud property
const updateProperty = async (req, res) => {
    let rentPropertyObj = {
        sub_category,
        media,
        title,
        description,
        condition,
        country,
        city,
        neighbourhood,
        property_type,
        bedrooms,
        bathrooms,
        size,
        furnished_unfurnished,
        rent_paid,
        property_ref,
        listed_by,
        real_estate_agent,
        amenties,
        price,
        call_for_price,
        quantity,
        daily_monthly,
        mini_contract_period,
        notice_period_in_month,
        security_deposit,
        room_type,
        number_of_tenant,
        prefered_tenant,
        type_of_tenant,
        location
    } = req.body
    const id = req.params.id
    const rentProperties = await PropertyForRent.findOneAndUpdate({ _id: id }, { rentPropertyObj }).lean().exec();
    if (rentProperties.length > 0) {
        return res.status(200).json({ status: 200, "message": 'Recored found', 'rent_properties': rentProperties })
    }
    return res.status(404).json({ status: 404, "message": 'Property not found' })
}

// delete property by id
const deleteProperty = async (req, res) => {
    const id = req.params.id
    try {

        const result = await PropertyForRent.findByIdAndDelete(id)

        if (result) {
            return res.status(200).json({ status: 200, "message": 'Property is deleted' })
        }
        else {
            return res.status(200).json({ status: 200, "message": 'Some error occoured' })
        }

    } catch (error) {

        if (Object.keys(error.reason).length === 0) {
            return res.status(401).json({ status: 401, "message": 'The given id is not matched' })
        }
        if (error.code === 11000) {
            return res.status(402).json({ status: 402, "message": 'All fileds are required' })
        }
    }
}
// delete property by id
const getProperty = async (req, res) => {
    const slug = req.params.slug
    try {

        const id = await MainCategory.find({ slug }, { _id: 1 }).lean()

        const categories = await SubCategory.find({ main_category: id }).lean()
        
        let properties = undefined;
        
        if (slug === "property-for-sale") {
            properties = await PropertySaleDetails.find({ sub_category: categories[0]._id }).lean()
        }
        if (slug === "property-for-rent") {
            properties = await PropertyForRent.find({ sub_category: categories[0]._id }).lean()
        }

        const data = { categories, properties }

        if (properties.length > 0) {
            return res.status(200).json({ status: 200, "message": 'Record found',data })
        }
        else {
            return res.status(404).json({ status: 404, "message": 'Record not found' })
        }

    } catch (error) {

        if (Object.keys(error.reason).length === 0) {
            return res.status(401).json({ status: 401, "message": 'The given id is not matched' })
        }
        if (error.code === 11000) {
            return res.status(402).json({ status: 402, "message": 'All fileds are required' })
        }
    }
}


module.exports = {
    createRentProperty,
    getRentProperties,
    editProperty,
    updateProperty,
    deleteProperty,
    getProperty
}