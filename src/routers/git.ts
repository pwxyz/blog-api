
import * as Router from 'koa-router';
import * as crypto from 'crypto';
import verifyValue from '../utils/verifyValue';
import Blog from '../models/Blog';
import Comment from '../models/Comment';

const git = new Router({ prefix: 'git' });


git.post('/', async ctx => {
  //注意webhook发送的格式为json
  const verify = () => {
    const hmac = crypto.createHmac('sha1', 'blogapiforme');
    hmac.update(JSON.stringify(ctx.request['body']));
    let str = hmac.digest('hex');
    return `sha1=${str}` === ctx.header['x-hub-signature'];
  };

  let isTrue = verify();
  if (isTrue) {
    const event = ctx.header['x-github-event'];
    const action = ctx.request['body']['action'];
    if (event === 'issues') {
      let obj = ctx.request['body']['issue'];
      if (obj['author_association'] !== 'OWNER') {
        ctx.body = { code: 403, message: '权限不符' };
        return;
      }
      if (action === 'deleted') {
        await Blog.findOneAndDelete({ url: obj['url'] });
        await Comment.deleteMany({ issue_url: obj['url'] });
        ctx.body = { code: 201, message: '删除成功' };
        return;
      }
      let arr = ['url', 'comments_url', 'title', 'created_at', 'updated_at', 'body', 'labels'];
      let objs = verifyValue(arr, obj);
      objs['created_at'] = Number(new Date(objs['created_at']));
      objs['updated_at'] = Number(new Date(objs['updated_at']));
      await Blog.findOneAndUpdate({ url: objs['url'] }, objs, { upsert: true });
      ctx.body = { code: 201, message: '成功' };
      return;
    }
    else if (event === 'issue_comment') {
      let obj = ctx.request['body']['comment'];

      if (ctx.request['body']['issue']['author_association'] !== 'OWNER') {
        ctx.body = { code: 403, message: '权限不符' };
        return;
      }
      if (action === 'deleted') {
        await Comment.findOneAndDelete({ id: obj['id'] });
        ctx.body = { code: 201, message: '删除成功' };
        return;
      }

      let arr = ['issue_url', 'id', 'user', 'updated_at', 'created_at', 'body'];
      let objs = verifyValue(arr, obj);
      objs['created_at'] = Number(new Date(objs['created_at']));
      objs['updated_at'] = Number(new Date(objs['updated_at']));
      await Comment.findOneAndUpdate({ id: objs['id'] }, objs, { upsert: true });
      ctx.body = { code: 201, message: '成功' };
      return;
    }
  }
  else {
    ctx.body = { code: 403, message: '无视' };
  }

});


export default git;