import * as Koa from 'koa';
import * as cors from 'koa-cors';
import * as bodyparser from 'koa-bodyparser';

import * as dotenv from 'dotenv';

dotenv.config();

import { getAsync }  from './redis';



getAsync('name').then(res => console.log(res));

require('./db');

const app = new Koa();
const port = process.env.PORT || 3300;


app.use(cors());
app.use(bodyparser());

app.use(async ctx => {
  ctx.body = { message: 'hello world' };
});


app.listen(port, () => { console.log('this app is running on ' + port) });

