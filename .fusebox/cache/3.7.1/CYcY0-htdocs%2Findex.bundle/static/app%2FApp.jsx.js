module.exports = { contents: "\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst tslib_1 = require(\"tslib\");\nconst mobx_react_1 = require(\"mobx-react\");\nconst React = require(\"react\");\nconst typestyle_1 = require(\"typestyle\");\nconst mainStyle = typestyle_1.style({\n    color: \"green\",\n    fontFamily: \"comic sans, helvetica\",\n});\nconst makeSomeSpacePlease = typestyle_1.style({\n    paddingTop: 20,\n});\nlet App = class App extends React.Component {\n    constructor() {\n        super(...arguments);\n        this.onReset = () => {\n            this.props.appState.resetTimer();\n        };\n    }\n    render() {\n        return (React.createElement(\"div\", { className: mainStyle },\n            React.createElement(\"h1\", null,\n                \"look at my \",\n                React.createElement(\"em\", null, \"xyz\")),\n            React.createElement(\"hr\", null),\n            React.createElement(\"dl\", null,\n                React.createElement(\"dt\", { className: makeSomeSpacePlease },\n                    React.createElement(\"h3\", null, \"Async state example\")),\n                React.createElement(\"dd\", null,\n                    React.createElement(\"p\", null, \"Count\"),\n                    React.createElement(\"button\", { onClick: this.onReset },\n                        \"Counter: \",\n                        this.props.appState.timer)))));\n    }\n};\nApp = tslib_1.__decorate([\n    mobx_react_1.observer\n], App);\nexports.App = App;\n",
dependencies: ["tslib","mobx-react","react","typestyle"],
sourceMap: {},
headerContent: undefined,
mtime: 1582555001340,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
