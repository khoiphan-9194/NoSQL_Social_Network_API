const { Schema, model } = require('mongoose');


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      validate: {
      validator: async function (username) {
        const user = await this.constructor.findOne({ username });
        return !user;
      },
      message: 'Username already exists!'
      }

    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: async function (email) {
          const user = await this.constructor.findOne({ email });
          return !user;
        },
        message: 'Email already exists!'
      },
      match: [/.+@.+\..+/, 'Must match an email address!'],
      // match property to match the string to the regex pattern to ensure it's a valid email address
      
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought', 
        // The ref property is what tells the User model which documents to search to find the right thoughts.
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user', 
        // self-reference to User model to create a friends list that's populated with an array of _id values referencing the User model itself (self-reference) 
      },
    ],

  },
  {
    toJSON: {
      virtuals: true,

    },
    id: false, 
  },

);


userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })


const User = model('user', userSchema);

module.exports = User;
