import initDb from "helpers/initDb"
import MyPropety from "models/MyPropety"



initDb()

export default async (req, res)=> {
  const data = await MyPropety.find({});
  res.status(200).json({ name: 'John Doe',data})
}
