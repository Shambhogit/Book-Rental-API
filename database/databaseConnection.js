import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.DATABASE_URI;

function connectToDB() {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message); 
    });
}

export default connectToDB;
