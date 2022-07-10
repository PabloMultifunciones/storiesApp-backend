import jwt from 'jsonwebtoken';

export const generateAccessToken = (username: string) => {
    if (process.env.TOKEN_SECRET === undefined) {
        return 'error';
    }
    const { TOKEN_SECRET } = process.env;
    return jwt.sign(username, TOKEN_SECRET);
};

export const autenticateAccessToken = async (
    req: any,
    res: any,
    next: Function
) => {
    const TOKEN = req.headers.authorization;

    if (TOKEN === undefined || TOKEN === null) {
        res.json({
            error: true,
            message: 'The token is undefined or null',
        });
        return;
    }

    const { TOKEN_SECRET } = process.env;

    if (TOKEN_SECRET === undefined) {
        res.send({
            error: true,
            message: 'The Token not was found',
        });
        return;
    }

    try {
        jwt.verify(TOKEN, TOKEN_SECRET as string);
        next();
    } catch {
        res.json({
            error: true,
            message: 'Has occurred an error',
        });
    }
};
