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
        autoSignIn: false, //  자동로그인 비활성 (이메일 인증해야 함)
    },
    advanced: {
        database: {
            generateId: false, //  false : Id 가 생성되지 않게 설정함
        },
    },
});
