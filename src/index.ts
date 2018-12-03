import * as Koa from 'koa';
import * as cors from 'koa-cors';
import * as bodyparser from 'koa-bodyparser';

import * as dotenv from 'dotenv';

import router from './routers';
import catchErr from './middlewares/catchErr';

dotenv.config();

// import { getAsync }  from './redis';



// getAsync('name').then(res => console.log(res));

require('./db');

const app = new Koa();
const port = process.env.PORT || 3300;


app.use(cors());
app.use(bodyparser());
app.use(catchErr);
app.use(router.routes());
app.use(router.allowedMethods());


app.listen(port, () => { console.log('this app is running on ' + port) });

