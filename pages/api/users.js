import Users from "@/model/Schema";

export default async function Handler(req, res) {
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
}