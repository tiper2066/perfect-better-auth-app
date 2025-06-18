import { PrismaClient } from '@/generated/prisma'; // @prisma/client 는 예전 방식임

const globalForPrisma = global as unknown as { prisma: PrismaClient }; // PrismaClient를 전역객체로 변환

export const prisma = globalForPrisma.prisma || new PrismaClient(); // 전역객체를 prisma 변수로 내보냄

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma; // 만일 개발모드 라면 전역객체를 사용함
