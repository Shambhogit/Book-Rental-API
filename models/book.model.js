import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  author: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  category: {
    type: [String],
    required: true,
    validate: {
      validator: v => v.length > 0,
      message: 'At least one category is required'
    }
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
  },
  totalCopies: {
    type: Number,
    required: true,
    min: [0, 'Cannot be negative'],
  },
  availableCopies: {
    type: Number,
    required: true,
    min: [0, 'Cannot be negative'],
  },
  pricePerDay: {
    type: Number,
    required: true,
    min: [0, 'Cannot be negative'],
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Cannot be negative'],
  },
  language: {
    type: String,
    required: true,
    trim: true,
  },
  publisher: {
    type: String,
    required: true,
    trim: true,
  },
  publishedDate: {
    type: Date,
    required: true,
  }
}, {
  timestamps: true,
});


bookSchema.index({ title: 1 });
bookSchema.index({ author: 1 });

const Book = mongoose.model('Book', bookSchema);
export default Book;
