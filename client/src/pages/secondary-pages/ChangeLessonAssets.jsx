// ChangeLessonAssets.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ChangeLessonAssets = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [availableHeroIdleAssets, setAvailableHeroIdleAssets] = useState([]);
  const [availableHeroAttackAssets, setAvailableHeroAttackAssets] = useState([]);
  const [availableHeroHurtAssets, setAvailableHeroHurtAssets] = useState([]);
  const [availableMonsterIdleAssets, setAvailableMonsterIdleAssets] = useState([]);
  const [availableMonsterAttackAssets, setAvailableMonsterAttackAssets] = useState([]);
  const [availableMonsterHurtAssets, setAvailableMonsterHurtAssets] = useState([]);
  const [availableBackgroundAssets, setAvailableBackgroundAssets] = useState([]);
  const [allAssets, setAllAssets] = useState([]);

  const [selectedHeroIdleAsset, setSelectedHeroIdleAsset] = useState('');
  const [selectedHeroAttackAsset, setSelectedHeroAttackAsset] = useState('');
  const [selectedHeroHurtAsset, setSelectedHeroHurtAsset] = useState('');
  const [selectedMonsterIdleAsset, setSelectedMonsterIdleAsset] = useState('');
  const [selectedMonsterAttackAsset, setSelectedMonsterAttackAsset] = useState('');
  const [selectedMonsterHurtAsset, setSelectedMonsterHurtAsset] = useState('');
  const [selectedBackgroundAsset, setSelectedBackgroundAsset] = useState('');

  useEffect(() => {
    // Fetch lesson details
    fetch(`http://localhost:5000/api/lessons/${lessonId}`)
      .then(res => res.json())
      .then(data => {
        setLesson(data);
        setSelectedHeroIdleAsset(data.heroIdleImage || '');
        setSelectedHeroAttackAsset(data.heroAttackImage || '');
        setSelectedHeroHurtAsset(data.heroHurtImage || '');
        setSelectedMonsterIdleAsset(data.monsterIdleImage || '');
        setSelectedMonsterAttackAsset(data.monsterAttackImage || '');
        setSelectedMonsterHurtAsset(data.monsterHurtImage || '');
        setSelectedBackgroundAsset(data.backgroundImage || '');
      });

    // Fetch all assets
    fetch('http://localhost:5000/api/assets')
      .then(res => res.json())
      .then(data => {
        setAllAssets(data);
      });
  }, [lessonId]);

  useEffect(() => {
    // Filter assets by type once all assets are fetched
    setAvailableHeroIdleAssets(allAssets.filter(asset => asset.type === 'hero_idle'));
    setAvailableHeroAttackAssets(allAssets.filter(asset => asset.type === 'hero_attack'));
    setAvailableHeroHurtAssets(allAssets.filter(asset => asset.type === 'hero_hurt'));
    setAvailableMonsterIdleAssets(allAssets.filter(asset => asset.type === 'monster_idle'));
    setAvailableMonsterAttackAssets(allAssets.filter(asset => asset.type === 'monster_attack'));
    setAvailableMonsterHurtAssets(allAssets.filter(asset => asset.type === 'monster_hurt'));
    setAvailableBackgroundAssets(allAssets.filter(asset => asset.type === 'background'));
  }, [allAssets]);

  const handleAssetChange = (type, name) => {
    switch (type) {
      case 'heroIdle':
        setSelectedHeroIdleAsset(name);
        break;
      case 'heroAttack':
        setSelectedHeroAttackAsset(name);
        break;
      case 'heroHurt':
        setSelectedHeroHurtAsset(name);
        break;
      case 'monsterIdle':
        setSelectedMonsterIdleAsset(name);
        break;
      case 'monsterAttack':
        setSelectedMonsterAttackAsset(name);
        break;
      case 'monsterHurt':
        setSelectedMonsterHurtAsset(name);
        break;
      case 'background':
        setSelectedBackgroundAsset(name);
        break;
      default:
        break;
    }
  };

  // ChangeLessonAssets.js

const handleSaveAssets = () => {
  fetch(`http://localhost:5000/api/lessons/${lessonId}/assets`, { // Updated endpoint
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      heroIdleImage: selectedHeroIdleAsset,
      heroAttackImage: selectedHeroAttackAsset,
      heroHurtImage: selectedHeroHurtAsset,
      monsterIdleImage: selectedMonsterIdleAsset,
      monsterAttackImage: selectedMonsterAttackAsset,
      monsterHurtImage: selectedMonsterHurtAsset,
      backgroundImage: selectedBackgroundAsset,
    }),
  })
  .then(res => res.json())
  .then(updatedLesson => {
    alert('Assets updated successfully!');
    navigate(-1); // Go back to the previous page
  })
  .catch(error => {
    console.error('Error updating assets:', error);
    alert('Failed to update assets.');
  });
};

  const handleBack = () => {
    navigate(-1);
  };

  const getAssetImageUrl = (assetName) => {
    if (!assetName) {
      return ''; // Or a default placeholder URL if needed
    }
    return `http://localhost:5000/api/assets/${assetName}`;
  };

  if (!lesson) {
    return <div>Loading lesson details...</div>;
  }

  return (
    <div className="flex-1 overflow-auto relative z-10 p-6">
      <h1 className="text-2xl font-semibold mb-4">Change Assets for Lesson: {lesson.title}</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Hero Images</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="heroIdleAsset" className="block text-sm font-medium text-gray-700">Idle</label>
            <select
              id="heroIdleAsset"
              value={selectedHeroIdleAsset}
              onChange={(e) => handleAssetChange('heroIdle', e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Default</option>
              {availableHeroIdleAssets.map(asset => (
                <option key={asset.name} value={asset.name}>{asset.name}</option>
              ))}
            </select>
            {selectedHeroIdleAsset && <img src={getAssetImageUrl(selectedHeroIdleAsset)} alt="Selected Hero Idle" className="mt-2 max-h-20" />}
          </div>
          {/* Repeat for Attack and Hurt Hero Images */}
          <div>
            <label htmlFor="heroAttackAsset" className="block text-sm font-medium text-gray-700">Attack</label>
            <select
              id="heroAttackAsset"
              value={selectedHeroAttackAsset}
              onChange={(e) => handleAssetChange('heroAttack', e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Default</option>
              {availableHeroAttackAssets.map(asset => (
                <option key={asset.name} value={asset.name}>{asset.name}</option>
              ))}
            </select>
            {selectedHeroAttackAsset && <img src={getAssetImageUrl(selectedHeroAttackAsset)} alt="Selected Hero Attack" className="mt-2 max-h-20" />}
          </div>
          <div>
            <label htmlFor="heroHurtAsset" className="block text-sm font-medium text-gray-700">Hurt</label>
            <select
              id="heroHurtAsset"
              value={selectedHeroHurtAsset}
              onChange={(e) => handleAssetChange('heroHurt', e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Default</option>
              {availableHeroHurtAssets.map(asset => (
                <option key={asset.name} value={asset.name}>{asset.name}</option>
              ))}
            </select>
            {selectedHeroHurtAsset && <img src={getAssetImageUrl(selectedHeroHurtAsset)} alt="Selected Hero Hurt" className="mt-2 max-h-20" />}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Monster Images</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Repeat for Idle, Attack, and Hurt Monster Images */}
          <div>
            <label htmlFor="monsterIdleAsset" className="block text-sm font-medium text-gray-700">Idle</label>
            <select
              id="monsterIdleAsset"
              value={selectedMonsterIdleAsset}
              onChange={(e) => handleAssetChange('monsterIdle', e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Default</option>
              {availableMonsterIdleAssets.map(asset => (
                <option key={asset.name} value={asset.name}>{asset.name}</option>
              ))}
            </select>
            {selectedMonsterIdleAsset && <img src={getAssetImageUrl(selectedMonsterIdleAsset)} alt="Selected Monster Idle" className="mt-2 max-h-20" />}
          </div>
          <div>
            <label htmlFor="monsterAttackAsset" className="block text-sm font-medium text-gray-700">Attack</label>
            <select
              id="monsterAttackAsset"
              value={selectedMonsterAttackAsset}
              onChange={(e) => handleAssetChange('monsterAttack', e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Default</option>
              {availableMonsterAttackAssets.map(asset => (
                <option key={asset.name} value={asset.name}>{asset.name}</option>
              ))}
            </select>
            {selectedMonsterAttackAsset && <img src={getAssetImageUrl(selectedMonsterAttackAsset)} alt="Selected Monster Attack" className="mt-2 max-h-20" />}
          </div>
          <div>
            <label htmlFor="monsterHurtAsset" className="block text-sm font-medium text-gray-700">Hurt</label>
            <select
              id="monsterHurtAsset"
              value={selectedMonsterHurtAsset}
              onChange={(e) => handleAssetChange('monsterHurt', e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Default</option>
              {availableMonsterHurtAssets.map(asset => (
                <option key={asset.name} value={asset.name}>{asset.name}</option>
              ))}
            </select>
            {selectedMonsterHurtAsset && <img src={getAssetImageUrl(selectedMonsterHurtAsset)} alt="Selected Monster Hurt" className="mt-2 max-h-20" />}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Background Image</h2>
        <div>
          <label htmlFor="backgroundAsset" className="block text-sm font-medium text-gray-700">Select Background</label>
          <select
            id="backgroundAsset"
            value={selectedBackgroundAsset}
            onChange={(e) => handleAssetChange('background', e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Default</option>
            {availableBackgroundAssets.map(asset => (
              <option key={asset.name} value={asset.name}>{asset.name}</option>
            ))}
          </select>
          {selectedBackgroundAsset && <img src={getAssetImageUrl(selectedBackgroundAsset)} alt="Selected Background" className="mt-2 max-h-40" />}
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={handleSaveAssets}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Assets
        </button>
        <button
          onClick={handleBack}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ChangeLessonAssets;