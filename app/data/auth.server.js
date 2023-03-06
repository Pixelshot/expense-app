import { prisma } from './database.server';
import { hash } from 'bcryptjs';

export async function signup({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    const error = new Error('User with provided email already exists');
    error.status = 422;
    throw error;
  }

  const hashedPassword = await hash(password, 12);
  // The second argument is the number of salt rounds
  // In our case we set it to 12

  await prisma.user.create({
    data: { email: email, password: hashedPassword },
  });
}
