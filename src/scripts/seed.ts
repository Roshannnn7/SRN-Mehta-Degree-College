import { connectDB } from '../lib/db/connection';
import { AdminModel } from '../lib/db/models';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env or .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@srnmehtacollege.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ChangeThisPassword123!';

async function seedAdmin() {
  console.log('Seeding initial admin...');
  console.log(`Target Email: ${ADMIN_EMAIL}`);

  try {
    await connectDB();

    const existingAdmin = await AdminModel.findOne({ email: ADMIN_EMAIL.toLowerCase() });
    if (existingAdmin) {
      console.log(`Admin with email ${ADMIN_EMAIL} already exists. Skipping.`);
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, salt);

    await AdminModel.create({
      email: ADMIN_EMAIL.toLowerCase(),
      passwordHash,
      name: 'SRN Mehta Admin',
      role: 'super_admin',
      mustChangePassword: true,
    });

    console.log('Successfully seeded admin user!');
    console.log('Use your ADMIN_EMAIL and ADMIN_PASSWORD to login.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed admin:', error);
    process.exit(1);
  }
}

seedAdmin();
