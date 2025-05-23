const express = require('express');
const router = express.Router();
const {
  jobApplicationValidation,
  validateRequest,
} = require('../validators/jobApplicationValidator');
const JobApplicationController = require('../controllers/jobApplications');

router.get('/', JobApplicationController.getAll);

router.get('/:id', JobApplicationController.getSingle);

router.post(
  '/',
  jobApplicationValidation,
  validateRequest,
  JobApplicationController.createJobApplication,
);

router.put(
  '/:id',
  jobApplicationValidation,
  validateRequest,
  JobApplicationController.updateJobApplication,
);

router.delete('/:id', JobApplicationController.deleteJobApplication);

module.exports = router;
