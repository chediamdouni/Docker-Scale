'use server';

import { db } from '@/db';
import { users } from '@/db/schema';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

export async function registerUser(formData: {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email?: string;
}) {
  try {
    const hashedPassword = await bcrypt.hash(formData.password, 10);

    await db.insert(users).values({
      username: formData.username,
      password: hashedPassword,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email || null,
    });

    const [newUser] = await db
      .select()
      .from(users)
      .where(eq(users.username, formData.username));

    if (!newUser) {
      return { error: 'Failed to create user' };
    }

    return { 
      success: true, 
      user: { 
        id: newUser.id, 
        username: newUser.username,
        email: newUser.email 
      } 
    };
  } catch (error) {
    console.error('Error registering user:', error);
    return { error: 'Failed to register user' };
  }
} 