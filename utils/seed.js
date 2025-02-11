const connection = require('../config/connection');
const { User, Thought} = require('../models');
const { getRandomName, getRandomThought, getRandomFriends, getRandomArrItem,thoughtArrData, getRandomReactions} = require('./data');
// this line of code is used to connect to the database and log an error if there is one 
connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    //

    
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray(); // check if the collection exists in the database
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }
    
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray(); // check if the collection exists in the database 
    if (userCheck.length) {
      await connection.dropCollection('users');
    }

    



    // Create the collections of thoughts
    const thoughtArr = [];
    for (let i = 0; i < thoughtArrData.length; i++) {

      const thoughtText = getRandomThought();
      const username = getRandomName();

      const reactions = getRandomReactions(Math.floor(Math.random() * 10)); 
      //since model has an array of reactionSchema, we need to create an array of reactions for each thought 

 // check unique username
 // if the thoughtArr has a thought that has the same username as the username generated, 
  // then log a message to the console and continue to the next iteration of the loop
  
      if (thoughtArr.map(thought => thought.username).includes(username)) 
        {
    console.log('Duplicate username! ', username);
        continue;
      }

      thoughtArr.push({
        thoughtText,
        username,
        reactions,
      });

    }
   
  const thoughtData =  await Thought.create(thoughtArr);
  
  // Create empty array to hold the users
  const users = [];
  const emailDomainArr = ['@gmail.com', '@yahoo.com', '@hotmail.com', '@aol.com', '@outlook.com', '@icloud.com', '@protonmail.com', '@zoho.com', '@yandex.com', '@mail.com'];

// console.log(thoughtData[0]._id);
// console.log(thoughtData.map(thought => thought.username));

for (let i = 0; i < thoughtArrData.length + 10; i++) {
  const userName = (i < thoughtData.length && thoughtData[i].username) ? thoughtData[i].username : getRandomName();
//the above line of code is checking if the thoughtData[i] exists and if the thoughtData[i].username exists, if it does then it will use the thoughtData[i].username, 
//syntax name = condition ? value if true : value if false is called a ternary operator
// ternary example: let age = 26;
// let canDrink = (age >= 21) ? 'yes' : 'no';
// console.log(canDrink); // Output: yes  
//the above line of code is checking if the thoughtData[i] exists and if the thoughtData[i].username exists, if it does then it will use the thoughtData[i].username, 
//if it doesn't exist then it will use the getRandomName function to generate a random name 


// check unique username and if the users array has a user that has the same username as the username generated,
// then log a message to the console and continue to the next iteration of the loop

if(users.map(user => user.username).includes(userName)) {
  console.log('Duplicate username!++++ ', userName);
  continue;
}



//the code below is generating a random email address for the user 
  const email = `${userName}${ Math.floor(Math.random() * 1000)}${getRandomArrItem(emailDomainArr)}`;
  
  //the code below is filtering the thoughtData array to get the thoughts that match the username and then mapping the thoughts to get the _id of the thoughts 
  const thoughts = thoughtData.filter(t => t.username === userName).map(t => t._id);

   // then the code below is pushing the username, email and thoughts to the users array
  users.push({
    username: userName,
    email,
    thoughts,
  });
}

const userData = await User.create(users);

for (let i = 0; i < userData.length; i++) {
  await User.findByIdAndUpdate( { _id: userData[i]._id }, { $addToSet: { friends:getRandomFriends(Math.floor(Math.random() *10), userData.map(user => user._id)) } }, { new: true });
 
}

  console.info('Seeding complete! 🌱');
  process.exit(0);
});
