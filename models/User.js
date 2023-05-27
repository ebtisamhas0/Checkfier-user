const mongoose = require ('mongoose');
const UserSchema =new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  points: { type: Number, default: 0 },
} , {timestamps: true}) 

this.phone = this.phone ? this.phone : undefined;
mongoose.model("user", UserSchema);