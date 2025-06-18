import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner'; // ******************** Sonner Toaster 컴포넌트

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Perfect Better Auth App',
    description: 'Neon Postgre + Prisma + Better Auth',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
                {/* ******************** Toaster 컴포넌트 추가  */}
                {/* ******************** richColors: info, success 등 타입에 따라 다양한 색상 표시  */}
                <Toaster position="top-center" richColors />
            </body>
        </html>
    );
}
