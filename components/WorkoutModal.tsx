import WorkoutAccordion from "@/components/WorkoutAccordion"

const WorkoutModal = ({ assignment, onClose }) => {
	return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl mb-8">{assignment.name}</h2>
                    <button 
                        onClick={onClose}
                        className="ml-4 text-gray-600 hover:text-gray-800 p-2 text-xl leading-none font-bold"
                        aria-label="Close"
                    >
                        &#x2715;
                    </button>
                </div>
                <WorkoutAccordion sections={assignment.template.sections} />
                <button className="py-2 mt-4" onClick={onClose}>Close</button>
            </div>
        </div>
    )
};

export default WorkoutModal
