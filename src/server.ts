import app from "./app";
import env from "../src/utils/validateEnv"
import mongoose from "mongoose";

const port = env.PORT;

mongoose.connect(env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port} 🚀`);
    });
}).catch((err) => {
    console.log(err);
});
