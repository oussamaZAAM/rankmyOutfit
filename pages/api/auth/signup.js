import connectMongo from "@/database/connection";
import Users from "@/model/Schema";
import { hash } from "bcryptjs";

export default async function Handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed" }));

  if (req.method === "POST") {
    console.log(req.body)
    if (!req.body) {
      return res.status(404).json({ error: "Empty Form" });
    }

    const {name, email, password} = req.body;

    //Check Duplicate Users
    const checkExisting = await Users.findOne({email});
    if (checkExisting) return res.status(422).json({ error: "Email already in use"});

    //Store Data after Hashing the password
    Users.create({name, email, password: await hash(password, parseInt(process.env.SALT))}, function(error, data) {
        if (error) return res.status(404).json({error});
        res.status(201).json({status: true, user: data});
    })
  } else {
    res.status(500).json("Server Error at Http Method 'POST'");
  }
}
