import supertest from 'supertest';
import mongoose from 'mongoose';
import index from '../index';

const api = supertest(index.app);

describe('Charts Test', () => {
    test('Get actions of the last day', async () => {
        const {
            body: { error, actionsAmounts },
        } = await api
            .get('/api/historys/actionsLastDay')
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
