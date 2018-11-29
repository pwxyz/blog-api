
import * as Router from 'koa-router';
import Blog from '../models/Blog';
import Comment from '../models/Comment';


const blog = new Router({ prefix: 'blog' });

blog.get('/', async ctx => {
  let data = await Blog.find();
  ctx.body = { code: 200, message: '成功', data };
});

blog.get('/:id', async ctx => {
  let id = ctx.params.id;
  let obj = await Blog.findById(id);
  if (obj) {
    let comment = await Comment.find({ issue_url: obj['url'] }).sort({ id: 1 });
    let data = { ...(JSON.parse(JSON.stringify(obj))), comment };
    ctx.body = { code: 200, message: '成功', data };
    return;
  }
  else {
    ctx.body = { code: 403, message: 'id不正确或者该文章已删除' };
  }

});



export default blog;