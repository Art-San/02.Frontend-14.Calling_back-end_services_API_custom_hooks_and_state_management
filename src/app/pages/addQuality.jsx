import React from "react";
import CreateForm from "../components/ui/createForm";
const AddQualityPage = () => {
    const handleSubmit = (data) => {
        console.log('data', data)
        
    }
    return (
        <>
            <h1>Add Quality</h1>
            <CreateForm onSubmit={handleSubmit}/>
        </>
    );
};

export default AddQualityPage;
