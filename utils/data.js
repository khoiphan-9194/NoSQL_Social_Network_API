const nameArrData = [
  'Aaran',
  'Aaren',
  'Aarez',
  'Aarman',
  'Aarron',
  'Aaryan',
  'Aaryn',
  'Aayan',
  'Aazaan',
  'Abaan',,
  'Abdisalam',
  'Abdul',
  'Abdul-Aziz',
  'Abdulbasir',
  'Abdulkadir',
  'Abdulkarem',
  'Smith',
  'Jones',
  'Coollastname',
  'Ze',
  'Zechariah',
  'Zeek',
  'Zeeshan',
  'Zeid',
  'Zein',
  'Zen',
  'Zendel',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',
  'Zi',
  'Zidane',
  'Zijie',
  'Zinedine',
  'Zion',
  'Zishan',
  'Ziya',
  'Ziyaan',
  'Zohaib',
  'Zohair',
  'Zoubaeir',
  'Zubair',
  'Zubayr',
  'Zuriel',
  'Xander',
  'Jared',
  'Courtney',
  'Gillian',
  'Clark',
  'Jared',
  'Grace',
  'Kelsey',
  'Tamar',
  'Alex',
  'Mark',
  'Tamar',
  'Farish',
  'Sarah',
  'Nathaniel',
  'Parker',
];



const thoughtArrData = [
'I love programming!',
'JavaScript is awesome!',
'Coding is fun!',
'I enjoy learning new technologies.',
'Debugging is like solving a puzzle.',
'I like to build web applications.',
'Node.js is powerful.',
'React makes building UIs easy.',
'I want to become a full-stack developer.',
'APIs are fascinating.',
'I enjoy working with databases.',
'Version control is essential.',
'I love open-source projects.',
'Continuous learning is key to success.',
'I enjoy collaborating with other developers.',
'Writing clean code is important.',
'I like to automate tasks with scripts.',
'Testing is crucial for software quality.',
'I enjoy solving complex problems.',
'I am passionate about technology.',
'I like to attend tech meetups.',
'Networking is important in the tech industry.',
];

const reactionArrData = [
  'Great job! 👍',
  'Well done! 👏',
  'Amazing! 😍',
  'Fantastic! 🌟',
  'Keep it up! 💪',
  'Impressive! 😲',
  'Outstanding! 🏆',
  'Excellent! 🎉',
  'Superb! 👌',
  'Bravo! 👏',
  'Nice work! 😊',
  'You rock! 🤘',
  'Way to go! 🚀',
  'Good job! 👍',
  'Awesome! 😎',
  'Terrific! 🌟',
  'Incredible! 😲',
  'Marvelous! 😍',
  'Splendid! 🌟',
  'Phenomenal! 🏆',
  'Top-notch! 👌',
  'Exceptional! 🎉',
  'Remarkable! 😊',
  'Brilliant! 🌟',
  'Stellar! 🚀',
  'Super! 👍',
  'Wonderful! 😍',
  'Magnificent! 👏',
  'Fabulous! 😎',
  'Spectacular! 🌟'
];





// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];


// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(nameArrData)}`.toLowerCase();






// Function to generate random assignments that we can add to student object.
const getRandomThought =() => getRandomArrItem(thoughtArrData);






const getRandomFriends = (int,arr) => {
  const friendsArr = [];
  for (let i = 0; i < int; i++) {
    friendsArr.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return friendsArr;
};

const getRandomReactions = (int) => {
  const reactionsArr = [];
  for (let i = 0; i < int; i++) {
    reactionsArr.push({
      reactionBody: getRandomArrItem(reactionArrData),
      username: getRandomName(),
    }
    );
  }
  return reactionsArr;

};


// Export the functions for use in seed.js
module.exports = 
      { 
  getRandomName, getRandomThought, 
  getRandomFriends, getRandomArrItem,
  thoughtArrData,getRandomReactions
                  };
