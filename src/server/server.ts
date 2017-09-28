require('dotenv').config();

import * as Koa from 'koa';
import * as serve from 'koa-static';

const {PORT, HOST, REDIS_API_URL} = process.env;

const app = new Koa();

app.use(serve('./build/htdocs'));

app.listen(Number(PORT), HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
    console.log(`Redis at ${REDIS_API_URL}`);
});

process.on('SIGINT', function () {
    console.log("Shutdown");
    process.exit(0);
});