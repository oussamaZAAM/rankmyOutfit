import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    image: String,
    delete_image: String
})

const Users = models.User || model("User", userSchema);

export default Users;