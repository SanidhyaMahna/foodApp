const mongoose = require("mongoose");
const {db_link} = require("../secrets");

mongoose
    .connect(db_link)
    .then(function(db){
        console.log("reviewModel db connected");
    })
    .catch(function(err){
        console.log(err);
    });

const reviewSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxLength:[20, `plan name should not exceed 20 characters`],
    },
    ratingsAverage:{
        type: Number,
       validate: [function(){
            return this.ratingAverage < 5
        }, 'rating not entered']
    },
    comment:{
        type: String,
        required:false,
        maxLength:[500, `plan name should not exceed 20 characters`],
    }
})