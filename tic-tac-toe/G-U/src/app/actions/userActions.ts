"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { writeFile } from "fs/promises";
import { join } from "path";
import fs from "fs";

export async function getUsers() {
  try {
    return await db.select().from(users);
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
}

export async function createUser(formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const username = formData.get("username") as string;
    const image = formData.get("image") as File | null;

    let imagePath: string | null = null;
    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}_${image.name}`;
      const uploadDir = join(process.cwd(), "public", "uploads");
      const filePath = join(uploadDir, fileName);
      await writeFile(filePath, buffer);
      imagePath = `/uploads/${fileName}`;
    }

    const [user] = await db
      .insert(users)
      .values({
        firstName,
        lastName,
        username,
        image: imagePath,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return user;
  } catch (error) {
    throw new Error("Failed to create user");
  }
}

export async function updateUser(id: number, formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const username = formData.get("username") as string;
    const imageFile = formData.get("image") as File | null;

    let imagePath = null;
    if (imageFile) {
      const uploadDir = join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const fileName = `${Date.now()}${imageFile.name}`;
      const filePath = join(uploadDir, fileName);

      const fileBuffer = await imageFile.arrayBuffer();
      fs.writeFileSync(filePath, new Uint8Array(fileBuffer));

      imagePath = `/uploads/${fileName}`;
    }

    const [updatedUser] = await db
      .update(users)
      .set({
        firstName,
        lastName,
        username,
        image: imagePath,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    throw new Error("Failed to update user");
  }
}

export async function deleteUser(id: number) {
  try {
    const [deletedUser] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    if (!deletedUser) {
      throw new Error("User not found");
    }

    return { message: "User deleted successfully" };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    } else {
      throw new Error("Failed to delete user: Unknown error");
    }
  }
}
