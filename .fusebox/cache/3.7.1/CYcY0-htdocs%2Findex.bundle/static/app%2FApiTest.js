module.exports = { contents: "\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst tslib_1 = require(\"tslib\");\nconst mobx_1 = require(\"mobx\");\nclass ApiTest {\n    async makeCall(accessToken) {\n        const headers = new Headers();\n        headers.append(\"Authorization\", \"Bearer \" + accessToken);\n        headers.append(\"Ocp-Apim-Subscription-Key\", process.env.API_SUBSCRIPTION_KEY);\n        const response = await fetch(process.env.API_SOLUTIONS_URL, {\n            headers,\n        });\n        this.result = JSON.stringify(await response.json());\n    }\n}\ntslib_1.__decorate([\n    mobx_1.observable,\n    tslib_1.__metadata(\"design:type\", String)\n], ApiTest.prototype, \"result\", void 0);\nexports.default = ApiTest;\n",
dependencies: ["tslib","mobx","process"],
sourceMap: {},
headerContent: ["/* fuse:injection: */ var process = require(\"process\");"],
mtime: 1582437322689,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
