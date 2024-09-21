const { MongoClient, ObjectId, FindOperators } = require("mongodb");
const express = require('express');
// Replace the uri string with your connection string.
const app = express();
const uri = "mongodb+srv://NitinS:PennHack2024@clubcluster.f8brr.mongodb.net/?retryWrites=true&w=majority&appName=clubCluster?directConnection=true";
const client = new MongoClient(uri);
const port = 3000;

// async function run() 
// {
//   try
//   {
//    
//     const database = client.db('infinTreadData');
//     const collections = await database.collections();
//     collections.forEach(async (c) => {
//       const name = c.collectionName;
//       await spawn('mongoexport', [
//         '--db',
//           DB_NAME,
//         '--collection',
//           name,
//         '--jsonArray',
//         '--pretty',
//         `--out=./${OUTPUT_DIR}/${name}.json`,
//       ]);
//     });
//   }
//   finally 
//   {
//     await client.close();
//     console.log(`DB Data for ${DB_NAME} has been written to ./${OUTPUT_DIR}/`);
//   }
  
// }
// run().catch(console.dir);

app.get('/api/club', async (req, res) => {
  try {
    await client.connect();

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
  } catch (error) {
    console.error('Error fetching club: ', error);
    res.status(500).json({error: 'Internal Server Error'});
  } finally {
    // Ensures that the client will close when you finish/error
  }
});

app.get('/api/clubs', async (req, res) => {
  try {
    await client.connect();

    const database = client.db('infinTreadData');
    const clubs = database.collection('clubs');
    
    const clubsData = [];

    for await (const club of clubs.find({}))
    {
      clubsData.push(club);
    }

    if (clubs)
    {
      res.json(clubsData);
      console.log(clubsData);
    }
    else
    {
      res.status(404).json({error: "Clubs not returning"});
    }
  } catch (error) {
    console.error("error fetching clubs: ", error);
    res.status(500).json({error: 'Internal Server Error'});
  } finally {
    // await client.close();
  }
})

app.get('/api/clubs', async (req, res) => {
  try {
    const database = client.db('infinTreadData');
    const clubs = database.collection('clubs');
    
    const clubsData = [];

    for await (const club of clubs.find({}))
    {
      clubsData.push(club);
    }

    if (clubs)
    {
      res.json(clubsData);
      console.log(clubsData);
    }
    else
    {
      res.status(404).json({error: "Clubs not returning"});
    }
  } catch (error) {
    console.error("error fetching clubs: ", error);
    res.status(500).json({error: 'Internal Server Error'});
  } finally {
    // await client.close();
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  // console.log(`Server connected: ${database.namespace}`);
})