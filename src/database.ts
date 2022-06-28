import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default function database() {
    const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env;

    if (MONGO_DB_URI === undefined || MONGO_DB_URI_TEST === undefined) {
        console.log(
            'The constants MONGO_DB_URI or MONGOD_DB_URI_TEST has not been found'
        );
        return;
    }

    const MONGO_CONNECTION =
        NODE_ENV === 'PRODUCTION' ? MONGO_DB_URI : MONGO_DB_URI_TEST;

    mongoose.connect(MONGO_CONNECTION);

    const db = mongoose.connection;

    db.on('error', (err) => {
        console.log('connection error: ', err);
    });

    db.once('open', () => {
        console.log('The database is operative');
        console.log('The database being using the mode: ', NODE_ENV);
    });
}
