import { MongoClient } from 'mongodb';
import { MongoDB } from '../src/lib/mongodb';

// after all test are executed, mongodb connections
afterAll(async () => {
    await MongoDB.close();
});

describe('mongodb', () => {
    it('is connected', async () => {
        const client: MongoClient = await MongoDB.getInstance();
        expect(client.isConnected).toBeTruthy();
    });
});

