'use client';

import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const SignOutButton = () => {
    const router = useRouter(); // 라우팅 객체 생성
    const handleClick = async () => {
        await signOut({
            fetchOptions: {
                onError: (ctx) => {
                    // 로그인하지 않았거나 서버가 다운되었을 경우에 대한 에러 메시지 출력
                    toast(ctx.error.message);
                },
                onSuccess: () => {
                    router.push('/auth/login'); // 로그아웃에 성공하면 로그인 페이지로 이동
                },
            },
        });
    };

    return (
        <Button size="sm" variant="destructive" onClick={handleClick}>
            Sign Out
        </Button>
    );
};
export default SignOutButton;
