import * as dotenv from "dotenv";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as passport from "koa-passport";
import * as route from "koa-route";
import * as session from "koa-session";
import * as serve from "koa-static";
import * as AD from "passport-azure-ad";
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
    AD_CALLBACK_URL = "",
    AD_CLIENT_ID = "",
    AD_CLIENT_SECRET = "",
    AD_AUTHORITY_URL = "",
} = process.env;

const app = new Koa();

const fetchUser = async (criterion: object) => {
    return Object.assign({ id: 1, username: "test" }, criterion);
};

passport.serializeUser((user, done) => {
    done(null, JSON.stringify(user));
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await fetchUser(JSON.parse(id));
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new AD.OIDCStrategy({
    allowHttpForRedirectUrl: true,
    clientID: AD_CLIENT_ID,
    clientSecret: AD_CLIENT_SECRET,
    identityMetadata: AD_AUTHORITY_URL,
    redirectUrl: AD_CALLBACK_URL,
    responseMode: "query",
    responseType: "id_token",
    tenantIdOrName: "srds.onmicrosoft.com",
}, (iss, sub, profile, accessToken, refreshToken, done) => {
    fetchUser({ azureIss: iss, azureSub: sub, profile })
        .then((user) => { done(null, user); } ).catch(done);
}));

passport.use(new FacebookStrategy({
        callbackURL: FACEBOOK_CALLBACK_URL,
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        profileFields: ["id", "displayName", "photos", "email"],
    },
    (accessToken, refreshToken, profile, cb) => {
        fetchUser({ facebookId: profile.id, displayName: profile.displayName })
            .then((user) => { cb(null, user); } ).catch(cb);
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

app.use(route.get("/auth/ad", passport.authenticate("azuread-openidconnect", {
    prompt: "login",
    tenantIdOrName: "srds.onmicrosoft.com",
})));
app.use(route.get("/auth/ad/callback", passport.authenticate("azuread-openidconnect", {
    failureRedirect: "/",
    successRedirect: "/nice",
    tenantIdOrName: "srds.onmicrosoft.com",
})));

app.use(route.get("/nice", (context) => {
    if (context.isAuthenticated()) {
        context.body = "Logged in: " + JSON.stringify(context.state.user);
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
