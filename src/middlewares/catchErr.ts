import log from '../utils/log';


const catchErr = (ctx, next) => {
  return next().catch(err => {
    log.error(err);
    ctx.body = { code: 500, message: 'service error' };
  });
};


export default catchErr;