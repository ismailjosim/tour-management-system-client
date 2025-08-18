import AddDivisionModal from "@/components/modules/Admin/Division/AddDivisionModal";

const AddDivision = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h3>Add Division</h3>
                <AddDivisionModal />
            </div>
        </div>
    );
};

export default AddDivision;
