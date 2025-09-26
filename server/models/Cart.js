const mongoose =require ("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hotelId: { type: String, required: true },
});

const Cart=mongoose.model("Cart", cartSchema);
module.exports=Cart;
