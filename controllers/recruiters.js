const { default: mongoose } = require('mongoose');
const Recruiters = require('../models/Recruiters');

const getAll = async (req, res) => {
  //#swagger.tags=['Recruiters']
  /* #swagger.description = 'Get all recruiters' */
  try {
    const recruiters = await Recruiters.find();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(recruiters);
  } catch (error) {
    console.error('Error fetching all recruiters', error);
    res.status(500).json({ message: 'Error retrieving recruiters' });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Recruiters']
  /* #swagger.description = 'Get a single recruiter by ID' */
  /* #swagger.parameters['id'] = {
       in: 'path',
       description: 'Recruiter ID',
       required: true,
       type: 'string'
  } */
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const recruiter = await Recruiters.findById(id);

    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(recruiter);
  } catch (error) {
    console.error('Error fetching recruiter', error);
    res.status(500).json({ message: 'Error retrieving recruiter' });
  }
};

const createRecruiter = async (req, res) => {
  //#swagger.tags = ['Recruiters']
  /* #swagger.description = 'Create a new recruiter' */
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Recruiter info',
      required: true,
      schema: {
        $name: 'John Doe',
        $company: 'Tech Corp',
        $email: 'john.doe@example.com',
        phone: '1234567890',
        position: 'HR Manager',
        notes: 'Contacted via LinkedIn',
        jobApplicationId: '60d21b4667d0d8992e610c85'
      }
  } */ try {
    const newRecruiter = new Recruiters({
      name: req.body.name,
      company: req.body.company,
      email: req.body.email,
      phone: req.body.phone,
      position: req.body.position,
      notes: req.body.notes,
      jobApplicationId: req.body.jobApplicationId,
    });
    const saveRecruiter = await newRecruiter.save();
    res.status(201).json(saveRecruiter);
  } catch (error) {
    res.status(500).json({
      message: 'Error creating new recruiter',
      error: error.message,
    });
  }
};

const updateRecruiter = async (req, res) => {
  //#swagger.tags = ['Recruiters']
  /* #swagger.description = 'Update an existing recruiter by ID' */
  /* #swagger.parameters['id'] = {
       in: 'path',
       description: 'Recruiter ID',
       required: true,
       type: 'string'
  } */
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated recruiter data',
      required: true,
      schema: {
        name: 'John Doe',
        company: 'Tech Corp',
        email: 'john.doe@example.com',
        phone: '1234567890',
        position: 'HR Manager',
        notes: 'Updated notes',
        jobApplicationId: '60d21b4667d0d8992e610c85'
      }
  } */
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const updateRec = await Recruiters.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          company: req.body.company,
          email: req.body.email,
          phone: req.body.phone,
          position: req.body.position,
          notes: req.body.notes,
          jobApplicationId: req.body.jobApplicationId,
        },
      },
      { new: true, runValidators: true },
    );
    if (!updateRec) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }
    res.status(200).json(updateRec);
  } catch (error) {
    res.status(500).json({
      message: 'Error updating recruiter',
      error: error.message,
    });
  }
};

const deleteRecruiter = async (req, res) => {
  //#swagger.tags = ['Recruiters']
  /* #swagger.description = 'Delete a recruiter by ID' */
  /* #swagger.parameters['id'] = {
       in: 'path',
       description: 'Recruiter ID',
       required: true,
       type: 'string'
  } */
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const deleteRec = await Recruiters.findByIdAndDelete(id);

    if (!deleteRec) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }
    res.status(200).json({ message: 'Recruiter deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting recruiter',
      error: error.message,
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createRecruiter,
  updateRecruiter,
  deleteRecruiter,
};
