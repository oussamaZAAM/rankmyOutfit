import Users from "@/model/Schema";

export default async function Handler(req, res) {
    if (req.method === 'PUT') {
        console.log(req.body)
        const user = await Users.findOne({email: req.body.email});

        if (!user) return res.status(503).json({message: 'Database Error'});

        const edit = await Users.updateOne(
            {email: req.body.email},
            { $set: {image: req.body.image}}
        );

        if (!(edit && edit.matchedCount)) return res.status(503).json({message: 'Database Error'});

        return res.status(200).json({message: 'Image updated successfully'});
    }
}