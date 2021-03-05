const { Schema, model, Types } = require('mongoose');
const User = require('./User.js');



const ThoughtSchema = new Thought (
    {
        thoughtText: {
            type: String,
            required: 'Username is Required',
            minlength: 1,
            maxlength:280

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'Username is Required'
        
        },
        reactions: [ReactionSchema],
    
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false
      }
)

    const ReactionSchema = new Schema (

        {
            reactionId: {
                type: mongoose.Schema.Types.ObjectId,
                deafult: () => new Types.ObjectId()
    
            },
            reactionBody: {
                type: String,
                required: 'Reaction body is Required',
                minlength: 1,
                maxlength:280
    
            },
            username: {
                type: String,
                required: 'Username is Required'
            
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: createdAtVal => dateFormat(createdAtVal)
            }
            },
            {
                toJSON: {
                  virtuals: true,
                  getters: true
                },
                id: false
            }



);
        
        

 ThoughtSchema.virtual('reactionCount').get(function() {
     return this.reactions.length;
    });
                
const Thought = model('Thought', ThoughtSchema);
                
module.exports = Thought;