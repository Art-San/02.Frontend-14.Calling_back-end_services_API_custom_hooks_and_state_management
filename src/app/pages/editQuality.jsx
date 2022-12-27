import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditForm from "../components/ui/editForm";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";


const EditQualityPage = () => {
    const [quality, setQuality] = useState(null)
    // const [errors, setErrors] = useState(null)
    const id = useParams().id

    const updateQuality = async (content) => {
        try {
            const data = await qualityService.update(id, content)
            return data.content  
        } catch (error) {
            const { status, message } = error.response.data
            // setErrors({ status, message })
            toast.error(`${message} ${status}`)
            
        }
     
    }
    const getQuality = async (id) => {
        try {
            const data = await qualityService.get(id)
            return data.content
        } catch (error) {
            const { status, message } = error.response.data
            toast.error(`${message} ${status}`)
        }
    }
  
    
    const handleSubmit = (data) => {
        console.log('data', data)
        updateQuality(data)
    }

    useEffect(() => {
        getQuality(id).then(data => setQuality(data))
       
      }, []) 
    return (
        <>
            <h1>Edit Quality Page</h1>{' '}
            {quality === null ? 'Loading...' : <EditForm data={quality} onSubmit={handleSubmit}/>}
        </>
    );
};

export default EditQualityPage;