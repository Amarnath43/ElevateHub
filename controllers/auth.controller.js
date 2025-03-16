const userService=require("../services/auth.service");
const httpsStatus=require("../util/httpStatus");
const tokenService=require("../services/token.service")


const signUp=async(req,res)=>{

    const {name, email, password, username, role}=req.body;
    const user= await userService.createUser(
        {
            name,
            email,
            username,
            password,
            role
        }
    )
    user.password=undefined;
    return res.status(httpsStatus.created).json({message: "Account created successfully",user});
}

const signIn=async(req,res)=>{
    const {email, password}=req.body;
    const user=await userService.loginUserWithEmailAndPassword(email,password);
    const token=await tokenService.generateAuthToken(user);
    user.password=undefined;

    res.status(httpsStatus.ok).json({message: "Logged in successfully", user, token})


}


module.exports={signUp, signIn};