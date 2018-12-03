
import * as Router from 'koa-router';
import Blog from '../models/Blog';
import Comment from '../models/Comment';
import { GET_MESSAGE_SUCCESS, GET_CODE_SUCCESS } from '../constants';


const blog = new Router({ prefix: 'blog' });

blog.get('/', async ctx => {
  let data = await Blog.find().select('-body -comments_url');
  ctx.body = { code: GET_CODE_SUCCESS, message: GET_MESSAGE_SUCCESS, data };
  ctx.state.cache_res = { code: GET_CODE_SUCCESS, message: GET_MESSAGE_SUCCESS, data };
});

blog.get('/:id', async ctx => {
  let id = ctx.params.id;
  let obj = await Blog.findById(id);
  if (obj) {
    let comment = await Comment.find({ issue_url: obj['url'] }).sort({ id: 1 });
    let data = { ...(JSON.parse(JSON.stringify(obj))), comment };
    ctx.body = { code: GET_CODE_SUCCESS, message: GET_MESSAGE_SUCCESS, data };
    ctx.state.cache_res = { code: GET_CODE_SUCCESS, message: GET_MESSAGE_SUCCESS, data };
    return;
  }
  else {
    ctx.body = { code: 403, message: 'id不正确或者该文章已删除' };
    ctx.state.cache_res = { code: 403, message: 'id不正确或者该文章已删除' };
  }

});



export default blog;