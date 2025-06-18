import RegisterForm from '@/components/auth/RegisterForm';

const RegisterPage = () => {
    return (
        // 최대 너비 1024, 내부 요소간 간격 32, padding 32 64
        <div className="container max-w-screen-lg mx-auto space-y-8 px-8 py-16">
            <div className="space-y-8">
                <h1 className="text-3xl font-bold">Register Page</h1>
            </div>
            <RegisterForm />
        </div>
    );
};
export default RegisterPage;
