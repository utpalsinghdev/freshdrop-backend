import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
    PORT: port(),
    DATABASE_URL : str(),
    JWT_SECRET: str(),
});
