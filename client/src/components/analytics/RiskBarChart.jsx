import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useSelector } from 'react-redux';

const RiskBarChart = () => {    
  // Retrieve quest results from Redux store
  const questResult = useSelector((state) => state.questResult.questResults);

  // Prepare data for the bar chart with risk scores
  const riskData = questResult.map((result, index) => ({
    scenario: `Scenario ${index + 1}`, // Dynamically generate scenario labels
    riskScore: result.imp * result.lik, // Calculate risk score
    description: result.scen, // Store original scenario text for tooltip
    impact: result.imp, // Store impact score for tooltip
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'white', border: '1px solid black', padding: '5px', color: 'black' }}>
        <p>{payload[0].payload.scenario}</p>
        <p>Risk Score: {payload[0].payload.riskScore}</p>
          <p>{payload[0].payload.description}</p>
          
        </div>
      );
    }
    return null;
  };

  return (
    <div>
     

      
      <h2>Bar Chart of Visualizatio Risk Scores</h2>
      <BarChart width={1000} height={300} data={riskData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="scenario"
           tick={{ fill: 'grey' }}// Set the text color to red
        />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="riskScore" fill="#8884d8" name="Risk Score" />
      </BarChart>
    </div>
  );
};

export default RiskBarChart;