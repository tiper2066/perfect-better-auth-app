'use server';

import { auth, ErrorCode } from '@/lib/auth';
import { APIError } from 'better-auth/api';

export async function signUpEmailAction(formData: FormData) {
    const name = String(formData.get('name'));
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    // 유효성 검사 후 에러 메시지 출력_toast에 적용할 에러 메시지만 반환함
    if (!name || !email || !password) {
        return {
            error: `Please enter your ${
                !name ? 'name' : !email ? 'email' : 'password'
            }`,
        };
    }

    try {
        // better-auth 에서 제공하는 서버측 signUpEmail 함수 사용
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
            },
        });

        return { error: null };
    } catch (err) {
        if (err instanceof APIError) {
            const errCode = err.body ? (err.body.code as ErrorCode) : 'UNKNOWN';
            switch (errCode) {
                case 'USER_ALREADY_EXISTS':
                    return {
                        error: 'Oops! somthing went wrong. Please try again.',
                    };
                default:
                    return { error: err.message };
            }
        }

        return { error: 'Internal Server Error' };
    }
}
