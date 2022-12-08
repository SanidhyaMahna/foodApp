const mongoose = require("mongoose");
const {db_link} = require("../secrets");
const planModel = require("./planModel");
const userModel = require("./userModel");

mongoose
    .connect(db_link)
    .then(function(db){
        console.log("reviewModel db connected");
    })
    .catch(function(err){
        console.log(err);
    });

const reviewSchema = mongoose.Schema({
    
    rating:{
        type: Number,
       validate: [function(){
            return this.ratingAverage < 5
        }, 'rating not entered']
    },
    comment:{
        type: String,
        required:false,
        maxLength:[500, `plan name should not exceed 20 characters`],
    },
    createdAt:{
        date: Date,
    },
    user:{
        type : mongoose.Schema.ObjectId,
        ref: "userModel",
    },
    plan:{
        type : mongoose.Schema.ObjectId,
        ref: "planModel",
        required:[true, "plan must belong to user"],
    },
    reviewNum:{
        type:mongoose.Schema.ObjectId,
        ref: numReview+1
    }
})

// find, findById, findOne, findAndUpdate, mein chalta h ye
reviewSchema.pre(/^find/, function(next){
    this.populate({
        path: 'user',
        select:"name profileImage"
    }).populate("plan");
})

const reviewModel = mongoose.model("reviewModel", reviewchema);
module.exports = reviewModel;