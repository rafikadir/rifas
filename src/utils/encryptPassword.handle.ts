import { hash, compare, genSalt } from 'bcryptjs';

const encrypt = async(textPlainPass:string) => {
    const salt = await genSalt(12);
    const passwordHash = await hash(textPlainPass, salt);
    return passwordHash;
}

const verified = async(textPlainPass:string, passHash: string) => {
    const isCorrect = await compare(textPlainPass, passHash);
    return isCorrect;
}

export { encrypt, verified };