import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import SignOutButton from '@/components/auth/SignOutButton'; // ******************** SignOUt 버튼 컴포넌트

const ProfilePage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(), // 세션의 헤더 장보를 가져옴
    });
    if (!headers) return <div className="text-destructive">Unauthorized</div>; // session 헤더 정보가 없으면 표시함

    return (
        // 최대 너비 1024, 내부 요소간 간격 32, padding 32 64
        <div className="container max-w-screen-lg mx-auto space-y-8 px-8 py-16">
            <div className="space-y-8">
                <h1 className="text-3xl font-bold">Profile</h1>
            </div>
            {/* ******************** signOut 버튼 컴포넌트 추가  */}
            <SignOutButton />
            // 세션을 JSON 문자열로, null: replacer함수 사용안함, 들여쓰기 2
            <pre className="text-sm overflow-clip">
                {JSON.stringify(session, null, 2)}
            </pre>
        </div>
    );
};
export default ProfilePage;
