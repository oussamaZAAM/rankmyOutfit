import Users from "@/model/UserSchema";
import { serialize } from "cookie";
import { verify } from "jsonwebtoken";

export default async function Handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { cookies } = req;
            const cookieToken = cookies.authentication;
            const authToken = req.headers.authorization;
            if (authToken) {
                verify(authToken, process.env.JWT_SECRET)
            } else {
                verify(cookieToken, process.env.JWT_SECRET)
            }
            return res.status(200).json({message: "Valid Token"});
        } catch (e) {
            const serialized = serialize("authentication", null, {
                httpOnly: true,
                secure: process.env.VERCEL_ENV !== "development",
                sameSite: "strict",
                maxAge: -1,
                path: "/",
            });
            res.setHeader("Set-Cookie", serialized);
            return res.status(401).json({message: "Invalid Token"});
        }
    }
}