// import { posts } from "/mockData";
import jwt_decode from "jwt-decode";
import { serialize } from "cookie";
import { verify } from "jsonwebtoken";
import Users from "@/model/UserSchema";
import Outfits from "@/model/OutfitSchema";
import { getSession } from "next-auth/react";
import connectMongo from "@/database/connection";

export default async function Handler(req, res) {
  if (req.method === "GET") {
    try {
      connectMongo().catch(error => {error: "Connection Failed"})
      
      const posts = await Outfits.find({});
      return res.status(200).json(posts);
    } catch(e) {
      return res.status(404).json({message: "Not Found"});
    }
  }

  if (req.method === "POST") {
      const session = await getSession({ req });
      var verification = false;

      const { cookies } = req;
      const jwt = cookies.authentication;
      try {
        verify(jwt, process.env.JWT_SECRET);
        verification = true;
      } catch (e) {
        verification = false;
      }

      //Check if the user is authenticated through (Google / Facebook / ...) Provider
      if (session && session.user && session.expires) {
        //Add Posts added by (Google / Facebook / ...) users
        const { image } = req.body;
        if (image.length < 1)
          return res
            .status(404)
            .json({ message: "Empty data sent to the server" });
        const post = {
          author: session.user.email,
          type: image.length === 1 ? "single" : "multi",
          image,
          raters: [],
        };

        Outfits.create(post, async function (error, data) {
          if (error) return res.status(404).json({ error });

          await Users.updateOne(
            { email: session.user.email },
            { $push: { outfits: data._id } }
          );
          return res.status(201).json({ status: true, outfit: data });
        });
      } else {
          if (verification) {
              // Add Posts added by JWT users
              var decoded = jwt_decode(jwt);
              const { image } = req.body;
              if (image.length < 1)
                return res
                  .status(404)
                  .json({ message: "Empty data sent to the server" });
              const post = {
                author: decoded.email,
                type: image.length === 1 ? "single" : "multi",
                image,
                raters: [],
              };

              Outfits.create(post, async function (error, data) {
                if (error) return res.status(404).json({ error });

                await Users.updateOne(
                  { email: decoded.email },
                  { $push: { outfits: data._id } }
                );
                return res.status(201).json({ status: true, outfit: data });
              });
          } else {
              //Delete non authenticated user's cookies
              const serialized = serialize("authentication", null, {
                  httpOnly: true,
                  secure: process.env.VERCEL_ENV !== "development",
                  sameSite: "strict",
                  maxAge: -1,
                  path: "/",
              });
              res.setHeader("Set-Cookie", serialized);
              return res.status(501).json({ message: "Invalid Token" });
          }
      }
  }
}
