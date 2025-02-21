import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';

const RiskPieChart = () => {
  const questResult = useSelector((state) => state.questResult.questResults);

  // Calculate the total risk score
  const totalRiskScore = questResult.reduce((acc, result) => 
    acc + (result.imp * result.lik), 0);

  // Prepare data for the pie chart
  const pieData = questResult.map((result, index) => ({
    name: `Scenario ${index + 1} - Risk Score`, // Customize label as needed
    name2: `Scenario ${index + 1}`, // Customize label as needed
    value: result.imp * result.lik,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5678', '#D9A900'];

  return (
    <div>
      <h1>Overall Risk Score Distribution Pie Chart</h1>
      <PieChart width={500} height={500}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name2, value }) => `${name2}: ${((value / totalRiskScore) * 100).toFixed(1)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        
      </PieChart>
    </div>
  );
};

 
export default RiskPieChart;