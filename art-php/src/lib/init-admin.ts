import bcrypt from 'bcryptjs';
import connectDB from './mongodb';
import { Admin } from './models';

export async function initializeAdmin() {
  try {
    await connectDB();
    
    const adminExists = await Admin.findOne({ email: 'admin@admin.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin@123', 10);
      const admin = new Admin({
        email: 'admin@admin.com',
        password: hashedPassword,
      });
      await admin.save();
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
}

