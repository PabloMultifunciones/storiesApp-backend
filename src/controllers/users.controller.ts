import USER_MODEL from '../models/user.model';
import { isValidateUser } from '../libs/validator.functions';
import { generateAccessToken } from '../libs/general.functions';
import {
    createPasswordHash,
    validatePassword,
} from '../libs/password.functions';

export const getUsers = async (req: any, res: any) => {
    const USERS = await USER_MODEL.find();
    res.json({ data: USERS });
};

export const saveUser = async (req: any, res: any) => {
    const params = req.body;

    try {
        const RESPONSE = isValidateUser(params);

        if (RESPONSE.error) {
            res.json(RESPONSE);
            return;
        }

        const PASSWORD_HASHED = await createPasswordHash(params.password);

        const TOKEN: string = generateAccessToken(params.password);

        if (TOKEN === 'error') {
            res.json({
                error: true,
                message:
                    'Has ocurred an error during the generating of the access token',
            });
            return;
        }

        const NEW_USER = {
            username: params.username,
            firstName: params.firstName,
            lastName: params.lastName,
            password: PASSWORD_HASHED,
        };

        const USER = new USER_MODEL(NEW_USER);

        await USER.save();

        res.json({
            error: false,
            message: 'The user has been saved successfully',
            token: TOKEN,
        });
    } catch {
        res.json({
            error: true,
            message: 'An error as ocurred',
        });
    }
};

export const loginUser = async (req: any, res: any) => {
    const params = req.body;

    try {
        const USER = await USER_MODEL.findOne({ username: params.username });

        if (USER === null) {
            res.json({
                error: true,
                message: 'The user has not be found',
            });
            return;
        }

        const IS_PASSWORD = validatePassword(params.password, USER.password);

        if (!IS_PASSWORD) {
            res.json({
                error: true,
                message: 'Password is not valid',
            });
            return;
        }

        const TOKEN: string = generateAccessToken(params.password);

        if (TOKEN === 'error') {
            res.json({
                error: true,
                message:
                    'Has ocurred an error during the generating of the access token',
            });
            return;
        }

        res.json({
            error: false,
            message: 'The password is valid',
            token: TOKEN,
        });
    } catch {
        res.json({
            error: true,
            message: 'An error as ocurred',
        });
    }
};

export const deleteUser = async (req: any, res: any) => {
    const ID = req.params.id;

    try {
        const { deletedCount } = await USER_MODEL.deleteOne({ _id: ID });

        if (deletedCount === 0) {
            res.json({
                error: true,
                message: 'An error has ocurred while the delete process',
            });
            return;
        }

        res.json({
            error: false,
            message: 'The user has been delete successfully',
        });
    } catch {
        res.json({
            error: true,
            message: 'An error as ocurred',
        });
    }
};

export const changePassword = async (req: any, res: any) => {
    const ID = req.params.id;
    const { password } = req.body;

    try {
        const USER = await USER_MODEL.findOne({ _id: ID });
        const PASSWORD_HASHED = await createPasswordHash(password);

        USER.password = PASSWORD_HASHED;

        USER.save();

        res.json({
            error: false,
            message: 'The password has been changed successfully',
        });
    } catch {
        res.json({
            error: true,
            message: 'An error as ocurred',
        });
    }
};
