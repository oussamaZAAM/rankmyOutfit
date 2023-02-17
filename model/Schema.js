import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    image: {
        url: String,
        delete: String,
        position: {
            left: Number,
            top: Number
        }
    },
        
}, { typeKey: '$type' })

const Users = models.User || model("User", userSchema);

export default Users;