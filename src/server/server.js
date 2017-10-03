"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var dotenv = require("dotenv");
var Koa = require("koa");
var bodyParser = require("koa-bodyparser");
var passport = require("koa-passport");
var route = require("koa-route");
var session = require("koa-session");
var serve = require("koa-static");
var AD = require("passport-azure-ad");
var passport_facebook_1 = require("passport-facebook");
dotenv.config();
var _a = process.env, _b = _a.PORT, PORT = _b === void 0 ? 3001 : _b, _c = _a.HOST, HOST = _c === void 0 ? "0.0.0.0" : _c, _d = _a.REDIS_API_URL, REDIS_API_URL = _d === void 0 ? "" : _d, _e = _a.SESSION_SECRET, SESSION_SECRET = _e === void 0 ? "NO SECRET" : _e, _f = _a.FACEBOOK_APP_ID, FACEBOOK_APP_ID = _f === void 0 ? "NO ID" : _f, _g = _a.FACEBOOK_APP_SECRET, FACEBOOK_APP_SECRET = _g === void 0 ? "NO SECRET" : _g, _h = _a.FACEBOOK_CALLBACK_URL, FACEBOOK_CALLBACK_URL = _h === void 0 ? "NO CALLBACK URL" : _h, _j = _a.AD_CALLBACK_URL, AD_CALLBACK_URL = _j === void 0 ? "" : _j, _k = _a.AD_CLIENT_ID, AD_CLIENT_ID = _k === void 0 ? "" : _k, _l = _a.AD_CLIENT_SECRET, AD_CLIENT_SECRET = _l === void 0 ? "" : _l, _m = _a.AD_AUTHORITY_URL, AD_AUTHORITY_URL = _m === void 0 ? "" : _m;
var app = new Koa();
var fetchUser = function (criterion) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, Object.assign({ id: 1, username: "test" }, criterion)];
    });
}); };
passport.serializeUser(function (user, done) {
    done(null, JSON.stringify(user));
});
passport.deserializeUser(function (id, done) { return __awaiter(_this, void 0, void 0, function () {
    var user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetchUser(JSON.parse(id))];
            case 1:
                user = _a.sent();
                done(null, user);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                done(err_1, null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
passport.use(new AD.OIDCStrategy({
    allowHttpForRedirectUrl: true,
    clientID: AD_CLIENT_ID,
    clientSecret: AD_CLIENT_SECRET,
    identityMetadata: AD_AUTHORITY_URL,
    redirectUrl: AD_CALLBACK_URL,
    responseMode: "query",
    responseType: "id_token",
    tenantIdOrName: "srds.onmicrosoft.com"
}, function (iss, sub, profile, accessToken, refreshToken, done) {
    fetchUser({ azureIss: iss, azureSub: sub, profile: profile })
        .then(function (user) { done(null, user); })["catch"](done);
}));
passport.use(new passport_facebook_1.Strategy({
    callbackURL: FACEBOOK_CALLBACK_URL,
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    profileFields: ["id", "displayName", "photos", "email"]
}, function (accessToken, refreshToken, profile, cb) {
    fetchUser({ facebookId: profile.id, displayName: profile.displayName })
        .then(function (user) { cb(null, user); })["catch"](cb);
}));
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
    successRedirect: "/nice"
})));
app.use(route.get("/auth/ad", passport.authenticate("azuread-openidconnect", {
    prompt: "login",
    tenantIdOrName: "srds.onmicrosoft.com"
})));
app.use(route.get("/auth/ad/callback", passport.authenticate("azuread-openidconnect", {
    failureRedirect: "/",
    successRedirect: "/nice",
    tenantIdOrName: "srds.onmicrosoft.com"
})));
app.use(route.get("/nice", function (context) {
    if (context.isAuthenticated()) {
        context.body = "Logged in: " + JSON.stringify(context.state.user);
    }
    else {
        context.body = "Really not logged in";
    }
}));
app.use(route.get("/logout", function (context) {
    context.logout();
    context.redirect("/");
}));
app.use(serve("./build/htdocs"));
app.listen(Number(PORT), HOST, function () {
    process.stdout.write("Running on http://" + HOST + ":" + PORT + " \n");
    process.stdout.write("Redis at " + REDIS_API_URL + "\n");
});
process.on("SIGINT", function () {
    process.stdout.write("Shutdown.");
    process.exit(0);
});
