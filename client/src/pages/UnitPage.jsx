import { motion } from "framer-motion";
//import UnitsPage from "./UnitsPage";
//<UnitsPage />

//import UnitAdd from "./CRUD/UnitAdd";  				<UnitAdd />

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import the Link component





const UnitPage = () => {

	const [units, setUnits] = useState([]);
  const [newUnitTitle, setNewUnitTitle] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/units')
      .then(res => res.json())
      .then(data => setUnits(data));
  }, []);

  const handleAddUnit = () => {
    fetch('http://localhost:5000/api/units', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newUnitTitle })
    })
      .then(res => res.json())
      .then(newUnit => setUnits([...units, newUnit])); // Update state after adding
  };

  const handleDeleteUnit = (id) => {
    fetch(`http://localhost:5000/api/units/${id}`, { method: 'DELETE' })
      .then(() => setUnits(units.filter(unit => unit._id !== id))); // Update state after deleting
  };



	return (
		<div className='flex-1 overflow-auto relative z-10'>
			

			
				<p> Tools Page  </p>

				 <input type="text" value={newUnitTitle} onChange={e => setNewUnitTitle(e.target.value)} />
      <button onClick={handleAddUnit}>Add Unit</button>

      <h2>Units</h2>
      <ul>
        {units.map(unit => (
          <li key={unit._id}>
            {unit.title}
            <button onClick={() => handleDeleteUnit(unit._id)}>Delete</button>
            <Link to={`/add-lesson/${unit._id}`}> <button>Add Lesson</button></Link>
          </li>
        ))}
      </ul>

		</div>
	);
};
export default UnitPage;
