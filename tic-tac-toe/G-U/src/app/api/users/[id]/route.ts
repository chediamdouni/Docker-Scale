import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import path from 'path';
import fs from 'fs';

// Configure Multer to store files in the /public/uploads directory
/*const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Save file with a timestamp
      },
    }),
  });
  */
  // Middleware to handle Multer
//   async function runMiddleware(req: Request, res: Response, fn: any) {
//     return new Promise((resolve, reject) => {
//       fn(req, res, (result: any) => {
//         if (result instanceof Error) {
//           return reject(result);
//         }
//         return resolve(result);
//       });
//     });
//   }

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await db.select().from(users).where(eq(users.id, parseInt(params.id))).limit(1);
    if (user.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const formData = await request.formData();
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const username = formData.get('username') as string;
    const imageFile = formData.get('image') as File | null;

    let imagePath = null;
    if (imageFile) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const fileName = `${Date.now()}${path.extname(imageFile.name)}`;
      const filePath = path.join(uploadDir, fileName);
      
      const fileBuffer = await imageFile.arrayBuffer();
      fs.writeFileSync(filePath, new Uint8Array(fileBuffer));
      
      imagePath = `/uploads/${fileName}`;
    }

    const updatedUser = await db.update(users)
      .set({ 
        firstName, 
        lastName, 
        username, 
        image: imagePath, 
        updatedAt: new Date() 
      })
      .where(eq(users.id, parseInt(params.id)))
      .returning();
    if (updatedUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(updatedUser[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const deletedUser = await db.delete(users)
      .where(eq(users.id, parseInt(params.id)))
      .returning();
    if (deletedUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
