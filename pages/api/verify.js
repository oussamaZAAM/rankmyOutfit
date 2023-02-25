import Users from "@/model/UserSchema";
import { serialize } from "cookie";
import { verify } from "jsonwebtoken";

export default async function Handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { cookies } = req;
            const cookieToken = cookies.authentication;
            const authToken = req.headers.authorization;
            // if (authToken && verify(authToken, process.env.JWT_SECRET)) {
            //     return res.status(200).json({message: "Valid Token"});
            // }
            console.log(authToken)
            if (authToken) {
                verify(authToken, process.env.JWT_SECRET)
            } else {
                verify(cookieToken, process.env.JWT_SECRET)
            }
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