const { MongoClient, ObjectId, FindOperators } = require("mongodb");
// const { ObjectId } = require('bson');

const express = require('express');
// Replace the uri string with your connection string.
const app = express();
app.use(express.json());
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

app.post('/api/myclubs/', async (req, res) => {
    await client.connect();
    const database = client.db('infinTreadData');
    const clubs = database.collection('clubs');
    const users = database.collection('users');
    console.log(req.body._id);
    
    try {
      const id = ObjectId.createFromHexString(req.body._id);
      const clubListQuery = { _id: id };
    
      console.log(clubListQuery._id);
    
      const userClubList = await users.findOne(clubListQuery);
      console.log("THE USER CLUB LIST: " + userClubList);
    
      if (!userClubList) {
        return res.status(404).json({ error: "User not found" });
      }
    
      const clubsCircular = await clubs.find({});
      const clubsData = [];
      for await (const club of clubsCircular) {
        if (userClubList.clubs && userClubList.clubs[club._id.toHexString()]) {
          clubsData.push(club);
        }
      }
    
      if (clubsData.length > 0) {
        res.json(clubsData);
        console.log(clubsData);
      } else {
        res.status(405).json({ error: "Clubs not returning or no clubs exist" });
      }
    } catch (error) {
      console.error("error fetching clubs: ", error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      // await client.close();
    }
});

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
}),

app.post('/api/makeClub', async (req, res) => { 
  try {
    const database = client.db('infinTreadData');
    const clubs = database.collection('clubs');
    
    const newClub = req.body;
    newClub._id = new ObjectId();
    const result = await clubs.insertOne(newClub);

    if (result.acknowledged) {
      console.log('Club inserted with _id:', result.insertedId);
      res.status(200).json({ message: 'Club created successfully', club: newClub });
    } else {
      console.error('Failed to insert club');
      res.status(500).json({ error: 'Failed to insert club' });
    }
  } catch (error) {
    console.error("error making club: ", error);
  } finally {
    // await client.close();
  }
}),

app.post('/api/user', async (req, res) => { 
  try {
    await client.connect();
    const database = client.db('infinTreadData');
    const users = database.collection('users');
    
    const userID = req.body.userID;
    const user = await users.findOne({_id: ObjectId.createFromHexString(userID)});

    if (user != null) {
      res.status(200).json({ name: user.name });
    } else {
      res.status(500).json({ error: 'failed to get user name' });
    }
  } catch (error) {
    console.error("error making club: ", error);
  } finally {
    // await client.close();
  }
}),

app.post('/api/login', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('infinTreadData');
    const users = database.collection('users');
    
    const user = req.body;
    const userQuery = { email: user.username, password: user.password };
    const userFound = await users.findOne(userQuery);

    if (userFound !== null) {
      console.log('User found with _id:', userFound._id);
      res.status(200).json({ user: userFound._id});
    }
    else
    {
      res.status(404).json({ error: 'User not found' });
    }

  } catch (error) {
    console.error("error making user: ", error);
    res.status(500).json({error: 'Internal Server Error'});
  } finally {
    // await client.close();
  }
}),


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