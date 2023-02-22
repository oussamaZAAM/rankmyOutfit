import { posts } from "/mockData";
import jwt_decode from "jwt-decode";
import { serialize } from "cookie";
import { verify } from "jsonwebtoken";
import Users from "@/model/UserSchema";
import Outfits from "@/model/OutfitSchema";

export default async function Handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(posts);
  }

  if (req.method === "POST") {
        try {
            const { cookies } = req;
            const jwt = cookies.authentication;
            var decoded = jwt_decode(jwt);
            verify(jwt, process.env.JWT_SECRET);
            const {image} = req.body;
            console.log(image)
            if (image.length < 1) return res.status(404).json({message: 'Empty data sent to the server'})
            const post = {
                author: decoded.email,
                type: (image.length === 1) ? 'single' : 'multi',
                image,
                raters: []
            }

            Outfits.create(post, async function(error, data) {
                if (error) return res.status(404).json({error});
                
                await Users.updateOne(
                    {email: decoded.email},
                    { $push: {"outfits": data._id}}
                )
                return res.status(201).json({status: true, outfit: data});
            })
        } catch (err) {
            // const serialised = serialize("authentication", null, {
            //     httpOnly: true,
            //     secure: process.env.NEXT_ENV !== "dev",
            //     sameSite: "strict",
            //     maxAge: -1,
            //     path: "/",
            // });
            // res.setHeader("Set-Cookie", serialised);
            return res.status(501).json({ message: "Invalid Token" });
    }
  }
}
