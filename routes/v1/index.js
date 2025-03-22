const express = require("express");
const router = express.Router();

const authRoute=require('./auth.routes');
const homeRoute=require('./home.routes');
const mentorRoute=require('./mentor.routes');
const userRoute=require('./user.routes');
const serviceRoute=require('./service.route')

const Routes=[
    {
        path:'/',
        route:homeRoute
    },
    {
        path:'/auth',
        route: authRoute
    },
    {
        path:'/mentor',
        route: mentorRoute
    },
    {
        path:'/user',
        route: userRoute
    },
    {
        path:'/service',
        route: serviceRoute
    },

]

Routes.forEach((route)=>{
    router.use(route.path,route.route)
})
module.exports=router;