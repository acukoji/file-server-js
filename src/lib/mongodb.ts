import { MongoClient } from "mongodb";

// Singleteton 
export class MongoDB {
    static instance: MongoClient;

    static async getInstance(db: String): Promise<MongoClient> {
        if (!MongoDB.instance) {
            const MongoDBOptions = { useUnifiedTopology: true };
            MongoDB.instance = await MongoClient.connect(
                'mongodb://localhost/' + db,
                MongoDBOptions
            );
        }
        return Promise.resolve(MongoDB.instance);
    }

    static async close(): Promise<void> {
        return MongoDB.instance.close();
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

// const mongodbClient1: MongoClient = MongoDB.getInstance('testDB');
