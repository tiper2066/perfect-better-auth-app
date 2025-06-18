'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUp } from '@/lib/auth-client'; // ***************** auth-client에서 signUp 함수 추출
import { toast } from 'sonner';

const RegisterForm = () => {
    // form submit handler
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement); // FormData 객체 생성
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string; // String(formData.get('password')) 와 동일함

        // 유효성 검사 후 에러 메시지 출력
        if (!name || !email || !password) {
            return toast.error(
                `Please enter your ${
                    !name ? 'name' : !email ? 'email' : 'password'
                }`
            );
        }

        await signUp.email(
            // better-auth 의 email 인증을 위해서 name, email, password 를 전달하면...
            {
                name,
                email,
                password,
            },
            // 요청에 대한 유효성 검사 후 응답에 대한 에러 메시지 출력 또는 성공 함수 실행
            {
                onRequest: () => {},
                onResponse: () => {},
                onError: (ctx) => {
                    toast(ctx.error.message);
                },
                onSuccess: () => {},
            }
        );
    };

    return (
        // 전체 너비 지만, 최대 너비 384px
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" />
            </div>
            <Button type="submit" className="w-full">
                Register
            </Button>
        </form>
    );
};
export default RegisterForm;
