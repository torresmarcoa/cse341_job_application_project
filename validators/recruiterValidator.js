const { body, validationResult } = require('express-validator');

const recruiterValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('company').notEmpty().withMessage('Company is required'),
  body('email').notEmpty().isEmail().withMessage('Invalid email address'),
  body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
  body('position')
    .optional()
    .isString()
    .withMessage('Position must be a string'),
  body('notes')
    .optional()
    .isString()
    .isLength({ max: 500 })
    .withMessage('Notes must be a string with max 500 characters'),
  body('jobApplicationId')
    .optional()
    .isMongoId()
    .withMessage('Valid jobApplicationId is required'),
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  recruiterValidation,
  validateRequest,
};
