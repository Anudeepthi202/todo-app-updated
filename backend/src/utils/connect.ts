// src/utils/connect.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connect = async () => {
  try {
    await prisma.$connect();
    console.log('PostgreSQL connected');
  } catch (error) {
    console.error('Error connecting to DB:', error);
    process.exit(1);
  }
};

export default connect;
