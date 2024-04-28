import React, {useContext} from 'react'
import { doApiMethod, doApiGet, API_URL, TOKEN_KEY } from './apiServices'
import { DataContext } from '../context/DataContext';
 

const TableApiReq = () => {
const { data,setData } = useContext(DataContext);

    const removeEmployeeHere = (_id) => {
        setData(data.filter(employee => {
            return employee.id!== _id;
        }))       
    };
    // DeleteEmployee API request
    const deleteEmployee = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete?');
        if (!confirmed) {
          return; // Exit if user cancels confirmation
        }
        try {
            removeEmployeeHere(id);
            const url = API_URL + `employees/${id}`;
            const responseData = await doApiMethod(url, "DELETE");
            // Log response data for debugging
            console.log('Response data:', responseData);
            
            // Check if responseData contains the document count
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    
    };

    // EditEmployee
    const editEmployee = async (id) => {
        try {
            const url = API_URL + `employees/${id}`;
            const responseData = await doApiMethod(url, "PUT", {});
            // Log response data for debugging
            console.log('Response data:', responseData);
            // Check if responseData contains the document count
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    return (
        null
      )
}

// export {
//     deleteEmployee,
//     editEmployee,
//     TableApiReq  
// }

 export default TableApiReq