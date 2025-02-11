const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
async getThoughts(req, res) {
  try {
    const thoughts = await Thought.find();

    return res.json(thoughts);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},

// Get a single thought by id
async getSingleThought(req, res) {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId })
    .select('-__v -reactions._id');

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }

    return res.json(thought);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},

// Create a new thought
async createThought(req, res) {
  try {
    const thought = await Thought.create(req.body);

    const user = await User.findOneAndUpdate(
      { username: req.body.username },
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    return res.json(thought);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},


async deleteThought(req, res) {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });

    }


    const user = await User.findOneAndUpdate(
      { username: thought.username },
      { $pull: { thoughts: thought._id } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user found with this username!' });
    }

    return res.json({ message: 'Thought deleted!' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},

// Add a reaction to a thought
async addReaction(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      // find thought by id
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } }, // add reaction to the reactions array
      //original code: { $addToSet: { reactions: req.body } }, // add reaction to the reactions array
      { new: true } 
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }

    return res.json(thought);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},

// Delete a reaction from a thought
async removeReaction(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }

    

    return res.json(thought);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}


};

