import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@/lib/prisma';
import { hashPassword, verifyPassword } from '@/lib/argon2'; //  argon2 암호화 패키지
import { nextCookies } from 'better-auth/next-js'; //  better-auth 제공 Cookie 핸들러

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),
    // 이메일 비번 기능 활성화
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6, // 최소 비번 글자수
        autoSignIn: false, //  자동로그인 비활성 (이메일 인증해야 함)
        //  비밀번호 암호화 시 argon2 적용
        password: {
            hash: hashPassword, // argon2 비밀번호 해쉬 함수 적용
            verify: verifyPassword, // argon2 비밀번호 검사 함수 적용
        },
    },
    // ********************** Session 옵션을 설정한다
    session: {
        expiresIn: 10, // 세션 만료 시간: 30일, 15 면 15초 동안만 유지됨
    },
    advanced: {
        database: {
            generateId: false, //  false : Id 가 생성되지 않게 설정함
        },
    },
    plugins: [nextCookies()], //  better-auth 제공 Cookie 관련 플러그인 사용
});
