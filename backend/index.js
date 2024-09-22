const { MongoClient, ObjectId, FindOperators } = require("mongodb");
// const { ObjectId } = require('bson');

const express = require('express');
// Replace the uri string with your connection string.
const app = express();
app.use(express.json());
const uri = "mongodb+srv://NitinS:PennHack2024@clubcluster.f8brr.mongodb.net/?retryWrites=true&w=majority&appName=clubCluster?directConnection=true";
const client = new MongoClient(uri);
const port = 3000;

const clubsData2 = [
  { id: 1, name: "Coding Club", description: "A club for coding enthusiasts who want to learn, share, and collaborate on coding projects. We'll explore various programming languages, frameworks, and technologies, and work on building real-world projects together.", category: "STEM", severity: 3 },
  { id: 2, name: "Art Club", description: "Explore your artistic side and express yourself through various forms of art, including painting, drawing, sculpture, photography, and more. We'll have regular workshops, critiques, and exhibitions to showcase our work.", category: "Humanities", severity: 2 },
  { id: 3, name: "Music Club", description: "For music lovers and musicians who want to share their passion for music. We'll have jam sessions, music theory classes, and performances, and collaborate on music projects and events.", category: "Humanities", severity: 4 },
  { id: 4, name: "Book Club", description: "Read and discuss great books from various genres, including fiction, non-fiction, classics, and contemporary works. We'll have book reviews, author talks, and literary-themed events to foster a love for reading and literature.", category: "Humanities", severity: 1 },
  { id: 5, name: "Sports Club", description: "For sports and fitness enthusiasts who want to stay active and competitive. We'll have regular sports tournaments, fitness classes, and recreational activities, and collaborate on sports-related projects and events.", category: "Athletics", severity: 10 },
  { id: 6, name: "Robotics Club", description: "Design and build robots to solve real-world problems and participate in robotics competitions. We'll learn about robotics engineering, programming, and design, and work on projects that combine technology and creativity.", category: "STEM", severity: 5 },
  { id: 7, name: "Debate Club", description: "Develop your public speaking skills and learn to argue and persuade effectively. We'll have regular debates, mock trials, and speech competitions, and work on topics from politics to social justice.", category: "Humanities", severity: 6 },
  { id: 8, name: "Drama Club", description: "Act, direct, and produce plays to showcase your creativity and talent. We'll have regular rehearsals, performances, and workshops to develop your acting, directing, and production skills.", category: "Humanities", severity: 7 },
  { id: 9, name: "Photography Club", description: "Capture life's moments through photography and learn about the art and technique of photography. We'll have regular photo shoots, workshops, and exhibitions to showcase our work.", category: "Humanities", severity: 8 },
  { id: 10, name: "Gaming Club", description: "Compete and socialize through gaming and learn about the latest gaming trends and technologies. We'll have regular gaming tournaments, LAN parties, and game development workshops.", category: "Athletics", severity: 9 },
  { id: 11, name: "Environmental Club", description: "Promote sustainability and conservation through environmental projects and initiatives. We'll have regular clean-up events, recycling drives, and workshops on sustainable living.", category: "STEM", severity: 11 },
  { id: 12, name: "Language Club", description: "Explore languages and cultures through language exchange, cultural events, and language learning activities. We'll have regular language meetups, cultural festivals, and language-themed events.", category: "Humanities", severity: 12 },
  { id: 13, name: "Business Club", description: "Develop entrepreneurial skills and learn about business management, marketing, and finance. We'll have regular business plan competitions, startup workshops, and networking events.", category: "STEM", severity: 13 },
  { id: 14, name: "Culinary Club", description: "Explore the world of cooking and learn about different cuisines and cooking techniques. We'll have regular cooking classes, food festivals, and culinary-themed events.", category: "Humanities", severity: 14 },
  { id: 15, name: "Fashion Club", description: "Design and create fashion through fashion design, sewing, and styling. We'll have regular fashion shows, workshops, and fashion-themed events.", category: "Humanities", severity: 15 },
  { id: 16, name: "Film Club", description: "Watch and discuss movies from various genres and learn about film production, direction, and criticism. We'll have regular film screenings, director talks, and film-themed events.", category: "Humanities", severity: 16 },
  { id: 17, name: "Theater Club", description: "Act, direct, and produce plays to showcase your creativity and talent. We'll have regular rehearsals, performances, and workshops to develop your acting, directing, and production skills.", category: "Humanities", severity: 17 },
  { id: 18, name: "Volunteer Club", description: "Give back to the community through volunteer work and community service projects. We'll have regular volunteer events, charity drives, and community service initiatives.", category: "Humanities", severity: 18 },
  { id: 19, name: "Outdoor Club", description: "Explore nature and the outdoors through hiking, camping, and outdoor activities. We'll have regular outdoor trips, camping trips, and outdoor-themed events.", category: "Athletics", severity: 19 },
  { id: 20, name: "Wellness Club", description: "Promote physical and mental well-being through fitness classes, yoga, and mindfulness activities. We'll have regular wellness workshops, meditation sessions, and fitness classes.", category: "Athletics", severity: 20 },
];

// async function run() 
// {
//    try {
//     await client.connect()
//     const database = client.db('infinTreadData');
//     const users = database.collection('users');
//     const clubs = database.collection('clubs');

//     var i = 1;
//     for await (const club of clubsData2)
//     {
//       const newClub = {
//         _id: new ObjectId(),
//         name: club.name,
//         clubRoom: 100 + i,
//         description: club.description,
//         authenticityScore: club.severity,
//         category: club.category,
//         members: {}
//       };
//       const result = await clubs.insertOne(newClub);
//       i += 1;
//     }
//   }
//   catch (error)
//   {
//     console.log("Incorrect")
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

app.post('/api/myclubs', async (req, res) => {
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

app.post('api/bulkClubs', async (req, res) => {
  try {
    const database = client.db('infinTreadData');
    const users = database.collection('users');
    const clubs = database.collection('clubs');

    var i = 1;
    for await (const club of clubsData2)
    {
      const newClub = {
        _id: new ObjectId(),
        name: club.name,
        clubRoom: 100 + i,
        description: club.description,
        authenticityScore: club.severity,
        category: club.category,
        members: {}
      };
      const result = await clubs.insertOne(newClub);
      i += 1;
    }
  }
  catch (error)
  {
    console.log("Incorrect")
  }
});

app.post('/api/userToClub', async (req, res) => { 
  try {
    const database = client.db('infinTreadData');
    const users = database.collection('users');
    const clubs = database.collection('clubs');
    
    const { user, club } = req.body;
    const userQuery = { _id: ObjectId.createFromHexString(user._id)};
    const userFound = await users.findOne(userQuery);

    if (userFound !== null) {
      const clubQuery = { _id: ObjectId.createFromHexString(club._id) };
      const clubFound = await clubs.findOne(clubQuery);

      if (clubFound !== null) {
        // Add user to club's members list
        const updateResult = await clubs.updateOne(
          { _id: ObjectId.createFromHexString(clubFound._id) },
          { $set: { [`members.${user._id}`]: userFound.name } } // Ensure no duplicates
        );

        if (updateResult.modifiedCount > 0) {
          res.status(200).json({ message: 'User added to club successfully' });
        } else {
          res.status(400).json({ error: 'User already a member of the club or update failed' });
        }
      } else {
        res.status(404).json({ error: 'Club not found' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error("Error during adding user to club: ", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/user', async (req, res) => { 
  try {
    await client.connect();
    const database = client.db('infinTreadData');
    const users = database.collection('users');
    
    const userID = req.body._id;
    console.log(userID);
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
          res.status(200).json({ user: { id: userFound._id, email: userFound.email } }); // Return email too
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      } catch (error) {
        console.error("error during login: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
      } finally {
        // await client.close();
      }
    });


app.post('/api/clubToUser', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('infinTreadData');
    const users = database.collection('users');
    const clubs = database.collection('clubs');

    const {user, club} = req.body;

    const userQuery = {_id: ObjectId.createFromHexString(user._id)};

    const userFound = await users.findOne(userQuery);

    if (userFound != null)
    {
      const clubFound = await clubs.findOne({_id: ObjectId.createFromHexString(club._id)})
      if (clubFound)
      {
        const clubName = clubFound.name;
        const result = await users.updateOne(userQuery, {
          $set: { [`clubs.${club._id}`]: clubFound.name }
        });

        if (result.modifiedCount > 0) {
          res.status(200).json({ message: 'User added to club successfully' });
        } else {
          res.status(400).json({ error: 'User already a member of the club or update failed' });
        }
      }
      else
      {
        res.status(404).json({error: "club not found"});
      }
      
    }
    else
    {
      res.status(404).json({error: "user not found"});
    }
  } catch (error) {
    res.status(500).json({error: "internal database error"});
    console.log("internal databse error");
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