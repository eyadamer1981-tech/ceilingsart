import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import connectDB from './mongodb';

let cachedBucket: GridFSBucket | null = null;

export async function getGridFSBucket(): Promise<GridFSBucket> {
  await connectDB();
  if (cachedBucket) return cachedBucket;
  const db = mongoose.connection.db;
  if (!db) throw new Error('MongoDB connection not initialized');
  cachedBucket = new GridFSBucket(db, { bucketName: 'images' });
  return cachedBucket;
}









