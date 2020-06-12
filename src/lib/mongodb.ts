import { MongoClient } from "mongodb";

// Singleton - Design Pattern
export class MongoDB {
    static instance: MongoClient;

    static async getInstance(): Promise<MongoClient> {
        if (!MongoDB.instance) {
            const MongoDBOptions = { useUnifiedTopology: true };
            MongoDB.instance = await MongoClient.connect(
                'mongodb://localhost/testDB',
                MongoDBOptions
            );
        }
        return Promise.resolve(MongoDB.instance);
    }

    static close(): Promise<void> {
        if(MongoDB.instance) {
            return MongoDB.instance.close();
        }
        return Promise.resolve();
    }


    // /**
    //  * Helper method to remove all documents for a given db/collection
    //  * @param database Name of MongoDB database
    //  * @param collection Name of MongoDB collection
    //  */
    // static async deleteAll(database: string, collection: string): Promise<void> {
    //     const client = await this.getInstance();
    //     await client.db(database).collection(collection).deleteMany({});
    //     return Promise.resolve();
    // }
}

// const mongodbClient1: MongoClient = MongoDB.getInstance();
// const mongodbClient2: MongoClient = MongoDB.getInstance();
