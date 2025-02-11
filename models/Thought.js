const { Schema, model } = require('mongoose');
 const reactionSchema = require('./Reaction');

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,

    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => new Date(timestamp).toLocaleString().split(',')[0],
    },

    username: {
      type: String,
      required: true,
    },
    
    reactions: [reactionSchema],

  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false, 
  },
);


thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  })


const Thought = model('thought', thoughtSchema);

module.exports = Thought;
