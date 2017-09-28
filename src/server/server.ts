import * as dotenv from "dotenv";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as passport from "koa-passport";
import * as route from "koa-route";
import * as session from "koa-session";
import * as serve from "koa-static";
import {Strategy as FacebookStrategy} from "passport-facebook";

dotenv.config();

const {
    PORT = 3001,
    HOST = "0.0.0.0",
    REDIS_API_URL = "",
    SESSION_SECRET = "NO SECRET",
    FACEBOOK_APP_ID = "NO ID",
    FACEBOOK_APP_SECRET = "NO SECRET",
    FACEBOOK_CALLBACK_URL = "NO CALLBACK URL",
} = process.env;

const app = new Koa();

const fetchUser = async (criterion: object) => {
    return Object.assign({ id: 1, username: "test" }, criterion);
};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await fetchUser({id});
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new FacebookStrategy({
        callbackURL: FACEBOOK_CALLBACK_URL,
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        profileFields: ["id", "displayName", "photos", "email"],
    },
    (accessToken, refreshToken, profile, cb) => {
        fetchUser({ facebookId: profile.id }).then((user) => { cb(null, user); } ).catch(cb);
    },
));

app.proxy = true;
app.keys = [SESSION_SECRET];

// sessions
app.use(session({}, app));

// body parser
app.use(bodyParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(route.get("/auth/facebook", passport.authenticate("facebook")));
app.use(route.get("/auth/facebook/callback", passport.authenticate("facebook", {
    failureRedirect: "/",
    successRedirect: "/nice",
})));

app.use(route.get("/nice", (context) => {
    if (context.isAuthenticated()) {
        context.body = "Logged in";
    } else {
        context.body = "Really not logged in";
    }
}));

app.use(route.get("/logout", (context) => {
    context.logout();
    context.redirect("/");
}));

app.use(serve("./build/htdocs"));

app.listen(Number(PORT), HOST, () => {
    process.stdout.write(`Running on http://${HOST}:${PORT} \n`);
    process.stdout.write(`Redis at ${REDIS_API_URL}\n`);
});

process.on("SIGINT", () => {
    process.stdout.write("Shutdown.");
    process.exit(0);
});
