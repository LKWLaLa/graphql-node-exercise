const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    name: String,
    dateTime: Date,
    description: String,
    organizationId: String
  },
  { timestamps: { createdAt: 'createdAt' }}
);

module.exports = mongoose.model('Event', eventSchema);
