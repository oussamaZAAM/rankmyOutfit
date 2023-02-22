import { Schema, model, models } from "mongoose";

const outfitSchema = new Schema({
    author: String,
    type: {
        type: String,
        required: true,
    },
    image: [{
        url: String,
        delete: String,
        position: {
            left: Number,
            top: Number
        },
        rate: Number,
    }],
    raters: [{
        email: String,
        rating: Number,
    }],
});

const Outfits = models.Outfit || model("Outfit", outfitSchema);

export default Outfits;