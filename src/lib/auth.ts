import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@/lib/prisma';
import { hashPassword, verifyPassword } from '@/lib/argon2'; //  argon2 암호화 패키지
import { nextCookies } from 'better-auth/next-js'; //  better-auth 제공 Cookie 핸들러
import { createAuthMiddleware, APIError } from 'better-auth/api'; //  better-auth api 가져옴
import { normalizeName, VALID_DOMAINS } from '@/lib/utils'; //  normalizeName, VALID_DOMAINS 가져옴

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
    //  hooks 옵션 설정
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path === '/sign-up/email') {
                const email = String(ctx.body.email);
                const domain = email.split('@')[1].toLowerCase();

                if (!VALID_DOMAINS().includes(domain)) {
                    throw new APIError('BAD_REQUEST', {
                        message: 'Invalid domain. Please use a valid email.',
                    });
                }

                const name = ctx.body.name
                    ? normalizeName(ctx.body.name)
                    : undefined;

                return {
                    context: { ...ctx, body: { ...ctx.body, name } },
                };
            }

            // sign-up 외 요청은 body를 그대로 반환
            return { context: ctx };
        }),
    },

    //  Session 옵션을 설정한다
    session: {
        expiresIn: 30 * 24 * 60 * 60, // 세션 만료 시간: 30일, 15 면 15초 동안만 유지됨
    },
    advanced: {
        database: {
            generateId: false, //  false : Id 가 생성되지 않게 설정함
        },
    },
    plugins: [nextCookies()], //  better-auth 제공 Cookie 관련 플러그인 사용
});
//  better-auth APIError 를 사용할 수 있도록 내보내기
export type ErrorCode = keyof typeof auth.$ERROR_CODES | 'UNKNOWN';
