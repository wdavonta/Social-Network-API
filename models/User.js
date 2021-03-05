const { Schema, model, Types } = require('mongoose');
const Thought = require('./Thought.js');


const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is Required'

        },
        email: {
            type: String,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
            required: 'Email is required'

        },
        thoughts: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thought'

            }
        ],
        friends: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
    
            }
        ],
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false
      }

);

CommentSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

const User = model('User', UserSchema);

module.exports = User;