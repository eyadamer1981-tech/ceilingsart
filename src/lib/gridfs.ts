import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import connectDB from './mongodb';

let cachedBucket: GridFSBucket | null = null;

export async function getGridFSBucket(): Promise<GridFSBucket> {
  await connectDB();
  if (cachedBucket) return cachedBucket;
  const db = mongoose.connection.db;
  if (!db) throw new Error('MongoDB connection not initialized');
  
  // Create GridFS bucket with optimized settings
  cachedBucket = new GridFSBucket(db, { 
    bucketName: 'images',
    // Optimize chunk size for better performance (default is 255KB)
    chunkSizeBytes: 1024 * 1024, // 1MB chunks for better streaming
  });
  
  return cachedBucket;
}









