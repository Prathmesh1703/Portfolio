import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
    default: 'Anonymous'
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [3, 'Message must be at least 3 characters long'],
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    default: null
  },
  category: {
    type: String,
    enum: ['general', 'suggestion', 'bug', 'compliment', 'complaint'],
    default: 'general'
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['new', 'reviewed', 'implemented', 'dismissed'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
feedbackSchema.index({ createdAt: -1 });
feedbackSchema.index({ category: 1 });
feedbackSchema.index({ status: 1 });
feedbackSchema.index({ isPublic: 1 });

// Virtual for feedback age
feedbackSchema.virtual('age').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24)); // Days
});

// Static method to get public feedbacks
feedbackSchema.statics.getPublicFeedbacks = function(limit = 10) {
  return this.find({ isPublic: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('name message rating createdAt');
};

// Method to toggle public status
feedbackSchema.methods.togglePublic = function() {
  this.isPublic = !this.isPublic;
  return this.save();
};

export default mongoose.model('Feedback', feedbackSchema);