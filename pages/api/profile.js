import Users from "@/model/Schema";
import { verify } from "jsonwebtoken";

export default async function Handler(req, res) {
    try {
        const { cookies } = req;
        const jwt = cookies.authentication;
        verify(jwt, process.env.JWT_SECRET);

        if (req.method === 'PUT') {
            const user = await Users.findOne({email: req.body.email});

            if (!user) return res.status(404).json({message: 'User not found'});

            const edit = await Users.updateOne(
                {email: req.body.email},
                { $set: {"image.url": req.body.image.url, "image.delete": req.body.image.url, "image.position": req.body.image.position}}
            )

            if (!(edit && edit.matchedCount)) return res.status(503).json({message: 'Database Error'});

            return res.status(200).json({message: 'Image updated successfully'});
        }

        if (req.method === 'POST') {
            const user = await Users.findOne({email: req.body.email});

            if (!user) return res.status(404).json({message: 'User not found'});

            const requestData = {
                name: user.name,
                email: user.email,
                image: user.image
            }

            res.status(200).json(requestData);
        }


    } catch (e) {
        return res.status(501).json({message: "Invalid Token"});
    }
}