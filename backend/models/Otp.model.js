import mongoose from "mongoose";
const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    otp: {
      type: String,
      required: true
    },
    token:{
        type:String,
        required:true
    }
  },

  {
    timestamps: true
  }
);

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

export default mongoose.model("Otp", otpSchema);