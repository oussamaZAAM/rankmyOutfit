import axios from "axios";


export default async function upload(req, res) {
    await axios.post('https://api.imgbb.com/1/upload?&key='+process.env.IMGBB_KEY, req.body.data)
        .then(function (response) {
          res.status(201).json(response);
        })
        .catch(function (error) {
          res.status(400).json(error.message);
        });
}