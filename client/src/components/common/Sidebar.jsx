import { BarChart2, DollarSign, Menu, Settings, ShoppingBag, ShoppingCart, TrendingUp, Users, Home, Lightbulb, CircleUser ,Wrench, Plus ,BookOpen, MessageCircle
 } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'; // Import useSelector

const SIDEBAR_ITEMS = [
	{
		name: "Home",
		icon: Home,
		color: "#6366f1",
		href: "/",
	},
	{ name: "Profile", icon: CircleUser, color: "#3B82F6", href: "/profile" },
	{ name: "Create Classroom", icon: Plus, color: "#10B981", href: "/add-classrooms" },
	{ name: "Classrooms", icon: BookOpen , color: "#6EE7B7", href: "/classrooms" },
];

// Define the admin-specific item separately
const ADMIN_ITEM = {
    name: "Admin Functions",
    icon: Settings, // Using Settings icon, you can choose another one
    color: "#EF4444", // A distinct color for admin functions
    href: "/admin-dashboard", // Link to your admin dashboard/functions page
};

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    // Get the user from the Redux store
    const user = useSelector((state) => state.auth.user);
    const userRole = user ? user.role : null; // Extract the user's role

    // Determine if the user is an admin
    const isAdmin = userRole === 'admin';

    // Combine base items with admin item if user is admin
    const finalSidebarItems = isAdmin ? [...SIDEBAR_ITEMS, ADMIN_ITEM] : SIDEBAR_ITEMS;


	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
				>
					<Menu size={24} />
				</motion.button>

				<nav className='mt-8 flex-grow'>
					{finalSidebarItems.map((item) => ( // Use finalSidebarItems here
						<Link key={item.href} to={item.href}>
							<motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'>
								<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className='ml-4 whitespace-nowrap'
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2, delay: 0.3 }}
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</nav>
			</div>
		</motion.div>
	);
};
export default Sidebar;