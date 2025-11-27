// frontend/components/AssetList.js
import React, { useState, useEffect } from 'react';

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/assets');
        if (response.ok) {
          const data = await response.json();
          setAssets(data);
        } else {
          setError(`Failed to fetch assets: ${response.statusText}`);
        }
      } catch (error) {
        setError(`Network error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  //
  const handleDelete = async (assetName) => {
    if (!window.confirm(`Are you sure you want to delete the asset: ${assetName}?`)) {
      return; // User cancelled the operation
    }

    try {
      // 1. Send DELETE request to the backend
      const response = await fetch(`${API_BASE_URL}/${assetName}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // 2. Optimistically update the state (remove the asset from the list)
        setAssets(prevAssets => prevAssets.filter(asset => asset.name !== assetName));
        console.log(`Asset '${assetName}' deleted successfully.`);
      } else {
        const errorData = await response.json();
        setError(`Failed to delete asset: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      setError(`Network error during deletion: ${error.message}`);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading assets...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 z-10 min-h-screen overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Game Assets</h2>
      {assets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {assets.map(asset => (
            <div key={asset._id} className="bg-white shadow-md rounded p-4">
              <h3 className="text-lg text-black font-semibold mb-2">{asset.name}</h3>
              <p className="text-gray-600 mb-2">Type: {asset.type}</p>
              {asset.image && asset.mimeType && (
                <div className="relative aspect-w-16 aspect-h-9 rounded overflow-hidden">
                  <img
                    src={`data:${asset.mimeType};base64,${btoa(String.fromCharCode(...new Uint8Array(asset.image.data)))}`}
                    alt={asset.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              {!asset.image && <p className="text-gray-500">No image data available.</p>}
              
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No assets have been uploaded yet.</p>
      )}
    </div>
  );
};

export default AssetList;