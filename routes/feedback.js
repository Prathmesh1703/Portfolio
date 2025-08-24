import express from 'express';
import Feedback from '../models/Feedback.js';
import { sendFeedbackEmail } from '../utils/mailer.js';

const router = express.Router();

// Validation middleware
const validateFeedbackData = (req, res, next) => {
  const { name, message, rating, category, isPublic } = req.body;
  const errors = [];

  // Name validation (optional)
  if (name !== undefined && name !== null) {
    if (typeof name !== 'string') {
      errors.push('Name must be a string');
    } else if (name.trim().length > 100) {
      errors.push('Name cannot exceed 100 characters');
    }
  }

  // Message validation (required)
  if (!message || typeof message !== 'string') {
    errors.push('Message is required and must be a string');
  } else if (message.trim().length < 3) {
    errors.push('Message must be at least 3 characters long');
  } else if (message.trim().length > 500) {
    errors.push('Message cannot exceed 500 characters');
  }

  // Rating validation (optional)
  if (rating !== undefined && rating !== null) {
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      errors.push('Rating must be an integer between 1 and 5');
    }
  }

  // Category validation (optional)
  if (category !== undefined && category !== null) {
    const validCategories = ['general', 'suggestion', 'bug', 'compliment', 'complaint'];
    if (!validCategories.includes(category)) {
      errors.push(`Category must be one of: ${validCategories.join(', ')}`);
    }
  }

  // IsPublic validation (optional)
  if (isPublic !== undefined && isPublic !== null) {
    if (typeof isPublic !== 'boolean') {
      errors.push('isPublic must be a boolean');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }

  // Sanitize data
  if (name) req.body.name = name.trim();
  req.body.message = message.trim();

  next();
};

// Rate limiting middleware (simple in-memory store)
const feedbackAttempts = new Map();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 5;

const rateLimitMiddleware = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (feedbackAttempts.has(clientIP)) {
    const attempts = feedbackAttempts.get(clientIP);
    const recentAttempts = attempts.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);
    
    if (recentAttempts.length >= MAX_ATTEMPTS) {
      return res.status(429).json({
        success: false,
        error: 'Too many feedback submissions. Please wait 10 minutes before trying again.',
        retryAfter: Math.ceil((RATE_LIMIT_WINDOW - (now - Math.min(...recentAttempts))) / 1000)
      });
    }
    
    feedbackAttempts.set(clientIP, [...recentAttempts, now]);
  } else {
    feedbackAttempts.set(clientIP, [now]);
  }
  
  next();
};

// POST /api/feedback - Submit feedback
router.post('/', rateLimitMiddleware, validateFeedbackData, async (req, res) => {
  try {
    const { name, message, rating, category, isPublic } = req.body;
    
    // Create feedback record
    const feedback = new Feedback({
      name: name || 'Anonymous',
      message,
      rating: rating || null,
      category: category || 'general',
      isPublic: isPublic || false
    });

    // Save to database
    const savedFeedback = await feedback.save();
    console.log(`💬 New feedback from ${feedback.name}: ${message.substring(0, 50)}...`);

    // Send email notification
    let emailResult = { success: false };
    try {
      emailResult = await sendFeedbackEmail({
        name: feedback.name,
        message: feedback.message,
        rating: feedback.rating,
        category: feedback.category
      });
    } catch (emailError) {
      console.error('Feedback email sending failed:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully! Thank you for your input.',
      data: {
        id: savedFeedback._id,
        timestamp: savedFeedback.createdAt
      },
      emailSent: emailResult.success
    });

  } catch (error) {
    console.error('Feedback form error:', error);

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to submit feedback. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/feedback - Get all feedback (admin only - you can add auth middleware later)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status;
    const category = req.query.category;
    const isPublic = req.query.isPublic;
    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    if (status && ['new', 'reviewed', 'implemented', 'dismissed'].includes(status)) {
      query.status = status;
    }
    if (category && ['general', 'suggestion', 'bug', 'compliment', 'complaint'].includes(category)) {
      query.category = category;
    }
    if (isPublic !== undefined) {
      query.isPublic = isPublic === 'true';
    }

    // Get feedback with pagination
    const [feedback, total] = await Promise.all([
      Feedback.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Feedback.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: feedback,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get feedback error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve feedback'
    });
  }
});

// GET /api/feedback/public - Get public feedback (for displaying on website)
router.get('/public', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;

    // Build query for public feedback
    const query = { isPublic: true };
    if (category && ['general', 'suggestion', 'bug', 'compliment', 'complaint'].includes(category)) {
      query.category = category;
    }

    const feedback = await Feedback.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('name message rating category createdAt')
      .lean();

    res.json({
      success: true,
      data: feedback
    });

  } catch (error) {
    console.error('Get public feedback error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve public feedback'
    });
  }
});

// GET /api/feedback/:id - Get specific feedback
router.get('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Feedback not found'
      });
    }

    res.json({
      success: true,
      data: feedback
    });

  } catch (error) {
    console.error('Get feedback error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve feedback'
    });
  }
});

// PUT /api/feedback/:id/status - Update feedback status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['new', 'reviewed', 'implemented', 'dismissed'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be one of: new, reviewed, implemented, dismissed'
      });
    }

    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Feedback not found'
      });
    }

    res.json({
      success: true,
      message: 'Feedback status updated successfully',
      data: feedback
    });

  } catch (error) {
    console.error('Update feedback status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update feedback status'
    });
  }
});

// PUT /api/feedback/:id/public - Toggle public status
router.put('/:id/public', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Feedback not found'
      });
    }

    feedback.isPublic = !feedback.isPublic;
    await feedback.save();

    res.json({
      success: true,
      message: `Feedback ${feedback.isPublic ? 'made public' : 'made private'}`,
      data: feedback
    });

  } catch (error) {
    console.error('Toggle feedback public status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update feedback public status'
    });
  }
});

// DELETE /api/feedback/:id - Delete feedback
router.delete('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Feedback not found'
      });
    }

    res.json({
      success: true,
      message: 'Feedback deleted successfully'
    });

  } catch (error) {
    console.error('Delete feedback error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete feedback'
    });
  }
});

// GET /api/feedback/stats/summary - Get feedback statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const [
      totalFeedback,
      newFeedback,
      reviewedFeedback,
      implementedFeedback,
      dismissedFeedback,
      publicFeedback
    ] = await Promise.all([
      Feedback.countDocuments(),
      Feedback.countDocuments({ status: 'new' }),
      Feedback.countDocuments({ status: 'reviewed' }),
      Feedback.countDocuments({ status: 'implemented' }),
      Feedback.countDocuments({ status: 'dismissed' }),
      Feedback.countDocuments({ isPublic: true })
    ]);

    // Get recent feedback (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentFeedback = await Feedback.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    // Get feedback by category
    const categoryStats = await Feedback.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get average rating
    const averageRating = await Feedback.aggregate([
      {
        $match: { rating: { $ne: null } }
      },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          totalRated: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        total: totalFeedback,
        new: newFeedback,
        reviewed: reviewedFeedback,
        implemented: implementedFeedback,
        dismissed: dismissedFeedback,
        public: publicFeedback,
        recent: recentFeedback,
        categories: categoryStats.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        averageRating: averageRating.length > 0 ? {
          rating: Math.round(averageRating[0].avgRating * 10) / 10,
          totalRated: averageRating[0].totalRated
        } : null
      }
    });

  } catch (error) {
    console.error('Get feedback stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve feedback statistics'
    });
  }
});

export default router;

// Client-side code example (to be used in your frontend application)
// const res = await fetch("http://localhost:5000/api/feedback", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(formData),
// });