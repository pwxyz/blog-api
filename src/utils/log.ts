import { getLogger, configure }  from 'log4js';

const logger = getLogger();

logger.level = 'all';

configure({
  appenders: { cheese: { type: 'file', filename: 'log/err.log' }},
  categories: { default: { appenders: ['cheese'], level: 'error' }}
});


export default logger;