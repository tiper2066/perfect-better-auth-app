import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@/lib/prisma';

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),
    // 이메일 비번 기능 활성화
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6, // 최소 비번 글자수
    },
});
