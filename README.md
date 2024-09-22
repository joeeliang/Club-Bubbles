# Club Bubbles
### Connecting students and clubs through AI-Assisted management.

Club Bubbles acts as an interface for creating, joining, and managing school clubs from a student perspective.

## Background
Creating, joining, and managing extracurricular and educational clubs within our student bodies was and continues to be nothing short of an **unorganized disaster**. Many schools, even those with extensive software-student integrations, still use spreadsheets, lists and web forms to manage their clubs, and the process of creating a student-led club involves tedious iteration of the club's concept. Hearing about and figuring out how to join clubs in school was a feat that required far too much effort for an opportunity that should be easily available for every student.

## How it Works

Data is created and stored in Documents in a MongoDB Cluster, with the use of 2 major collections: users and clubs. The club data follows this template:
```
{
"_id": //OID,
"name": //Club's name,
"clubRoom": //Club's room number,
"description": //Club's proposal description,
"authenticityScore": //AI-Evaluated scoring of proposal,
"category": //AI-Generated club category (Based off proposal),
"members": //List of current club members
}
```
Club data is added through the proposal form, and users who create and join clubs are added under the member lists, while also simultaneously adding the club into their club list.

Python scripts ultiize the Cerebras API to get the LLM's input on club Proposals, giving the backend a score to go along with the club's document.

## Frameworks & Utilities
**Vite** - https://vitejs.dev/ -- 
Vite is a development environment that provided a real-time build of our project for testing and debugging, rapidly acellerating front-end progress.

**React** - https://react.dev/ -- 
React is a framework that was employed to structure and create the front end of our application.

**Node.js** - https://nodejs.org/en -- 
Node.js provided the backend functionality of the project, allowing us to read and write from our database, along with running a backend server.

**MongoDB** - https://www.mongodb.com/ -- 
MongoDB Atlas provided a hosted database that allowed us to store club and user information and access it from anywwhere.

**Cerebras** - https://cerebras.ai/ -- 
Cerebras is an ultra-fast inference model that powered the evaluation components of the app.
