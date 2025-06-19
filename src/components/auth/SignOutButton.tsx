'use client';

import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react'; //  useState
import { toast } from 'sonner';

const SignOutButton = () => {
    const [isPanding, setIsPending] = useState(false); //  대기중 상태변수
    const router = useRouter(); // 라우팅 객체 생성
    const handleClick = async () => {
        await signOut({
            fetchOptions: {
                onRequest: () => {
                    setIsPending(true); //  요청이 오면 대기중으로 상태 변경
                },
                onResponse: () => {
                    setIsPending(false); //  응답완료면 대기중 아님으로 상태 변경 }
                },
                onError: (ctx) => {
                    // 로그인하지 않았거나 서버가 다운되었을 경우에 대한 에러 메시지 출력
                    toast(ctx.error.message);
                },
                onSuccess: () => {
                    toast.success('You have to logged out. See you soon!');
                    router.push('/auth/login'); // 로그아웃에 성공하면 로그인 페이지로 이동
                },
            },
        });
    };

    return (
        <Button
            size='sm'
            variant='destructive'
            onClick={handleClick}
            disabled={isPanding} //  isPanding 에 따라 버튼이 활성/비활성됨
        >
            Sign Out
        </Button>
    );
};
export default SignOutButton;
