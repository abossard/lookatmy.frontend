import dotenv from "dotenv";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import passport from "koa-passport";
import session from "koa-session";
import serve from "koa-static";
import {Strategy as LocalStrategy} from "passport-local";

const log = process.stdout.write;
dotenv.config();

const {PORT, HOST, REDIS_API_URL} = process.env;

const app = new Koa();

const fetchUser = async () => {
    return { id: 1, username: "test", password: "test" };
};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await fetchUser();
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new LocalStrategy((username, password, done) => {
    fetchUser()
        .then((user) => {
            if (username === user.username && password === user.password) {
                done(null, user);
            } else {
                done(null, false);
            }
        })
        .catch((err) => done(err));
}));

app.proxy = true;
app.keys = ["your-session-secret"];

// sessions
app.use(session({}, app));

// body parser
app.use(bodyParser());

app.use(serve("./build/htdocs"));

app.listen(Number(PORT), HOST, () => {
    log(`Running on http://${HOST}:${PORT}`);
    log(`Redis at ${REDIS_API_URL}`);
});

process.on("SIGINT", () => {
    log("Shutdown");
    process.exit(0);
});
