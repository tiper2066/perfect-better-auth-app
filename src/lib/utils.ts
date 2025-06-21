import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// ************************************ 이메일 주소 유효성 검증 함수
export const VALID_DOMAINS = () => {
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com']; // 검증할 이메일 주소
    // 개발환경이라면.. example.com 도 검증 목록에 추가한다.
    if (process.env.NODE_ENV === 'development') {
        domains.push('example.com');
    }
    return domains;
};
// ************************************ 이름 유효성 검증 함수
export function normalizeName(name?: string) {
    if (!name) return '';
    return name
        .trim()
        .replace(/\s+/g, ' ') // 이름 사이에 공백을 갖게함
        .replace(/[^a-zA-Z\s'-]/g, '') // 영문 대/소문자가 아닌것이 있으면 제거함
        .replace(/\b\w/g, (char) => char.toUpperCase()); // 단어 첫글자를 대문자로 변경
}
