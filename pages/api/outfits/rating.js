import { serialize } from "cookie";
import jwt_decode from "jwt-decode";
import { verify } from "jsonwebtoken";
import { getSession } from "next-auth/react";
import Outfits from "@/model/OutfitSchema";

// Update Rating values
export default async function Handler(req, res) {
  if (req.method === "PUT") {
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
      //Rate Posts by (Google / Facebook / ...) users
      return 0;
    } else {
      if (verification) {
        // Rate Posts by JWT users
        
        var decodedUser = jwt_decode(jwt);
        const thisOutfit = await Outfits.findById(req.body._id)
        const allRaters = thisOutfit.raters.filter(rater => rater.id !== decodedUser._id)
        allRaters.push({
            _id: decodedUser._id,
            rating: req.body.myRating.rating
        })
        console.log(allRaters)
        const edit = await Outfits.updateOne(
            { _id: req.body._id },
            {
              $set: {
                "raters": allRaters
              },
            }
          );
        return 0;
      } else {
        //Delete non authenticated user's cookies
        const serialised = serialize("authentication", null, {
          httpOnly: true,
          secure: process.env.VERCEL_ENV !== "development",
          sameSite: "strict",
          maxAge: -1,
          path: "/",
        });
        res.setHeader("Set-Cookie", serialised);
        return res.status(501).json({ message: "Invalid Token" });
      }
    }
  }
}
