import WorkoutAccordion from "@/components/WorkoutAccordion"

const WorkoutModal = ({ assignment, onClose }) => {
	return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl mb-8">{assignment.name}</h2>
                    <button 
                        onClick={onClose}
                        className="text-lg font-bold p-1"
                        aria-label="Close"
                        style={{ lineHeight: '1.1', marginTop: '-0.5rem', marginRight: '-0.5rem' }}  // Styling to align with the title
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
