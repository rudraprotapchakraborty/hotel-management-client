import { Link } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle"; // Optional section title for a header

const Membership = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pt-4">
            {/* Page Header */}
            <SectionTitle heading={"Upgrade to Premium"} subHeading={"--- Choose your membership plan ---"} />

            {/* Membership Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
                {/* Silver Membership Card */}
                <div className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-6">
                    <div className="text-center mb-4">
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Silver Plan</h3>
                        <p className="text-lg text-gray-600 dark:text-gray-400">Basic Access</p>
                    </div>
                    <p className="text-4xl font-bold text-[#BB8506] text-center mb-4">$19.99/month</p>
                    <ul className="text-gray-600 dark:text-gray-400 mb-6">
                        <li>Access to Basic Content</li>
                        <li>Priority Support</li>
                        <li>Customizable Settings</li>
                        <li>Discounted Offers</li>
                    </ul>
                    <Link
                        to="/checkout?plan=silver"
                        className="inline-block text-white bg-[#BB8506] hover:bg-[#9b6d07] py-2 px-4 rounded-lg text-center transition-colors duration-300"
                    >
                        Upgrade Now
                    </Link>
                </div>

                {/* Gold Membership Card */}
                <div className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-6">
                    <div className="text-center mb-4">
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Gold Plan</h3>
                        <p className="text-lg text-gray-600 dark:text-gray-400">Premium Access</p>
                    </div>
                    <p className="text-4xl font-bold text-[#BB8506] text-center mb-4">$39.99/month</p>
                    <ul className="text-gray-600 dark:text-gray-400 mb-6">
                        <li>Access to Premium Content</li>
                        <li>Priority Support</li>
                        <li>Advanced Customization</li>
                        <li>Exclusive Offers</li>
                    </ul>
                    <Link
                        to="/checkout?plan=gold"
                        className="inline-block text-white bg-[#BB8506] hover:bg-[#9b6d07] py-2 px-4 rounded-lg text-center transition-colors duration-300"
                    >
                        Upgrade Now
                    </Link>
                </div>

                {/* Platinum Membership Card */}
                <div className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-6">
                    <div className="text-center mb-4">
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Platinum Plan</h3>
                        <p className="text-lg text-gray-600 dark:text-gray-400">All Features Access</p>
                    </div>
                    <p className="text-4xl font-bold text-[#BB8506] text-center mb-4">$59.99/month</p>
                    <ul className="text-gray-600 dark:text-gray-400 mb-6">
                        <li>Full Access to All Content</li>
                        <li>Premium Support</li>
                        <li>Advanced Customization</li>
                        <li>Early Access to New Features</li>
                    </ul>
                    <Link
                        to="/checkout?plan=platinum"
                        className="inline-block text-white bg-[#BB8506] hover:bg-[#9b6d07] py-2 px-4 rounded-lg text-center transition-colors duration-300"
                    >
                        Upgrade Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Membership;
