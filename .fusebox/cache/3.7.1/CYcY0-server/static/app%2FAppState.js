module.exports = { contents: "\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst tslib_1 = require(\"tslib\");\nconst mobx_1 = require(\"mobx\");\nclass AppState {\n    constructor() {\n        this.timer = 0;\n        if (process.env.PLATFORM === \"browser\") {\n            setInterval(() => {\n                this.timer += 16;\n            }, 16);\n        }\n    }\n    resetTimer() {\n        this.timer += 1;\n    }\n}\ntslib_1.__decorate([\n    mobx_1.observable,\n    tslib_1.__metadata(\"design:type\", Object)\n], AppState.prototype, \"timer\", void 0);\nexports.default = AppState;\n",
dependencies: ["tslib","mobx","process"],
sourceMap: {},
headerContent: ["/* fuse:injection: */ var process = require(\"process\");"],
mtime: 1582554786872,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
