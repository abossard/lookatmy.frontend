import * as dotenv from "dotenv";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as passport from "koa-passport";
import * as session from "koa-session";
import * as serve from "koa-static";

// import {Strategy as LocalStrategy} from "passport-local";

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

/*var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://www.example.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));*/

app.proxy = true;
app.keys = ["your-session-secret"];

// sessions
app.use(session({}, app));

// body parser
app.use(bodyParser());

app.use(serve("./build/htdocs"));

app.listen(Number(PORT), HOST, () => {
    process.stdout.write(`Running on http://${HOST}:${PORT} \n`);
    process.stdout.write(`Redis at ${REDIS_API_URL}\n`);
});

process.on("SIGINT", () => {
    process.stdout.write("Shutdown.");
    process.exit(0);
});
