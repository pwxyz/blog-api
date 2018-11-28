
import * as mongoose from 'mongoose';


const db = mongoose.connection;
const env = process.env;
const host = env.DB_HOST || 'localhost';
const name = env.DB_NAME || 'blogs';

const url = `mongodb://${host}/${name}`;

mongoose.connect(url, { useNewUrlParser: true });

db.on('error', (err: string) => console.error.bind(console, err));
db.on('open', () => console.log('mongoose connect'));