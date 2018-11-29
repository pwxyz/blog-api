
import * as redis from 'redis';
import { promisify } from 'util';

const redis_host = process.env.REDIS_HOST;
const redis_port = process.env.REDIS_HOST;

export const client = redis.createClient(Number(redis_port), redis_host);


export const getAsync = promisify(client.get).bind(client);

export const setAsync = promisify(client.set).bind(client);

export const hmsetAsync = promisify(client.HMSET).bind(client);

export const hmgetAsync = promisify(client.HMGET).bind(client);

