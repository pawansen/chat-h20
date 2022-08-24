import mongoose from 'mongoose'
import { env } from '../../infrastructure/env'
import {logger} from '../../api/lib/logger'
/** mongodb connection**/
export const dbConnectionCreate = () : void =>{
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    };
    mongoose .connect(env.MONGO_URL!, options)
        .then((res) => {
          logger.info(
            'Connected to Distribution API Database - Initial Connection '+env.MONGO_URL
          );
        })
        .catch((err) => {
          logger.error(
            `Initial Distribution API Database connection error occured -`+env.MONGO_URL,
            err
          );
        });

   const db = mongoose.connection;
}

