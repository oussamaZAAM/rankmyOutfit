import Users from "@/model/Schema";
import { serialize } from "cookie";
import { verify } from "jsonwebtoken";

export default async function Handler(req, res) {
    if (req.method === 'POST') {
        try {
            const jwt = req.body.token;
            // const { cookies } = req;
            // const isJwt = cookies.authentication;
            // if (!isJwt) return res.status(501).json({message: "Invalid Token"});
            verify(jwt, process.env.JWT_SECRET);
            return res.status(200).json({message: "Valid Token"});
        } catch (e) {
            const serialised = serialize("authentication", null, {
                httpOnly: true,
                secure: process.env.NEXT_ENV !== "dev",
                sameSite: "strict",
                maxAge: -1,
                path: "/",
            });
            res.setHeader("Set-Cookie", serialised);
            return res.status(501).json({message: "Invalid Token"});
        }
    }
}