const { default: mongoose } = require('mongoose');
const JobApplication = require('../models/JobApplication');

const getAll = async (req, res) => {
  //#swagger.tags=['Job Application']
  try {
    const jobApplications = await JobApplication.find();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(jobApplications);
  } catch (error) {
    console.error('Error fetching job applications', error);
    res.status(500).json({ message: 'Error retrieving job applications' });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Job Application']
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const jobApplication = await JobApplication.findById(id);

    if (!jobApplication) {
      return res.status(404).json({ message: 'Job application not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(jobApplication);
  } catch (error) {
    console.error('Error fetching job application', error);
    res.status(500).json({ message: 'Error retrieving job application' });
  }
};

const createJobApplication = async (req, res) => {
  //#swagger.tags = ['Job Application']
  /* #swagger.description = 'Creates a new job application' */
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Job application information',
      required: true,
      schema: {
        $jobTitle: 'Software Engineer',
        $company: 'Tech Corp',
        location: 'New York',
        salary: 80000,
        status: 'Applied',
        applicationDate: '2025-05-20',
        jobLink: 'https://joblink.example.com',
        notes: 'Follow up in two weeks',
        resumeVersion: 'v1'
      }
  } */
  try {
    const newJobApp = new JobApplication({
      jobTitle: req.body.jobTitle,
      company: req.body.company,
      location: req.body.location,
      salary: req.body.salary,
      status: req.body.status,
      applicationDate: req.body.applicationDate,
      jobLink: req.body.jobLink,
      notes: req.body.notes,
      resumeVersion: req.body.resumeVersion,
    });
    const saveJobApp = await newJobApp.save();
    res.status(201).json(saveJobApp);
  } catch (error) {
    res.status(500).json({
      message: 'Error creating new job application',
      error: error.message,
    });
  }
};

const updateJobApplication = async (req, res) => {
  //#swagger.tags = ['Job Application']
  /* #swagger.description = 'Updates an existing job application by ID' */
  /* #swagger.parameters['id'] = {
       in: 'path',
       description: 'Job application ID',
       required: true,
       type: 'string'
  } */
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated job application data',
      required: true,
      schema: {
        jobTitle: 'Software Engineer',
        company: 'Tech Corp',
        location: 'New York',
        salary: 85000,
        status: 'Interview',
        applicationDate: '2025-05-20',
        jobLink: 'https://joblink.example.com',
        notes: 'Interview scheduled',
        resumeVersion: 'v2'
      }
  } */
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const updatedJobApp = await JobApplication.findByIdAndUpdate(
      id,
      {
        $set: {
          jobTitle: req.body.jobTitle,
          company: req.body.company,
          location: req.body.location,
          salary: req.body.salary,
          status: req.body.status,
          applicationDate: req.body.applicationDate,
          jobLink: req.body.jobLink,
          notes: req.body.notes,
          resumeVersion: req.body.resumeVersion,
        },
      },
      { new: true, runValidators: true },
    );

    if (!updatedJobApp) {
      return res.status(404).json({ message: 'Job application not found' });
    }

    res.status(200).json(updatedJobApp);
  } catch (error) {
    res.status(500).json({
      message: 'Error updating job application',
      error: error.message,
    });
  }
};

const deleteJobApplication = async (req, res) => {
  //#swagger.tags=['Job Application']
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const deletedJobApp = await JobApplication.findByIdAndDelete(id);

    if (!deletedJobApp) {
      return res.status(404).json({ message: 'Job application not found' });
    }

    res.status(200).json({ message: 'Job application deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting job application',
      error: error.message,
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createJobApplication,
  updateJobApplication,
  deleteJobApplication,
};
