const { MongoClient, ObjectId, FindOperators } = require("mongodb");
const { UUID } = require('bson');
const express = require('express');
// Replace the uri string with your connection string.
const app = express();
const uri = "mongodb+srv://NitinS:PennHack2024@clubcluster.f8brr.mongodb.net/?retryWrites=true&w=majority&appName=clubCluster?directConnection=true";
const client = new MongoClient(uri);
const port = 3000;

// async function run() 
// {
//   try {
//     const database = client.db('infinTreadData');
//     const users = database.collection('users');
    
//     const newUser = {email: "johnnyjoe@gmail.com", password: "Joeyjohn@2123", grade: 11};
//     newUser._id = new ObjectId();
//     users.insertOne(newUser);
//     // res.send(newUser);
//   } catch (error) {
//     console.error("error making user: ", error);
//     // res.status(500).json({error: 'Internal Server Error'});
//   } finally {
//     // await client.close();
//   }
  
// }
// run().catch(console.dir);

app.use(express.json());

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


app.post('/api/makeUser', async (req, res) => {
  try {
    const database = client.db('infinTreadData');
    const users = database.collection('users');
    
    const newUser = req.body;
    
    newUser._id = new ObjectId();
    const result = await users.insertOne(newUser);

    if (result.acknowledged) {
      console.log('User inserted with _id:', result.insertedId);
      res.status(200).json({ message: 'User created successfully', user: newUser });
    } else {
      console.error('Failed to insert user');
      res.status(500).json({ error: 'Failed to insert user' });
    }
  } catch (error) {
    console.error("error making user: ", error);
    res.status(500).json({error: 'Internal Server Error'});
  } finally {
    // await client.close();
  }
})

// app.post('/api/makeClub', async (req, res) => {
//   try {
//     const database = client.db('infinTreadData');
//     const users = database.collection('users');
    
//     const newUser = req.body;
//     newUser._id = new ObjectId();

//     res.send(newUser);
//   } catch (error) {
//     console.error("error making user: ", error);
//     res.status(500).json({error: 'Internal Server Error'});
//   } finally {
//     // await client.close();
//   }
// })

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  // console.log(`Server connected: ${database.namespace}`);
})