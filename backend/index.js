const { MongoClient } = require("mongodb");
const express = require('express');
// Replace the uri string with your connection string.
const app = express();
const uri = "mongodb+srv://NitinS:PennHack2024@clubcluster.f8brr.mongodb.net/?retryWrites=true&w=majority&appName=clubCluster?directConnection=true";
const client = new MongoClient(uri);
const port = 3000;

app.get('/api/club', async (req, res) => {
  try {
    const database = client.db('infinTreadData');
    const clubs = database.collection('clubs');
    // Query for a movie that has the title 'Back to the Future'
    const query = { name: 'Computer Science Club' };
    const club = await clubs.findOne(query);
    if (club)
    {
      res.json(club);
    }
    else
    {
      res.status(404).json({error: 'Club not found'});
    }
  } catch {
    console.error('Error fetching club: ', error);
    res.status(500).json({error: 'Internal Server Error'});
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})