'use client';

import { useSession } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const GetStartedButton = () => {
    const { data: session, isPending } = useSession(); // data 를 가져와 session 이란 이름으로 사용함

    // 대기 상태라면...( 세션이 검사 및 처리 중 ) 버튼을 흐리게 처리함
    if (isPending) {
        return (
            <Button size='lg' className='opacity-50' asChild>
                Get Started
            </Button>
        );
    }

    // href 변수에 현재 세션을 가지고 있다면... profile 없으면 login 경로로 설정함
    const href = session ? '/profile' : '/auth/login';

    return (
        <div className='flex flex-col items-center gap-4'>
            <Button size='lg' asChild>
                <Link href={href}>Get Started</Link>
            </Button>
            {/* 현재 세션이 존재한다면... 사용자 이름과 환영 메시지 표시 */}
            {session && <p>Welcome back {session.user.name}!</p>}
        </div>
    );
};
export default GetStartedButton;
