import mongoose from 'mongoose';

import { APIError } from '/lib/util';

if (process.env.DEBUG) mongoose.set('debug', true);

let isConnected;

export default async () => {
  if (!isConnected) {
    try {
      const db = await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      isConnected = db.connections[0].readyState;
    } catch (err) {
      throw new APIError(500, `Couldn't connect to database (${err.message})`);
    }
  }
};
