'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation'; //  추가
import { useState } from 'react'; //  useState
import { toast } from 'sonner';
import { signUpEmailAction } from '@/actions/sign-up-email.action'; // *************** Server Action 함수 가져옴

const RegisterForm = () => {
    const [isPanding, setIsPending] = useState(false); //  대기중 상태변수
    const router = useRouter(); //  현재 경로 가져오기

    // form submit handler
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsPending(false); // *************** 대기중 비활성
        const formData = new FormData(e.target as HTMLFormElement); // FormData 객체 생성
        const { error } = await signUpEmailAction(formData); // *************** Server Action 함수로 검사 및 에러 추출

        // 에러 메시지 출력
        if (error) {
            toast.error(error);
            setIsPending(false);
        } else {
            toast.success("Registration complete. You're all set.");
            router.push('/auth/login'); // 등록 성공 시 로그인 할 수 있도록 이동
        }
    };

    return (
        // 전체 너비 지만, 최대 너비 384px
        <form onSubmit={handleSubmit} className='w-full max-w-sm space-y-4'>
            <div className='space-y-2'>
                <Label htmlFor='name'>Name</Label>
                <Input type='text' id='name' name='name' />
            </div>
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
                Register
            </Button>
        </form>
    );
};
export default RegisterForm;
