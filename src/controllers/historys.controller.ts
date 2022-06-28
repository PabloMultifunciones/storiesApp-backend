import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import HISTORY_MODEL from '../models/history.model';
import { isValidateHistory } from '../libs/validator.functions';

export const getHistorys = async (req: any, res: any) => {
    const HISTORYS = await HISTORY_MODEL.find({ deleted: null });
    res.json(HISTORYS);
};

export const getAllHistorys = async (req: any, res: any) => {
    const HISTORYS = await HISTORY_MODEL.find();
    res.json(HISTORYS);
};

export const saveHistory = async (req: any, res: any) => {
    const params = req.body;

    try {
        if (!isValidateHistory(params)) {
            res.json({
                error: true,
                message: 'The parameters are not valid',
            });
            return;
        }

        const HISTORY = {
            title: params.title,
            description: params.description,
            deleted: null,
        };

        const NEW_HISTORY = new HISTORY_MODEL(HISTORY);
        const RESPONSE = await NEW_HISTORY.save();

        res.json({
            error: false,
            message: 'The history has been saved successfully',
            history: RESPONSE,
        });
    } catch {
        res.json({
            error: true,
            message: 'An error has ocurred',
        });
    }
};

export const putHistory = async (req: any, res: any) => {
    const ID = req.params.id;
    const params = req.body;

    try {
        if (!isValidateHistory(params)) {
            res.json({
                error: true,
                message: 'The parameters are not valid',
            });
            return;
        }
        const HISTORY = await HISTORY_MODEL.findOne({ _id: ID });

        HISTORY.title = params.title;
        HISTORY.description = params.description;

        await HISTORY.save();

        res.json({
            error: false,
            message: 'The history has been updated successfully',
        });
    } catch {
        res.json({
            error: true,
            message: 'An error has ocurred',
        });
    }
};

export const deleteHistory = async (req: any, res: any) => {
    const ID = req.params.id;

    try {
        const HISTORY = await HISTORY_MODEL.findOne({ _id: ID });

        HISTORY.deleted = new Date();

        await HISTORY.save();

        res.json({
            error: false,
            message: 'The history has been delete successfully',
        });
    } catch {
        res.json({
            error: true,
            message: 'An error has ocurred',
        });
    }
};

export const getHistory = async (req: any, res: any) => {
    const ID = req.params.id;

    try {
        const HISTORY = await HISTORY_MODEL.findOne({ _id: ID });

        if (HISTORY == null) {
            res.json({
                error: true,
                message: 'The history has not been found',
            });
            return;
        }

        res.json({
            error: false,
            message: 'The history has been found succefully',
            history: HISTORY,
        });
    } catch {
        res.json({
            error: true,
            message: 'An error has ocurred',
        });
    }
};

export const getCountHistorysCreates = async (req: any, res: any) => {
    try {
        const dates: any[] = [];
        const day = -(3600 * 1000 * 24);
        for (let i = 0; i < 7; i += 1) {
            const date = new Date(Date.now() + day * i);

            const item = {
                dateName: date.toLocaleDateString('es-AR', { weekday: 'long' }),
                createdCount: await HISTORY_MODEL.count({
                    createdAt: {
                        $gte: startOfDay(date),
                        $lte: endOfDay(date),
                    },
                }),
            };

            dates.push(item);
        }

        res.json({
            error: false,
            message: 'The results has been found succesfully',
            dates,
        });
    } catch {
        res.json({
            error: true,
            message: 'An error has ocurred',
        });
    }
};

export const getCountHistorysAI = async (req: any, res: any) => {
    try {
        const historysActivies = await HISTORY_MODEL.count({ deleted: null });
        const historysInactivies = await HISTORY_MODEL.$where(
            'this.deleted !== false'
        ).count();

        res.json({
            error: false,
            message: 'The results has been found succesfully',
            historysActivies,
            historysInactivies,
        });
    } catch {
        res.json({
            error: true,
            message: 'An error has ocurred',
        });
    }
};

export const getActionsLastDay = async (req: any, res: any) => {
    try {
        const date = new Date(Date.now());

        const actionsAmounts = {
            createdCount: await HISTORY_MODEL.$where(
                'this.deleted === null'
            ).count({
                createdAt: {
                    $gte: startOfDay(date),
                    $lte: endOfDay(date),
                },
            }),
            updatedCount: await HISTORY_MODEL.$where(
                'this.deleted === null && this.createdAt !== this.updatedAt'
            ).count({
                updatedAt: {
                    $gte: startOfDay(date),
                    $lte: endOfDay(date),
                },
            }),
            deletedCount: await HISTORY_MODEL.$where(
                'this.deleted !== null'
            ).count({
                deleted: {
                    $gte: startOfDay(date),
                    $lte: endOfDay(date),
                },
            }),
        };

        res.json({
            error: false,
            message: 'The results has been found succesfully',
            actionsAmounts,
        });
    } catch {
        res.json({
            error: true,
            message: 'An error has ocurred',
        });
    }
};
