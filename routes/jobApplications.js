const express = require('express');
const router = express.Router();
const {
  jobApplicationValidation,
  validateRequest,
} = require('../validators/jobApplicationValidator');
const JobApplicationController = require('../controllers/jobApplications');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', JobApplicationController.getAll);

router.get('/:id', JobApplicationController.getSingle);

router.post(
  '/',
  isAuthenticated,
  jobApplicationValidation,
  validateRequest,
  JobApplicationController.createJobApplication,
);

router.put(
  '/:id',
  isAuthenticated,
  jobApplicationValidation,
  validateRequest,
  JobApplicationController.updateJobApplication,
);

router.delete(
  '/:id',
  isAuthenticated,
  JobApplicationController.deleteJobApplication,
);

module.exports = router;
