module.exports = { contents: "\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = require(\"react\");\nconst ReactDOM = require(\"react-dom\");\nconst typestyle_1 = require(\"typestyle\");\nconst App_1 = require(\"./App\");\nconst State_1 = require(\"./State\");\nconst store = State_1.createStore();\nif (module.hot) {\n    module.hot.accept();\n}\nReactDOM.hydrate(React.createElement(App_1.App, Object.assign({}, store)), document.getElementById(\"root\"));\ntypestyle_1.setStylesTarget(document.getElementById(\"styles-target\"));\n",
dependencies: ["react","react-dom","typestyle","./App","./State"],
sourceMap: {},
headerContent: undefined,
mtime: 1582554964175,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
