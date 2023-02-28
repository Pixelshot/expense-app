import { prisma } from './database.server';

export default async function signin({ email, password }) {
  const existingUser = await prisma.findFirst({ where: { email } });

  if (existingUser) {
    const error = new Error('User with provided email already exists');
    error.status = 422;
    throw error;
  }
}
