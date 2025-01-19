
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="md:w-4/12 mx-auto text-center my-8">
            <p className="text-[#D99904] italic mb-2">---{subHeading}---</p>
            <h3 className="text-3xl border-y-4 py-4 uppercase">{heading}</h3>
        </div>
    );
};

export default SectionTitle;