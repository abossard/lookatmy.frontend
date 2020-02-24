module.exports = { contents: "\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst dotenv = require(\"dotenv\");\nconst Koa = require(\"koa\");\nconst mount = require(\"koa-mount\");\nconst serve = require(\"koa-static\");\nconst handleRender_1 = require(\"./handleRender\");\ndotenv.config();\nconst { PORT = 3001, HOST = \"0.0.0.0\", REDIS_API_URL = \"\", } = process.env;\nconst app = new Koa();\napp.proxy = true;\n// body parser\n// AUTH routes\napp.use(mount(\"/static\", serve(\"./build/htdocs\")));\napp.use(handleRender_1.handleRender);\napp.listen(Number(PORT), HOST, () => {\n    process.stdout.write(`Running on http://${HOST}:${PORT} \\n`);\n    process.stdout.write(`Redis at ${REDIS_API_URL}\\n`);\n});\nprocess.on(\"SIGINT\", () => {\n    process.stdout.write(\"Shutdown.\");\n    process.exit(0);\n});\n",
dependencies: ["dotenv","koa","koa-mount","koa-static","./handleRender","process"],
sourceMap: {},
headerContent: ["/* fuse:injection: */ var process = require(\"process\");"],
mtime: 1582553282419,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
