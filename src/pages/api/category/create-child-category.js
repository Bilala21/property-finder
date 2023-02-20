import initDb from "helpers/initDb"

import slugify from "slugify"
import ChildCategory from "models/ChildCategory";


initDb()

export default async (req, res) => {
  const slug = slugify(req.body.name)
  req.body.slug=slug
  try {
    const result = await ChildCategory.create(req.body);

    if (result) {
      return res
        .status(200)
        .json({ status: 200, message: `${req.body.name} category added`, result});
    } else {
      return res
        .status(403)
        .json({ status: 403, message: "All field required" });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};