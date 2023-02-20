import initDb from "helpers/initDb"
import ChildCategory from "models/ChildCategory";
import slugify from "slugify"



initDb()

export default async (req, res) => {
    // return res.json(req.body)
    const parent_type_id = req.body.id;
    const name = req.body.name;
    const slug = slugify(name.toLowerCase());

    try {
        const createSubType = await ChildCategory.findById(parent_type_id);
        // return res.json(createSubType)
        createSubType.sub_category_types.push({
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
