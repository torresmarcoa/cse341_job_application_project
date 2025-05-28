const express = require('express');
const router = express.Router();
const {
  recruiterValidation,
  validateRequest,
} = require('../validators/recruiterValidator');

const RecruiterController = require('../controllers/recruiters');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', RecruiterController.getAll);

router.get('/:id', RecruiterController.getSingle);

router.post(
  '/',
  isAuthenticated,
  recruiterValidation,
  validateRequest,
  RecruiterController.createRecruiter,
);

router.put(
  '/:id',
  isAuthenticated,
  recruiterValidation,
  validateRequest,
  RecruiterController.updateRecruiter,
);

router.delete('/:id', isAuthenticated, RecruiterController.deleteRecruiter);

module.exports = router;
