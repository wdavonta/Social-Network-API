const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema (

    {
        reactionId: {
            type: Types.ObjectId,
            default: () => new Types.ObjectId()

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

module.exports = ReactionSchema;