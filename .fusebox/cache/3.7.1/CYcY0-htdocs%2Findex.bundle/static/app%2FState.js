module.exports = { contents: "\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ApiTest_1 = require(\"./ApiTest\");\nconst AppState_1 = require(\"./AppState\");\nconst appState = new AppState_1.default();\nconst apiTest = new ApiTest_1.default();\nfunction createStore() {\n    return {\n        apiTest,\n        appState,\n    };\n}\nexports.createStore = createStore;\n",
dependencies: ["./ApiTest","./AppState"],
sourceMap: {},
headerContent: undefined,
mtime: 1582554957111,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
