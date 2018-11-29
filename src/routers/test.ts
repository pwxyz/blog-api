import * as Router from 'koa-router';
// import Blog from '../models/Blog';
// import Comment from '../models/Comment';
import { hmgetAsync, hmsetAsync, client }  from '../redis';


const test = new Router({ prefix: 'test' });


test.get('/', async ctx => {
  let obj = await hmgetAsync(0);
  ctx.body = { code: 200, message: 'get success', obj };
  return;
});

test.post('/', async ctx => {
  let { url, obj } = ctx.request['body'];
  // await hmsetAsync(url, obj);
  // client.hmset(url, obj);
  // client.hmget(url, 'namexxx', (err, msg) => {
  //   console.log(err);
  //   return ctx.body = { code: 201, message: '设置成功', url, obj, msg };
  // });
  // client.hmset('hosts', 'mjr', '1', 'another', '23', 'home', '1234');
  // client.hgetall('hosts', function (err, obj) {
  //   console.dir(obj, err);
  // });
  await hmsetAsync('test', 'aas', '234', 'another', '23', 'home', '1234');
  let data = await hmgetAsync('test', 'aas');
  ctx.body = { code: 201, message: 'xx', data };
});


export default test;