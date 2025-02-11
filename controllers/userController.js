

const { User, Thought } = require('../models');

// TODO: Create an aggregate function to get the number of users overall
const headCount = async (req, res) => {
  // Your code here
 
  try{
    const numberOfUser = await User.aggregate([

      
        {
          
          $group:{
            _id: null,
            total_User: {$count:{}}
          }
        }
    ])
    return numberOfUser;
  }
  catch(err){
    res.status(500).json(err)
  }

}


module.exports = {


  async getUsers(req, res) {
    try {
      const users = await User.find().select('-__v').lean();
      //to display friends, we use .lean() to convert the mongoose document into a plain JavaScript object 
      //if we don't use .lean(), the friends array will be an array of mongoose documents, which will not be displayed in the response 
      //since we are not using the __v field, we can exclude it from the query results using the select() method
      const userObject ={
        users,
        totalUsers: await headCount()
      }
      res.json(userObject); 
       
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const Singleuser = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .lean()
        .populate({ path: 'thoughts', select: '-_id -__v -reactions._id -reactions.createdAt' })
        .populate({ path: 'friends', select: 'username email' });
   
      //we don't want to display the _id and __v fields in the response 
      // and we don't want to display the reactions' _id and createdAt fields
      // lean() method is used to convert the mongoose document into a plain JavaScript object 
      // such as JSON object. For example, suppose you have a mongoose document like this:
      // { _id: 5f1f3b5b4e7b4b1f3c1b4e7b, name: 'John', age: 25 }
      // and you want to convert it into a plain JavaScript object like this:
      // { _id: 5f1f3b5b4e7b4b1f3c1b4e7b, name: 'John', age: 25 }
      if (!Singleuser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(Singleuser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Create a user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
            
      );
      if (!user) //if the user doesn't exist, return a 404 status code and a message
         {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }

  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      const deleteUser = await User.findOneAndDelete({ _id: req.params.userId });
      if (!deleteUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      // Delete all thoughts associated with the user, _id is the user's id since we are deleting multiple thoughts
      // associated with the user, we use deleteMany() instead of findOneAndDelete()
      //$in is a query operator that matches the value of a field against an array of values
      //_id will be matched thoughts array in the User model
      console.log(deleteUser.thoughts);
      await Thought.deleteMany({ _id: { $in: deleteUser.thoughts } });

      await User.updateMany // we use updateMany() to update multiple documents that meet the query criteria
      (
        { friends: deleteUser._id }, 
        { $pull: { friends: deleteUser._id } }
      );//
      
      

      res.json({ message: 'User and thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },














  // // Get a single student
  // async getSingleStudent(req, res) {
  //   try {
  //     const student = await Student.findOne({ _id: req.params.studentId })
  //       .select('-__v')
  //       .lean();// lean() method is used to convert the mongoose document into a plain JavaScript object 
  //       // such as JSON object. For example, suppose you have a mongoose document like this: 
  //       // { _id: 5f1f3b5b4e7b4b1f3c1b4e7b, name: 'John', age: 25 } 
  //       // and you want to convert it into a plain JavaScript object like this: 
  //       // { _id: 5f1f3b5b4e7b4b1f3c1b4e7b, name: 'John', age: 25 }
        


  //     if (!student) {
  //       return res.status(404).json({ message: 'No student with that ID' });
  //     }

  //     res.json({
  //       student,
  //       grade: await grade(req.params.studentId),
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).json(err);
  //   }
  // },
  // // create a new student
  // async createStudent(req, res) {
  //   try {
  //     const student = await Student.create(req.body);
  //     res.json(student);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
  // // Delete a student and remove them from the course
  // async deleteStudent(req, res) {
  //   try {
  //     const student = await Student.findOneAndRemove({ _id: req.params.studentId });

  //     if (!student) {
  //       return res.status(404).json({ message: 'No such student exists' })
  //     }

  //     const course = await Course.findOneAndUpdate(
  //       { students: req.params.studentId },
  //       { $pull: { students: req.params.studentId } },
  //       { new: true }
  //     );

  //     if (!course) {
  //       return res.status(404).json({
  //         message: 'Student deleted, but no courses found',
  //       });
  //     }

  //     res.json({ message: 'Student successfully deleted' });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json(err);
  //   }
  // },

  // // Add an assignment to a student
  // async addAssignment(req, res) {
  //   try {
  //     console.log('You are adding an assignment');
  //     console.log(req.body);
  //     const student = await Student.findOneAndUpdate(
  //       { _id: req.params.studentId },
  //       { $addToSet: { assignments: req.body } },
  //       { runValidators: true, new: true }
  //     );

  //     if (!student) {
  //       return res
  //         .status(404)
  //         .json({ message: 'No student found with that ID :(' })
  //     }

  //     res.json(student);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
  // // Remove assignment from a student
  // async removeAssignment(req, res) {
  //   try {
  //     const student = await Student.findOneAndUpdate(
  //       { _id: req.params.studentId },
  //       { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
  //       { runValidators: true, new: true }
  //     );

  //     if (!student) {
  //       return res
  //         .status(404)
  //         .json({ message: 'No student found with that ID :(' });
  //     }

  //     res.json(student);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
};
