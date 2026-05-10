require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { MongoClient } = require('mongodb');

const contacts = [
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    favoriteColor: 'blue',
    birthday: '1990-03-15'
  },
  {
    firstName: 'Bob',
    lastName: 'Martinez',
    email: 'bob.martinez@example.com',
    favoriteColor: 'green',
    birthday: '1985-07-22'
  },
  {
    firstName: 'Carol',
    lastName: 'Williams',
    email: 'carol.williams@example.com',
    favoriteColor: 'purple',
    birthday: '1993-11-08'
  }
];

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db('cse341');
    const collection = db.collection('contacts');

    await collection.deleteMany({});
    const result = await collection.insertMany(contacts);
    console.log(`Inserted ${result.insertedCount} contacts.`);
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
