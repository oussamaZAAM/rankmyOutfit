import Users from "@/model/UserSchema";
import { serialize } from "cookie";
import { verify } from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { getSession } from "next-auth/react";

export default async function Handler(req, res) {
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

  if (session && session.user && session.expires) {
    if (req.method === "PUT") {
      const user = await Users.findOne({ email: session.user.email });

      if (!user) return res.status(404).json({ message: "User not found" });

      const edit = await Users.updateOne({ email: session.user.email });

      if (!(edit && edit.matchedCount))
        return res.status(503).json({ message: "Database Error" });

      return res
        .status(200)
        .json({ message: "Please change your original account's Image" });
    }
  } else {
    if (verification) {
      if (req.method === "PUT") {
        const user = await Users.findOne({ email: req.body.email });

        if (!user) return res.status(404).json({ message: "User not found" });

        const edit = await Users.updateOne(
          { email: req.body.email },
          {
            $set: {
              "image.url": req.body.image.url,
              "image.delete": req.body.image.url,
              "image.position": req.body.image.position,
            },
          }
        );

        if (!(edit && edit.matchedCount))
          return res.status(503).json({ message: "Database Error" });

        return res.status(200).json({ message: "Image updated successfully" });
      }

      if (req.method === "GET") {
        var decoded = jwt_decode(jwt);
        const user = await Users.findOne({ email: decoded.email });

        if (!user._id) {
          const serialised = serialize("authentication", null, {
            httpOnly: true,
            secure: process.env.VERCEL_ENV !== "development",
            sameSite: "strict",
            maxAge: -1,
            path: "/",
          });
          res.setHeader("Set-Cookie", serialised);
          return res.status(404).json({ message: "User not found" });
        }

        const requestData = {
          name: user.name,
          email: user.email,
          image: user.image,
        };

        res.status(200).json(requestData);
      }
    } else {
      const serialised = serialize("authentication", null, {
        httpOnly: true,
        secure: process.env.VERCEL_ENV !== "development",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      });
      res.setHeader("Set-Cookie", serialised);
      return res.status(401).json({ message: "Invalid Token" });
    }
  }
}
