import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useSelector } from 'react-redux';

///F

  







///Fixed

const RiskLineChart  = () => {
  // Retrieve quest results from Redux store
  const questResult = useSelector((state) => state.questResult.questResults);

  // Prepare data for the line chart with risk scores
  const riskData = questResult.map((result, index) => ({
    scenario: `Scenario ${index + 1}`, // Dynamically generate scenario labels
    riskScore: result.imp * result.lik, // Calculate risk score
    description: result.scen, // Store original scenario text for tooltip
    impact: result.imp,
    like: result.lik,
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'white', border: '1px solid black', padding: '5px', color: 'black' }}>
          <p>likelihood : {payload[0].payload.like}</p>
         <p>Impact : {payload[0].payload.impact}</p>
           <p>Risk Score: {payload[0].payload.riskScore}</p>
          <p>{payload[0].payload.description}</p>
          
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      

      {/* Line Chart */}
      <h2>Line Chart Visualization of Risk Scores</h2>
      <LineChart width={1000} height={300} data={riskData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="scenario" tick={{ fill: 'grey' }} /> {/* Scenario on X-axis */}
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="riskScore" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default RiskLineChart;