const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    position: { type: String },
    notes: { type: String },
    jobApplicationId: { type: mongoose.Types.ObjectId, ref: 'JobApplication' },
  },
  {
    collection: 'recruiters',
    timestamps: true,
  },
);

module.exports = mongoose.model('Recruiter', recruiterSchema);
