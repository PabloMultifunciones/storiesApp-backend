import { Router } from 'express';
import {
    getUsers,
    saveUser,
    loginUser,
    deleteUser,
    changePassword,
} from '../controllers/users.controller';

const ROUTER_USERS = Router();

ROUTER_USERS.get('/api/users', getUsers);
ROUTER_USERS.post('/api/users', saveUser);
ROUTER_USERS.post('/api/users/login', loginUser);
ROUTER_USERS.delete('/api/users', deleteUser);
ROUTER_USERS.put('/api/users/changepassword/:id', changePassword);

export default ROUTER_USERS;
