
const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 4,
    },
    username: {
      type: String,
      required: true,

    },
    createdAt: {
      type: Date,
      default: Date.now,
      //  * Use a getter method to format the timestamp on query
      get: timestamp => new Date(timestamp).toLocaleString().split(',')[0],

    },
  },
  {
    toJSON: {
      // getters allow us to transform the data in MongoDB any time it is accessed, like transforming the _id to id
      // for example, we could use a getter to format a date how we want it to appear and then return that value to the API endpoint in place of the default timestamp
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
