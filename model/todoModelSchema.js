import mongoose from "mongoose";
import autoIncrement from 'mongoose-auto-increment';

autoIncrement.initialize(mongoose.connection);
const { Schema } = mongoose;

const TodoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Number,
    enum: [0,1,2,4,5],
    default: 1,
  },
  images: [
    {
      type: String,
    },
  ],
  user: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who owns the todo
});

TodoSchema.plugin(autoIncrement.plugin, {
    model: 'todo',
    field: '_id',
    startAt: 1, // The starting ID value
    incrementBy: 1, // The increment value for each new ID
  });
  
const TodoModel = mongoose.model('todo', TodoSchema);
  
export default TodoModel;

