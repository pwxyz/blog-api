
import * as redis from 'redis';
import { promisify } from 'util';

// const redis_host = process.env.REDIS_HOST;
// const redis_port = process.env.REDIS_HOST;
console.log('init');
const client = redis.createClient();

// const methodArr = ['get', 'set'];

// interface Method{
//   getSync: Promise<any>;
// }

// const redisAsync = {};

// methodArr.forEach(i => {
//   redisAsync[`${i}Async`] = promisify(client[i]).bind(client);
// });


// export default redisAsync;

export const getAsync = promisify(client.get).bind(client);

export const setAsync = promisify(client.set).bind(client);

