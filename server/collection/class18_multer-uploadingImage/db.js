var mongoose = require("mongoose");


/////////////////////////////////////////////////////////////////////////////////////////////////
let dbURI = "mongodb+srv://dbuser:dbpassword@cluster0.9qvbs.mongodb.net/abc-database";
// let dbURI = 'mongodb://localhost:27017/abc-database';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

//https://mongoosejs.com/docs/connections.html#connection-events
////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////

const imageSchema = mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    Image:{
        data:Buffer,
        contentType : String
    }
});
const imageModel= mongoose.model('imageModel',imageSchema);
module.exports =imageModel