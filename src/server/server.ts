require('dotenv').config();

import * as Koa from 'koa';
import * as serve from 'koa-static';

const app = new Koa();

app.use(serve('./build/htdocs'));

app.listen(process.env.PORT);