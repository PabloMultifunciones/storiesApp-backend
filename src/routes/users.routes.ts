import { Router } from 'express';
import {
    getUsers,
    saveUser,
    loginUser,
    deleteUser,
    changePassword,
} from '../controllers/users.controller';
import { autenticateAccessToken } from '../libs/general.functions';

const ROUTER_USERS = Router();

ROUTER_USERS.get('/api/users', autenticateAccessToken, getUsers);
ROUTER_USERS.post('/api/users', saveUser);
ROUTER_USERS.post('/api/users/login', loginUser);
ROUTER_USERS.delete('/api/users', autenticateAccessToken, deleteUser);
ROUTER_USERS.put(
    '/api/users/changepassword/:id',
    autenticateAccessToken,
    changePassword
);

export default ROUTER_USERS;
