const { User, Thought } = require('../models');

const userController = { 
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      })
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate([
        {path: 'thought', 
        select: '-__v'},

        { path: 'friends',
         select: '-__v'}
      ])
      .select('-__v')
      .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {res.status(400).json(err);
    
    });


  },

  // createUser
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

// update user by id
updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => {
    if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      return Thought.deleteMany({ userId: params.od})
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },



    // add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: friendId } },
            { new: true}
        )

        .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            return res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },



    // delete friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId }},
            { new: true}
          )

        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
          
     }
     


};

module.exports = userController;