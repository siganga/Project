// frontend/components/UploadAsset.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/*

<Link to={`/assets`}>
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-sm">
                                            All Assets
            </button>
       </Link>

*/

const UploadAsset = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !type || !image) {
      setUploadError('Please provide a name, type, and image.');
      return;
    }

    setUploading(true);
    setUploadSuccess(null);
    setUploadError(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/api/assets', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadSuccess(`Asset "${data.name}" uploaded successfully!`);
        setName('');
        setType('');
        setImage(null);
      } else {
        const errorData = await response.json();
        setUploadError(`Upload failed: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      setUploadError(`Network error during upload: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 z-10 ">
      <h2 className="text-xl font-semibold mb-4">Upload New Game Asset</h2>

      {uploadSuccess && <p className="text-green-500 mb-2">{uploadSuccess}</p>}
      {uploadError && <p className="text-red-500 mb-2">{uploadError}</p>}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Asset Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="e.g., hero_idle"
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
            Asset Type:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="type"
            value={type}
            onChange={handleTypeChange}
          >
            <option value="">Select Type</option>
            <option value="hero_idle">Hero Idle</option>
            <option value="hero_attack">Hero Attack</option>
            <option value="hero_hurt">Hero Hurt</option>
            <option value="monster_idle">Monster Idle</option>
            <option value="monster_attack">Monster Attack</option>
            <option value="monster_hurt">Monster Hurt</option>
            <option value="background">Background</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image File:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            onChange={handleImageChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Asset'}
          </button>

        </div>
         <Link to="/assets">
                    <button className="mt-4   bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                       Go to Asset List
                    </button>
                </Link>
      </form>
      
    </div>
  );
};

export default UploadAsset;