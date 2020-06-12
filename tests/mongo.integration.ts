import { MongoClient, Db, Cursor } from 'mongodb';
import { MongoDB } from '../src/lib/mongodb';
import {Collection} from 'mongodb';

interface Dog {
    // finish this interface to get things to compile
    first: string
    id?: string
    age: number
}

// after all test are executed, mongodb connections
afterAll(async () => {
    await MongoDB.close();
});

describe('mongodb', () => {
    it('is connected', async () => {
        const client: MongoClient = await MongoDB.getInstance();
        expect(client.isConnected()).toBe(true);
    });
});

describe('dogs test', () => {
    it('can insert dogs', async () => {
        const client: MongoClient = await MongoDB.getInstance();
        const db: Db = client.db();  // testDB
        const dogs = await db.createCollection<Dog>('dogs');

        const r1 = await dogs.insert({ first: 'Shae', age: 13.75 });
        console.log(r1);
        expect(r1.result).toStrictEqual({ ok: 1, n: 1 });

        // await dogs.insert({ first: 'Lily', age: 5 });
        // await dogs.insert({ first: 'Shae', age: 1});
    });


    it('can insert a dog and find a dog by ObjectId', async () => {
        const client: MongoClient = await MongoDB.getInstance();
        const db: Db = client.db();
        const dogs: Collection<Dog> = await db.createCollection<Dog>('dogs');

        const dog: Dog = { first: 'Shae', age: 13.75 };
        const r1 = await dogs.insert(dog);
        // results/state/object/ids of insertion is returned

        console.log(r1);
    
        const r2: Cursor<Dog> = dogs.find(r1.insertedIds[0]);
        
        //console.log(r2)
        
        // compiles but "result" not usable
        //const result: void = [].forEach((vf => console.log(vf)));

        const r2Array: Dog[] = await r2.toArray();
        console.log(r2Array[0].first)

        expect(r2Array[0].first).toStrictEqual(dog.first)
        // assert on the count "dogs.countDocuments()"
    });

    it('can count Dog documents in dog collection', async () => {
        const client: MongoClient = await MongoDB.getInstance();
        const db: Db = client.db();
        const dogs: Collection<Dog> = await db.createCollection<Dog>('dogs');

        const dog1: Dog = { first: 'Shae', age: 13.75 };
        const dog2: Dog = { first: 'Lily', age: 5 };
        const r1 = await dogs.insertMany([dog1, dog2]);

        // assert on the count "dogs.countDocuments()"
        
        const objectIds = Array.from(new Map(Object.entries(r1.insertedIds)).values());
        console.log(objectIds);


        // this is a query expression in MongoDb which asks to search for
        //_id's in element[0] and element [1].
        // the expression is expecting an array of objects []
        // which is the format it needs.
        const r2 = await dogs.countDocuments(
            // { _id: { $in: [r1.insertedIds[0], r1.insertedIds[1]] } }
            { _id: { $in: objectIds } }
        );

        console.log(r2);

        //db.inventory.find( { qty: { $in: [ 5, 15 ] } } )
        expect(r2).toStrictEqual(r1.insertedCount);
        // 4 new dogs added each time due to the 3 tests above
        // .toStrictEqual(x), x must be hardcoded each time. 
        // is there another way to not hardcode this number?
    });
});
