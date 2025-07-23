import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  rentedAt: {
    type: Date,
    default: Date.now, 
  },
  dueDate: { 
    type: Date,
    required: true,
  },
  returnedAt: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'active', 'returned', 'late'],
    default: 'pending',
  },
  lateFee: {
    type: Number,
    default: 0,
  },
  rentalDurationInDays: {
    type: Number,
    required: true,
    min: 1,
  },
}, {
  timestamps: true,
});

const Rental = mongoose.model('Rental', rentalSchema);
export default Rental;
