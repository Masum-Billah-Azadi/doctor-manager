<<<<<<< HEAD
=======
// lib/dbConnect.js
>>>>>>> 73417577dec493477156b1aa73d13ac556e62453
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose || { conn: null, promise: null };

<<<<<<< HEAD
async function dbConnect() {
=======
export async function dbConnect() {
>>>>>>> 73417577dec493477156b1aa73d13ac556e62453
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'doctorApp',
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
<<<<<<< HEAD

export default dbConnect;
=======
>>>>>>> 73417577dec493477156b1aa73d13ac556e62453
