const Vehicle = require("../../models/Vehicle")

const createVehicle = async (req, res) => {

    let vehicleObject = {
        media,
        title,
        description,
        condition,
        country,
        city,
        neighbourhood,
        maker,
        usages,
        final_drive_system,
        wheel,
        engine_size,
        model,
        build_year,
        dimension,
        boat_engine,
        num_of_engine,
        inboard_outboard,
        kilometer, warranty,
        color,
        reginal_specs,
        chassis_num,
        transmission_type,
        vehicle_type,
        doors,
        body_condition,
        engine_condition,
        capacity_weight,
        engine_type,
        num_of_cylinder,
        fuel_type,
        steering_side,
        seller_type,
        extras,
        engine_power,
        price,
        call_for_price,
        quantity,
        num_plate_city,
        num_plate_type,
        num_plate_Code,
        num_of_digit,
        plate_design,
        plate_number,
        spare_part_type,
        part_condition,
        part_seller_type,
        location
    } = req.body

    // return res.json(vehicleObject)

    try {
        const result = await Vehicle.create(vehicleObject)

        if (result) {

            return res.status(200).json({ "message": `Category ${title} is added` })
        }

        else {

            return res.status(400).json({ status: 400, "message": `Unknown error occured` })
        }

    }

    catch (error) {

        if (error.code === 11000) {

            return res.status(402).json({ status: 402, "message": 'All fileds are required' })
        }

    }
}

const getVehicles = async (req, res) => {

    const pageOptions = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 2
    }
    const vehicles = await Vehicle.find({}).skip(pageOptions.page * pageOptions.limit).limit(pageOptions.limit).lean();

    if (vehicles.length > 0) {
        return res.status(200).json({ 'status': 200, "message": "Record found", "limit": pageOptions.limit, "page": pageOptions.page, "vehicles": vehicles })
    }
    else {
        return res.status(404).json({ 'status': 404, "message": "Record not found" })
    }
}

const getVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id).lean();

        if (vehicle._id !== "") {
            return res.status(200).json({ 'status': 200, "message": "Record found", 'vehicle': vehicle })
        }
        else {
            return res.status(404).json({ 'status': 404, "message": "Record not found" })
        }

    } catch (error) {
        return res.status(404).json({ 'status': 404, error })
    }
}

module.exports = {
    createVehicle,
    getVehicles,
    getVehicle
}