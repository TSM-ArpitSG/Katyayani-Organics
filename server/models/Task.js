/**
 * Task Model
 * 
 * @author Arpit Singh
 * @description Mongoose schema for Tasks. Validates title, description,
 * status enums, and maintains a reference to the User who owns the task.
 */
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title must be less than 100 characters'],
  },
  description: {
    type: String,
    default: '',
    maxlength: [500, 'Description must be less than 500 characters'],
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true, // Auto-generates createdAt and updatedAt
});

module.exports = mongoose.model('Task', taskSchema);
