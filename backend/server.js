const app = require('./app')
const dotenv = require('dotenv')

//config
dotenv.config({path:'backend/config/config.env'})


//connecting to database

//dotenv ko config karne ke bad db wali file call kari he bcz isse pehle krte to db wali file me bhi dotenv ko require karke path likhna padta
require('../backend/config/db')



app.listen(process.env.PORT, () => {
    console.log(`Server is up on port ${process.env.PORT}🚀`);
});