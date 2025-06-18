import { auth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js'; // better-auth가 제공하는 API 핸들러 객체

export const { POST, GET } = toNextJsHandler(auth); // APT 핸들러 객체에서 POST, GET 핸들러 추출
