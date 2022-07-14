import bcryptjs from 'bcryptjs';

const SAL_ROUNDS = 6;

export const createPasswordHash = async (password: string): Promise<string> => {
    const passwordHashed = await bcryptjs.hash(password, SAL_ROUNDS);
    return passwordHashed;
};

export const validatePassword = async (
    password: string,
    passwordHash: string
): Promise<any> => {
    const isValidPassword = await bcryptjs.compare(password, passwordHash);
    return isValidPassword;
};
