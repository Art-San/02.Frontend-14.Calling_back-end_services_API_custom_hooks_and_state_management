import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import QualitiesTable from "../components/ui/qualitiesTable";
import httpService from "../services/http.service";


const QualitiesListPage = () => {
    const [qualities, setQualities] = useState([])
    const history = useHistory();

    useEffect(() => {
        const loadData = async () => {
            const { data } = await httpService.get('http://localhost:4000/api/v1/quality')
            setQualities(data.content)
        }
         loadData() 
      }, []) 
      
    // выдал следующую ошибку
    // How To Fix The "useEffect must not return anything besides a function" Warning
    // решение https://isotropic.co/how-to-fix-the-useeffect-must-not-return-anything-besides-a-function-warning/
    // useEffect(async () => {
    // const { data } = await axios.get( 
    //     'http://localhost:4000/api/v1/quality')
    //     setQualities(data.content)
        
    // }, [])

    // useEffect(() => {  // работал и этот вариант но он зачемто изменил (вложенность меньше)
    //   const promise = axios
    //     .get('http://localhost:4000/api/v1/quality')
    //     .then((res) => setQualities(res.data.content))
        
    // }, [])
    const handleEdit = (param) => {
        console.log(param);
        history.push(`/edit/${param}`);
    };
    const handleDelete = (param) => {
        console.log(param);
    };
    return (
        <>
            <h1>Qualitites List Page</h1>
            <QualitiesTable
                onDelete={handleDelete}
                onEdit={handleEdit}
                data={qualities}
            />
        </>
    );
};

export default QualitiesListPage;
