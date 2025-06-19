import { hash, verify, type Options } from '@node-rs/argon2'; // 해쉬 생성, 검사, 옵션 타입

// Options 타입의 객체 생성
const opts: Options = {
    memoryCost: 19456, // 사용할 최소 메모리
    timeCost: 2, // 사용할 시간
    outputLen: 32, // 암호화값 길이
    parallelism: 1, // ?
};

// 해쉬 비밀번호 생성 함수
export async function hashPassword(password: string) {
    const result = await hash(password, opts);
    return result;
}

// 해쉬 비밀번호 검사 함수
export async function verifyPassword(data: { password: string; hash: string }) {
    const { password, hash } = data;

    const result = await verify(hash, password, opts);
    return result;
}
