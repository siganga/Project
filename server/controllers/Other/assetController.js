// backend/controllers/assetController.js
const Asset = require('../../models/Other/assetModel');
const multer = require('multer');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Controller to create a new asset
const createAsset = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'Error uploading image', error: err });
    }

    if (!req.body.name || !req.body.type || !req.file) {
      return res.status(400).json({ message: 'Please provide a name, type, and image' });
    }

    const { name, type } = req.body;
    const image = req.file.buffer;
    const mimeType = req.file.mimetype;

    try {
      const newAsset = new Asset({ name, type, image, mimeType });
      const savedAsset = await newAsset.save();
      res.status(201).json(savedAsset);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Asset name already exists' });
      }
      res.status(500).json({ message: 'Error creating asset', error: error });
    }
  });
};

// Controller to get all assets
const getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assets', error: error });
  }
};

// Controller to get a specific asset by name
const getAssetByName = async (req, res) => {
  try {
    const asset = await Asset.findOne({ name: req.params.name });
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    // Send the image data and MIME type
    res.set('Content-Type', asset.mimeType);
    res.send(asset.image);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching asset', error: error });
  }
};

// Controller to update an existing asset (can update image or type)
const updateAsset = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'Error uploading image', error: err });
    }

    try {
      const asset = await Asset.findOne({ name: req.params.name });
      if (!asset) {
        return res.status(404).json({ message: 'Asset not found' });
      }

      if (req.body.type) {
        asset.type = req.body.type;
      }
      if (req.file) {
        asset.image = req.file.buffer;
        asset.mimeType = req.file.mimetype;
      }

      const updatedAsset = await asset.save();
      res.json(updatedAsset);
    } catch (error) {
      res.status(500).json({ message: 'Error updating asset', error: error });
    }
  });
};

// Controller to delete an asset by name
const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findOneAndDelete({ name: req.params.name });
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    res.json({ message: 'Asset deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting asset', error: error });
  }
};

module.exports = {
  createAsset,
  getAllAssets,
  getAssetByName,
  updateAsset,
  deleteAsset,
};