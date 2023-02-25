import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import Users from "@/model/UserSchema";
import connectMongo from "@/database/connection";

export default async function signin(req, res) {
  const credentials = req.body;

  try {
    connectMongo().catch(error => {error: "Connection Failed"})

    //Check if User Exists
    const user = await Users.findOne({email: credentials.email});
    if(!user) {
        throw new Error("Email not found");
    }

    //Compare Passwords
    const checkPassword = await compare(credentials.password, user.password);

    //Incorrect Credentials
    if (!checkPassword || credentials.email !== user.email) {
        throw new Error("Wrong password, try again")
    }
    
    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);

    const serialized = serialize("authentication", token, {
        httpOnly: true,
        secure: process.env.NEXT_ENV !== "dev",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 14,
        path: "/",
    });
    res.setHeader("Set-Cookie", serialized);

    const data = {
      user: {
        name: user.name,
        email: user.email,
        image: user.toJSON().image
      }
    }
    res.status(200).json(data);
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
}
