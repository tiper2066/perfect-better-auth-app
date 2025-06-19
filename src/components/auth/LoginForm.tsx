'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from '@/lib/auth-client';
import { useRouter } from 'next/navigation'; //  추가
import { useState } from 'react'; //  useState
import { toast } from 'sonner';

const LoginForm = () => {
    const [isPanding, setIsPending] = useState(false); //  대기중 상태변수
    const router = useRouter(); //  현재 경로 가져오기

    // form submit handler
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement); // FormData 객체 생성

        const email = formData.get('email') as string;
        const password = formData.get('password') as string; // String(formData.get('password')) 와 동일함

        // 유효성 검사 후 에러 메시지 출력
        if (!email || !password) {
            return toast.error(
                `Please enter your ${!email ? 'email' : 'password'}`
            );
        }

        await signIn.email(
            {
                // better-auth 의 email 인증을 위해서 email, password 를 전달하면...
                email,
                password,
            },
            // 요청에 대한 유효성 검사 후 응답에 대한 에러 메시지 출력 또는 성공 함수 실행
            {
                onRequest: () => {
                    setIsPending(true); //  요청이 오면 대기중으로 상태 변경
                },
                onResponse: () => {
                    setIsPending(false); //  응답완료면 대기중 아님으로 상태 변경 }
                },
                onError: (ctx) => {
                    // 로그인되지 않았거나 서버가 다운되었을 경우에 대한 에러 메시지 출력
                    toast(ctx.error.message);
                },
                onSuccess: () => {
                    toast.success('Login successful. Good to have you back!');
                    router.push('/profile');
                },
            }
        );
    };

    return (
        // 전체 너비 지만, 최대 너비 384px
        <form onSubmit={handleSubmit} className='w-full max-w-sm space-y-4'>
            <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input type='email' id='email' name='email' />
            </div>
            <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <Input type='password' id='password' name='password' />
            </div>
            {/*  isPanding 에 따라 버튼이 활성/비활성됨 */}
            <Button type='submit' className='w-full' disabled={isPanding}>
                Login
            </Button>
        </form>
    );
};
export default LoginForm;
