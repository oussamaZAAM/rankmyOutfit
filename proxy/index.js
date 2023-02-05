const { axios } = require('axios');
const imgbbUploader = require("imgbb-uploader");
var express = require('express')
var multer  = require('multer')
var dotenv  = require('dotenv')

var app = express()
dotenv.config();
var port = 5000;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.post('/api/upload', upload.single('image'), async function (req, res, next) {
    const options = {
        apiKey: process.env.IMGBB_KEY,
        imagePath: "./uploads/"+req.file.filename
    }
    imgbbUploader(options)
        .then((response) => res.status(200).json(response))
        .catch((error) => res.status(409).json({message: error}));
  })

var upload = multer({ storage: storage })

app.listen(port,() => console.log(`Server running on port ${port}!`))
