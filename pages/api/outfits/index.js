import { posts } from '/mockData'

export default function Handler(req, res) {
    if (req.method === 'GET') {
        return res.status(200).json(posts);
    }

    if (req.method === 'POST') {
        console.log(req.body.token);
        return res.status(200).json(req.body);
    }
}