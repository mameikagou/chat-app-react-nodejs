import mongoose from "npm:mongoose";
const { Schema } = mongoose;

const thisSalesSchema = new Schema({
  item: String,
  price: Number,
  quantity: Number,
  date: { type: Date, default: Date.now },
});

const Sales = mongoose.model('Sales', thisSalesSchema);

export default Sales;