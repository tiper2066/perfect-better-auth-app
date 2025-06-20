import GetStartedButton from '@/components/auth/GetStartedButton';

export default function Home() {
    return (
        // dvh : 모바일에서 주소표시줄 여부에 따른 화면 높이를 동적으로 설정하는 단위
        <div className='flex items-center justify-center h-dvh'>
            {/* 수직방향 정중앙 */}
            <div className='flex flex-col justify-center items-center gap-8'>
                <h1 className='text-6xl font-bold'>Better Authy</h1>
                <GetStartedButton />
            </div>
        </div>
    );
}
