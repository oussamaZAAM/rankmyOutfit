import { posts } from '/mockData'

export default function Handler(req, res) {
    return res.status(200).json(posts);
}