
import getFileList from '../utils/getFileList';
import * as Router from 'koa-router';

const router = new Router();

router.get('/', async ctx => {
  ctx.body = { message: 'this my blog api' };
});

let path = __dirname;
let array = getFileList(path).map(i => i.routes());

router.use('/', ...array);


export default router;
