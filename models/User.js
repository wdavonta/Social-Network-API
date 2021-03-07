const { Schema, model, Types } = require('mongoose');
// const Thought = require('./Thought.js');


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
            type: Schema.Types.ObjectId,
            ref: 'Thought'

            }
        ],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'User'
    
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

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

const User = model('User', UserSchema);

module.exports = User;