import mongoose,{Schema} from 'mongoose';

const comment = new Schema({
    author: mongoose.Types.ObjectId,
    content: String,
    parentComment:{
      type: mongoose.Types.ObjectId,
      default: null
    }
},{
  timestamps: true
});

export default mongoose.model('Comment',comment);
