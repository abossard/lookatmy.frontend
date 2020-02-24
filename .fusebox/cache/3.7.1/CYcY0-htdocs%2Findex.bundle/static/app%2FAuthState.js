module.exports = { contents: "\"use strict\";\nvar _a;\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst tslib_1 = require(\"tslib\");\nconst ADAL = require(\"adal-ts\");\nconst adal_ts_1 = require(\"adal-ts\");\nconst mobx_1 = require(\"mobx\");\nconst config = new ADAL.AdalConfig(process.env.AD_CLIENT_ID, process.env.AD_TENANT, process.env.AD_CALLBACK_URL, process.env.AD_CALLBACK_URL, \"token\", `resource=${process.env.AD_RESOURCE}`);\nconst context = (process.env.PLATFORM === \"browser\") ? ADAL.Authentication.getContext(config) : undefined;\nclass AuthState {\n    constructor() {\n        this.loggedIn = false;\n    }\n    login() {\n        context.login();\n    }\n    process() {\n        ADAL.Authentication.getAadRedirectProcessor().process();\n        // this.token = context!.getToken();\n        // this.user = context!.getUser();\n        this.loggedIn = this.user !== null && this.token !== null;\n    }\n    logout() {\n        context.logout();\n    }\n}\ntslib_1.__decorate([\n    mobx_1.observable,\n    tslib_1.__metadata(\"design:type\", Object)\n], AuthState.prototype, \"loggedIn\", void 0);\ntslib_1.__decorate([\n    mobx_1.observable,\n    tslib_1.__metadata(\"design:type\", String)\n], AuthState.prototype, \"token\", void 0);\ntslib_1.__decorate([\n    mobx_1.observable,\n    tslib_1.__metadata(\"design:type\", typeof (_a = typeof adal_ts_1.User !== \"undefined\" && adal_ts_1.User) === \"function\" ? _a : Object)\n], AuthState.prototype, \"user\", void 0);\nexports.default = AuthState;\n",
dependencies: ["tslib","adal-ts","adal-ts","mobx","process"],
sourceMap: {},
headerContent: ["/* fuse:injection: */ var process = require(\"process\");"],
mtime: 1582553753192,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
