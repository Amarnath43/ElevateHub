const Joi=require('joi')

const httpStatus=require("../util/httpStatus")
const ApiError=require("../helper/apiError");

const ValidationSource={
    BODY: "body",
    QUERY: "query",
    PARAMS:"params",
    HEADER: "headers"
};

module.exports=(schema, source=ValidationSource.BODY)=>{
    return (req,res,next)=>
    {
        try {
        const {error}=schema.validate(req[source]);
        if(!error)
        {
            next();
        }
        const {details}=error;
        const message=details.map((i)=>i.message.replace(/['"]+/g,"")).join(",");
        console.log(message);
       return next(new ApiError(httpStatus.badRequest, message))

    }
    catch(e)
    {
        console.log(e);
    }
}

}