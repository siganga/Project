// backend/routes/assetRoutes.js
const express = require('express');
const {
  createAsset,
  getAllAssets,
  getAssetByName,
  updateAsset,
  deleteAsset,
} = require('../controllers/AssetController');

const router = express.Router();

// Route to create a new asset (requires image upload as 'image' field in form-data)
router.post('/', createAsset);

// Route to get all assets
router.get('/', getAllAssets);

// Route to get a specific asset by name
router.get('/:name', getAssetByName);

// Route to update an existing asset by name (can update image as 'image' field in form-data or just the type in the body)
router.put('/:name', updateAsset);

// Route to delete an asset by name
router.delete('/:name', deleteAsset);

module.exports = router;