const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    location: String,
    salary: Number,
    status: String,
    applicationDate: Date,
    jobLink: String,
    notes: String,
    resumeVersion: String,
  },
  {
    collection: 'applications',
    timestamps: true,
  },
);

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
