import initDb from "helpers/initDb"
import PropertyForRent from "models/PropertyForRent";
import PropertyForSale from "models/PropertyForSale";
import slugify from "slugify";
initDb()
export default async (req, res) => {
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
}
