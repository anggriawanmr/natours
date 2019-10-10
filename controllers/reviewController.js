const Review = require('./../models/reviewModel');
// const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.aliasTopReview = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratings,review';
  req.query.fields = 'review,rating,tour,user';
  next();
};

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews
    }
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  // Tour.findOne({ _id: req.params.id})

  if (!review) {
    return next(new AppError('There is no review found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      tour: newReview
    }
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findOneAndDelete(req.params.id);

  if (!review) {
    return next(new AppError('There is no review found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: null
  });
});
