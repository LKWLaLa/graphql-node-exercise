const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema(
  {
    name: String,
    address: String,
    latitude: String,
    longitude: String,
    organizationId: String
  },
  { timestamps: { createdAt: 'createdAt' }
);

module.exports = mongoose.model('Location', locationSchema);
