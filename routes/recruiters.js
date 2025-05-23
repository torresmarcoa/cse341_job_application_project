const express = require('express');
const router = express.Router();
const {
  recruiterValidation,
  validateRequest,
} = require('../validators/recruiterValidator');

const RecruiterController = require('../controllers/recruiters');

router.get('/', RecruiterController.getAll);

router.get('/:id', RecruiterController.getSingle);

router.post(
  '/',
  recruiterValidation,
  validateRequest,
  RecruiterController.createRecruiter,
);

router.put(
  '/:id',
  recruiterValidation,
  validateRequest,
  RecruiterController.updateRecruiter,
);

router.delete('/:id', RecruiterController.deleteRecruiter);

module.exports = router;
