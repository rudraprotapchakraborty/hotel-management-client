const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="md:w-4/12 mx-auto text-center my-8 transition-all duration-500 ease-in-out transform hover:scale-105">
            <p className="text-[#D99904] italic mb-2 transition-all duration-500 ease-in-out dark:text-yellow-300">
                ---{subHeading}---
            </p>
            <h3 className="text-3xl border-y-4 py-4 uppercase border-gray-400 dark:border-gray-600 transition-all duration-500 ease-in-out text-gray-900 dark:text-white">
                {heading}
            </h3>
        </div>
    );
};

export default SectionTitle;
