import mongoose from "mongoose";

const connectMongo = async() => {
    try {
        mongoose.set("strictQuery", false);
        const { connection } = await mongoose.connect(process.env.MONGO_URL, () => {
            console.log("Connected to MongoDB");
          });

        if (connection.readyState === 1) {
            return Promise.resolve(true)
        }
    } catch (err) {
        return Promise.reject(err);
    }
}

export default connectMongo;