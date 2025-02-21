import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import QUESTScen from "../components/overview/QUESTScen";

import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux'; 

  
import RiskPieChart  from "../components/overview/RiskPieChart"; 

const OverviewPage = () => {  


	const questResult = useSelector((state) => state.questResult.questResults); 

  // Get the number of items in the questResult array
  const numberOfItems = questResult.length; 


  // Calculate the total risk score
  const totalRiskScore = questResult.reduce((acc, result) => 
    acc + (result.imp * result.lik), 0);

  // Calculate the average risk score
  const averageRiskScore = Math.ceil(totalRiskScore / questResult.length * 100) / 100; 


/*<SalesOverviewChart />
					<CategoryDistributionChart />
					<SalesChannelChart />

<StatCard name='Total Products' icon={ShoppingBag} value='567' color='#EC4899' />
					<StatCard name='Conversion Rate' icon={BarChart2} value='12.5%' color='#10B981' />



					*/


	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Overview' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }} 
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}    
				>
					<StatCard name='Risk Scenarios' icon={Zap} value={numberOfItems} color='#6366F1' />
					<StatCard name='Overall Risk Score' icon={Users} value={averageRiskScore} color='#8B5CF6' />
					
				</motion.div>

				{/* CHARTS */}

				<div >
					
				
					<RiskPieChart />
					<QUESTScen />

				</div>
			</main>
		</div>
	);
};
export default OverviewPage;
