
import { getAsync, setAsync } from '../redis';



export const getCache = async (url: string): Promise<object|Array<string|object>|string|number|boolean> => {
  let string: undefined|string = await getAsync(url);
  return JSON.parse(string);
};


export const setCache = async (url: string, arg: object|Array<string|object>|string|number|boolean, expire = 30) => {
  let args = typeof arg === 'string' ? arg : JSON.stringify(arg);
  let string = await setAsync(url, args, 'EX', expire);
  return string === 'OK';
};