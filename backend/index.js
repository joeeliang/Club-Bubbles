const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb+srv://NitinS:PennHack2024@clubcluster.f8brr.mongodb.net/?retryWrites=true&w=majority&appName=clubCluster?directConnection=true";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('infinTreadData');
    const movies = database.collection('clubs');
    // Query for a movie that has the title 'Back to the Future'
    const query = { name: 'Computer Science Club' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);