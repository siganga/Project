// backend/models/Asset.js
const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, //U
  type: { type: String, enum: ['hero_idle', 'hero_attack', 'hero_hurt', 'monster_idle', 'monster_attack', 'monster_hurt', 'background'], required: true },
  image: { type: Buffer, required: true }, // Stores the image data as a Buffer
  mimeType: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Asset', assetSchema);