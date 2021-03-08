const { Schema, Types } = require('mongoose');

const ReactionSchema = new Schema (

    {
        reactionId: {
            type: Types.ObjectId,
            default: () => new Types.ObjectId()

        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength:280

        },
        username: {
            type: String,
            required: true
        
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
        },
        {
            toJSON: {
              getters: true
            },
            id: false
        }



);

module.exports = ReactionSchema;