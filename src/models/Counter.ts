import { Schema, model, models } from 'mongoose';

export const CounterSchema = new Schema({
  key: { type: String, required: true, unique: true },
  value: { type: Number, default: 0 }
});

const Counter = models?.Counter || model('Counter', CounterSchema);
export default Counter;