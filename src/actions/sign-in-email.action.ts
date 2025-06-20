'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function signInEmailAction(formData: FormData) {
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    // 유효성 검사 후 에러 메시지 출력_toast에 적용할 에러 메시지만 반환함
    if (!email || !password) {
        return {
            error: `Please enter your ${!email ? 'email' : 'password'}`,
        };
    }

    try {
        // better-auth 에서 제공하는 서버측 signInEmail 함수 사용
        await auth.api.signInEmail({
            headers: await headers(), // 사용자 브라우저 정보도 알수 있음
            body: {
                email,
                password,
            },
        });

        return { error: null };
    } catch (err) {
        if (err instanceof Error) {
            return { error: 'Oops! Something went wrong. While logging in.' };
        }

        return { error: 'Internal Server Error' };
    }
}
