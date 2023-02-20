const Vehicle = require("../../models/Vehicle");
const PropertyForSal = require("../../models/PropertyForSale")


const setFilter = async (req, res) => {

    const pageOptions = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 2
    }
    const saleProperties = await PropertyForSal.find(req.body).skip(pageOptions.page * pageOptions.limit).limit(pageOptions.limit).exec();
    if (saleProperties.length > 0) {
        return res.status(200).json({ status: 200, "message": 'Recored found', 'properties': saleProperties, 'page': pageOptions.page, "limit": pageOptions.limit })
    }
    return res.status(404).json({ status: 404, "message": 'Recored not found' })
}


const vehicleFilter = async (req, res) => {
    const pageOptions = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 2
    }
    try {
        const saleProperties = await Vehicle.find(req.body).skip(pageOptions.page * pageOptions.limit).limit(pageOptions.limit).exec();
        if (saleProperties.length > 0) {
            return res.status(200).json({ status: 200, "message": 'Recored found', 'properties': saleProperties, 'page': pageOptions.page, "limit": pageOptions.limit })
        }
        return res.status(404).json({ status: 404, "message": 'Recored not found' })
    } catch (error) {
        return res.status(404).json({ status: 404, error })
    }
}

const getCountries = async (req, res) => {
    const countries = await PropertyForSal.find({}).select({ "country": 1 })
}
module.exports = {
    setFilter,
    vehicleFilter,
    getCountries,
}