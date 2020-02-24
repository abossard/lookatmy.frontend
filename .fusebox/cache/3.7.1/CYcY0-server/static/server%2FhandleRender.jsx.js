module.exports = { contents: "\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = require(\"react\");\nconst server_1 = require(\"react-dom/server\");\nconst typestyle_1 = require(\"typestyle\");\nconst App_1 = require(\"../app/App\");\nconst State_1 = require(\"../app/State\");\nconst renderHtml_1 = require(\"./renderHtml\");\nconst handleRender = async (ctx) => {\n    const store = State_1.createStore();\n    const appHtml = server_1.renderToString(React.createElement(App_1.App, Object.assign({}, store)));\n    const styles = typestyle_1.getStyles();\n    ctx.body = renderHtml_1.renderHtml(appHtml, styles, process.env.HTML_TITLE, JSON.stringify(store));\n};\nexports.handleRender = handleRender;\n",
dependencies: ["react","react-dom/server","typestyle","../app/App","../app/State","./renderHtml","process"],
sourceMap: {},
headerContent: ["/* fuse:injection: */ var process = require(\"process\");"],
mtime: 1582437322689,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
