import dotenv from "dotenv";
import * as Koa from "koa";
import * as serve from "koa-static";

const log = process.stdout.write;
dotenv.config();

const {PORT, HOST, REDIS_API_URL} = process.env;

const app = new Koa();

app.use(serve("./build/htdocs"));

app.listen(Number(PORT), HOST, () => {
    log(`Running on http://${HOST}:${PORT}`);
    log(`Redis at ${REDIS_API_URL}`);
});

process.on("SIGINT", () => {
    log("Shutdown");
    process.exit(0);
});
