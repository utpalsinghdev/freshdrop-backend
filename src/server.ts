import app from "./app";
import env from "./utils/validateEnv"

const port = env.PORT;


    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port} 🚀`);
});