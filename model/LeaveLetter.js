import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    user: { type: String },
    leverLetters:{
        date : {type:Date},
        to:{type:String},
        data:{type:String},
        mentorApproved:{type:Boolean},
        hodApproved:{type:Boolean}
    }
  },
  { timestamps: true }
);

export default mongoose.models.studentDetails || mongoose.model("studentDetails", userSchema);