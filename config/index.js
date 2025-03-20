require('dotenv').config()

module.exports={
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    PREFIX: process.env.PREFIX || "/v1",
    jwt:{
        accessSecret:process.env.JWT_ACCESS_SECRET || "random-secret-key",
        accessExpirationMinutes:process.env.JWT_ACCESS_EXPIRATION_MINUTES || 30,
        verificationSecret:process.env.JWT_VERIFICATION_SECRET || "random-secret",
        verificationExpirationMinutes: process.env.JWT_VERIFICATION_EXPIRATION_MINUTES || 5
    },
    cloudinary:{
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,        
        api_secret: process.env.CLOUDINARY_API_SECRET   
      }
}