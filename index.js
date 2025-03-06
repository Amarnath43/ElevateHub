require("dotenv").config(); 

const app=require("./app")

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to ElevateHub API"
        
    });
});

app.listen(process.env.PORT, ()=>
{
    console.log("backend server ")
})

