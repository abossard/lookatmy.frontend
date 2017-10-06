import * as dotenv from "dotenv";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as serve from "koa-static";

dotenv.config();

const {
    PORT = 3001,
    HOST = "0.0.0.0",
    REDIS_API_URL = "",
} = process.env;

const app = new Koa();

app.proxy = true;

// body parser
app.use(bodyParser());

// AUTH routes

app.use(serve("./build/htdocs"));

app.listen(Number(PORT), HOST, () => {
    process.stdout.write(`Running on http://${HOST}:${PORT} \n`);
    process.stdout.write(`Redis at ${REDIS_API_URL}\n`);
});

process.on("SIGINT", () => {
    process.stdout.write("Shutdown.");
    process.exit(0);
});
