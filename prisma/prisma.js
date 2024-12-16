import { PrismaClient } from '@prisma/client';

// Создаём единственный экземпляр PrismaClient
const prisma = new PrismaClient();

export default prisma;