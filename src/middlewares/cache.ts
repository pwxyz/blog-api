
import { getCache, setCache } from '../utils/cache';

//本中间件为缓存中间件，只缓存get方法得到的回复

//不需要缓存的url
// const noCacheUrl: Array<string> = ['/test'];

// //为true则需要缓存，false则无需缓存
// const check = (url: string) => {
//   let arr = noCacheUrl.map(i => url.substr(0, i.length) === i).filter(i => i);
//   return arr.length === 0;
// };


const cache = async (ctx, next) => {
  let url = ctx.url;
  let method = ctx.request.method;
  //非GET方法，不需要缓存
  if (method !== 'GET') {
    //不需要缓存
    return next();
  }
  else {
    let obj = await getCache(url);
    if (obj) {
      //从缓存获取，直接返回
      ctx.body = obj;
      return;
    }
    else {
      await next();
      // console.log('设置缓存');
      const objs = ctx.state || {};
      let obj = objs['cache_res'] || null;
      if (obj) {
        let config = objs['cache_config'] || {};
        setCache(config['url'] || url, obj, config['expire'] || Number(process.env.REDIS_EXPIRE));
        return;
      }
    }
  }
};


export default cache;