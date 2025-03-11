const express = require("express");
const router = express.Router();

const authRoute=require('./auth.routes');
const homeRoute=require('./home.routes');
//const mentorRoute=require('./mentor.routes');

const Routes=[
    {
        path:'/',
        route:homeRoute
    },
    {
        path:'/auth',
        route: authRoute
    }
]

Routes.forEach((route)=>{
    router.use(route.path,route.route)
})
module.exports=router;