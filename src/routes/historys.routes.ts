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

const ROUTER_HISTORYS = Router();

ROUTER_HISTORYS.get('/api/historys/all', getAllHistorys);
ROUTER_HISTORYS.get(
    '/api/historys/getCountHistorysCreates',
    getCountHistorysCreates
);
ROUTER_HISTORYS.get('/api/historys/activies&inactivies', getCountHistorysAI);
ROUTER_HISTORYS.get('/api/historys/actionsLastDay', getActionsLastDay);
ROUTER_HISTORYS.get('/api/historys/:id', getHistory);
ROUTER_HISTORYS.get('/api/historys', getHistorys);
ROUTER_HISTORYS.post('/api/historys', saveHistory);
ROUTER_HISTORYS.delete('/api/historys/:id', deleteHistory);
ROUTER_HISTORYS.put('/api/historys/:id', putHistory);

export default ROUTER_HISTORYS;
