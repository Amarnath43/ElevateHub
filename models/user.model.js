const bcrypt=require('bcrypt');
const {Schema, model}=require('mongoose');

const userSchema=new Schema({
    name:{
        type: Schema.Types.String,
        required:true,
        trim:true
    },
    username:{
        type:Schema.Types.String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:Schema.Types.String,
        required:true,
        trim:true,
        unique:true
    },
    
    password:{
        type:Schema.Types.String,
        required:true,
        trim:true,
        unique:true
    },
    role:{
        type: Schema.Types.String,
        enum:["student","mentor"],
        default:null
        
    }
})

userSchema.methods.isPasswordMatch=async(password)=>{
     return await bcrypt.compare(password,this.password)
}

userSchema.pre("save", async function(next)
{
    if(this.isModified("password"))
    {
        this.password=await bcrypt.hash(this.password, 8)
    }
    next();
})

const UserModel = model("User", userSchema);
module.exports = UserModel;