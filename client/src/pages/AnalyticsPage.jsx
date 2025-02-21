import Header from "../components/common/Header";


import RiskLineChart from "../components/analytics/RiskLineChart";
import RiskBarChart from "../components/analytics/RiskBarChart";
import RiskHeatMap from "../components/analytics/RiskHeatMap";


const AnalyticsPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				

				<div >
					
					
					<div className="max-w-xs mb-12"> {/* Add max-width to constrain the width */}
          <RiskBarChart />
        </div>

        <div className="max-w-xs mb-12"> {/* Add max-width to constrain the width */}
          <RiskLineChart />

        </div>
<div className="max-w-xs mb-12"> {/* Add max-width to constrain the width */}
          <RiskHeatMap />
        </div>

				</div>




			</main>
		</div>
	);
};
export default AnalyticsPage;
