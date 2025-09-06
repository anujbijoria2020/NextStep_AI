import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Document = mongoose.Document;


interface RoadMapItem  {
 
title:string,
description:string,
difficulty:"beginner"|"intermediate"|"advanced",
timeframe:string,
resources:string[],
}

interface RoadMapDocument extends Document{
   user: mongoose.Types.ObjectId;  
  goal: string;
  topic: string;
    title:string,
    description:string,
    items:RoadMapItem[];
}

const UserSchema = new Schema({
    email:{
        type:String,
        require:true,
    },
      password: { type: String },
      verificationCode:{type:String},
      isVerified:{type:Boolean,default:false},
      otpExpiresAt:{type:Date}
})

//roadmap generated 



const RoadMapItemSchema = new Schema<RoadMapItem>({
     title: { type: String, required: true },
  description: { type: String, required: true },
  timeframe: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  resources: { type: [String], default: [] }
});

const RoadMapDocumentSchema = new Schema<RoadMapDocument>({
   user: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
  goal: { type: String, required: true },
  topic: { type: String, required: true },
   title: { type: String, required: true },
    description: { type: String, required: true },
    items: { type: [RoadMapItemSchema], required: true },
},{timestamps:true})


  export const User = mongoose.model("User",UserSchema);
export const RoadMapModel = mongoose.model("RoadMap",RoadMapDocumentSchema);
