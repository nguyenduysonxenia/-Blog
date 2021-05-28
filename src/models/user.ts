import mongoose,{Schema} from 'mongoose';
const user = new Schema({
    username:{
        type:String,
        required:true,
        minlength:6
    },
    email:{
        type:String,
        require:true,
        minlength:6
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    admin:{
        type:Boolean,
        default:false
    },
    avatar:{
        type:String,
        default: null
    },
    deleted:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true
});

export default mongoose.model('User',user);
