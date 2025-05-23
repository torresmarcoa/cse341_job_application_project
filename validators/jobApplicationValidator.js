const { body, validationResult } = require('express-validator');

const jobApplicationValidation = [
  body('jobTitle').notEmpty().withMessage('Job title is required'),
  body('company').notEmpty().withMessage('Company is required'),
  body('salary').optional().isNumeric().withMessage('Salary must be a number'),
  body('status')
    .notEmpty()
    .isIn(['Applied', 'Interview', 'Offer', 'Rejected'])
    .withMessage('Invalid status'),
  body('applicationDate').isISO8601().withMessage('Invalid date'),
  body('jobLink').optional().isURL().withMessage('Invalid job link'),
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { jobApplicationValidation, validateRequest };
