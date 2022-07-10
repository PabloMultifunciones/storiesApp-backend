import supertest from 'supertest';
import mongoose from 'mongoose';
import index from '../index';

const api = supertest(index.app);
let TOKEN: string;

beforeAll(async () => {
    const example = {
        username: 'example',
        password: 'example',
        firstName: 'example',
        lastName: 'example',
    };
    const {
        body: { token },
    } = await api
        .post('/api/users')
        .send(example)
        .expect('Content-Type', /json/)
        .expect(200);
    TOKEN = token;
});

describe('Charts Test', () => {
    test('Get actions of the last day', async () => {
        const {
            body: { error, actionsAmounts },
        } = await api
            .get('/api/historys/actionsLastDay')
            .set('authorization', TOKEN)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(error).toBe(false);
        expect(actionsAmounts).not.toBe(undefined);
    });

    test('Get Historys activies and inactivies', async () => {
        const {
            body: { error, historysActivies, historysInactivies },
        } = await api
            .get('/api/historys/activies&inactivies')
            .set('authorization', TOKEN)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(error).toBe(false);
        expect(historysActivies).not.toBe(undefined);
        expect(historysInactivies).not.toBe(undefined);
    });

    test('Historys Amount created during the las week', async () => {
        const {
            body: { error, dates },
        } = await api
            .get('/api/historys/getCountHistorysCreates')
            .set('authorization', TOKEN)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(error).toBe(false);
        expect(dates).not.toBe(undefined);
    });
});

afterAll(async () => {
    await index.server.close();
    await mongoose.connection.close();
});
