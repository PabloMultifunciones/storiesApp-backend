import { Router } from 'express';
import {
    getHistorys,
    saveHistory,
    deleteHistory,
    putHistory,
    getHistory,
    getAllHistorys,
    getCountHistorysCreates,
    getCountHistorysAI,
    getActionsLastDay,
} from '../controllers/historys.controller';
import { autenticateAccessToken } from '../libs/general.functions';

const ROUTER_HISTORYS = Router();

ROUTER_HISTORYS.get(
    '/api/historys/all',
    autenticateAccessToken,
    getAllHistorys
);
ROUTER_HISTORYS.get(
    '/api/historys/getCountHistorysCreates',
    getCountHistorysCreates,
    autenticateAccessToken
);
ROUTER_HISTORYS.get(
    '/api/historys/activies&inactivies',
    autenticateAccessToken,
    getCountHistorysAI
);
ROUTER_HISTORYS.get(
    '/api/historys/actionsLastDay',
    autenticateAccessToken,
    getActionsLastDay
);
ROUTER_HISTORYS.get('/api/historys/:id', autenticateAccessToken, getHistory);
ROUTER_HISTORYS.get('/api/historys', autenticateAccessToken, getHistorys);
ROUTER_HISTORYS.post('/api/historys', autenticateAccessToken, saveHistory);
ROUTER_HISTORYS.delete(
    '/api/historys/:id',
    autenticateAccessToken,
    deleteHistory
);
ROUTER_HISTORYS.put('/api/historys/:id', autenticateAccessToken, putHistory);

export default ROUTER_HISTORYS;
