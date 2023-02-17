import connectMongo from "@/database/connection";
import Users from "@/model/Schema";
import { hash } from "bcryptjs";

export default async function Handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed" }));

  if (req.method === "POST") {
    if (!req.body) {
      return res.status(404).json({ error: "Empty Form" });
    }

    const {name, email, password} = req.body;

    //Check Duplicate Users
    const checkExisting = await Users.findOne({email});
    if (checkExisting) return res.status(406).send("Email already in use");

    //Create image parameters
    const image = {
      url: '',
      delete: '',
      position: {
        left: 50,
        top: 50
      }
    }

    //Store Data after Hashing the password
    Users.create({name, email, password: await hash(password, parseInt(process.env.SALT)), image}, function(error, data) {
        if (error) return res.status(404).json({error});
        res.status(201).json({status: true, user: data});
    })
  } else {
    res.status(500).json("Server Error at Http Method 'POST'");
  }
}
