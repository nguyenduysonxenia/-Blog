import mongoose,{Schema} from 'mongoose';

const post = new Schema({
  author: mongoose.Types.ObjectId,
  category: mongoose.Types.ObjectId,
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  image:{
    type: String,
    default: null
  },
  likes: [mongoose.Types.ObjectId],
  views: {
    type: Number,
    default: 0
  },
  deleted:{
    type: Boolean,
    default: false
  },
  comments: [mongoose.Types.ObjectId],
  actived: {
    type: Boolean,
    default: true
  }
},{
  timestamps: true
});

export default mongoose.model('Post',post);
