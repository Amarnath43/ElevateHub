require("dotenv").config(); 
const config=require("./config")

const app=require("./app")

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to ElevateHub API"
        
    });
});

app.listen(config.PORT, ()=>
{
    console.log(`backend server is running on ${config.PORT}`)
})

