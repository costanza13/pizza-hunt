const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema({
  // set custom id to avoid confusion with parent comment _id
  replyId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  replyBody: {
    type: String,
    required: '*Blank Stare* is not a valid reply',
    trim: true
  },
  writtenBy: {
    type: String,
    required: "Don't be ashamed, give us your name!"
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
  }
});

const CommentSchema = new Schema({
  writtenBy: {
    type: String,
    required: 'Provide a name, or the comment dies.'
  },
  commentBody: {
    type: String,
    required: 'Cat got your tongue? Please add some text to your comment.'
  },
  replies: [ReplySchema],
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
});

CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;