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

describe('History Test', () => {
    let id: string;

    test('Historys route has returned a json', async () => {
        await api
            .get('/api/historys')
            .set('authorization', TOKEN)
            .expect('Content-Type', /json/)
            .expect(200);
    });

    test('Historys has been saved succesfully', async () => {
        const example = {
            title: 'example',
            description: 'example example',
            deleted: false,
        };
        const { body } = await api
            .post('/api/historys')
            .set('authorization', TOKEN)
            .send(example)
            .expect(200);

        expect(body.error).toBe(false);

        id = body.history._id;
    });

    test('History has benn updated succesfully', async () => {
        const HISTORY = {
            title: 'Title updated',
            description: 'Description Updated',
        };

        await api
            .put('/api/historys/' + id)
            .set('authorization', TOKEN)
            .send(HISTORY)
            .expect(200);

        const { body } = await api
            .get('/api/historys/' + id)
            .set('authorization', TOKEN)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(body.history.description).toBe(HISTORY.description);
    });

    test('History has been deleted succesfully', async () => {
        const { body } = await api
            .delete('/api/historys/' + id)
            .set('authorization', TOKEN)
            .expect(200);

        expect(body.error).toBe(false);

        await api
            .get('/api/historys' + id)
            .set('authorization', TOKEN)
            .expect(404);
    });
});

afterAll(async () => {
    await index.server.close();
    await mongoose.connection.close();
});
