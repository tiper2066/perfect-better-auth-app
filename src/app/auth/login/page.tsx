import LoginForm from '@/components/auth/LoginForm';
import ReturnButton from '@/components/auth/ReturnButton';
import Link from 'next/link'; // *************************** 추가

const LoginPage = () => {
    return (
        // 최대 너비 1024, 내부 요소간 간격 32, padding 32 64
        <div className='container max-w-screen-lg mx-auto space-y-8 px-8 py-16'>
            <div className='space-y-8'>
                <ReturnButton href='/' label='Home' />
                <h1 className='text-3xl font-bold'>Login Page</h1>
            </div>
            <LoginForm />
            {/* **************************** 계정없을 경우 회원가입 페이지로 이동 */}
            {/* text-muted-foreground : text-foreground 색상보다 옅은 색상 적용 (흐리게함) */}
            <p className='text-muted-foreground text-sm'>
                Don't have an account?{' '}
                <Link href='/auth/register' className='hover:text-foreground'>
                    Register
                </Link>
            </p>
        </div>
    );
};
export default LoginPage;
