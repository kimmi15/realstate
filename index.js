const express = require("express");
const bodyParser = require("body-parser");
const route = require("./Routes/route");
const  mongoose  = require("mongoose");
const app = express();

require('dotenv').config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// console.log(process.env.PORT , process.env.JWT);
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
})
.then( () => console.log('connected DB....!'))
.catch ( err => console.log(err) )


app.use('/', route)


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});