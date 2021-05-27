import mongoose,{Schema} from 'mongoose';

const comment = new Schema({
    author: mongoose.Types.ObjectId,
    content: String,
    parentComment:{
      type: mongoose.Types.ObjectId,
      default: null
    }
});

export default mongoose.model('Comment',comment);
