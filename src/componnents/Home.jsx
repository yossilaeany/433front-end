import React, { useState, useEffect, useContext } from 'react'
import Table from './Table'
import FormDialog from "./FormDialog"
import { doApiMethod, doApiGet, API_URL, TOKEN_KEY } from '../servises/apiServices'
import DataContext from '../context/DataContext'
import FilterData from './FilterData'
// import TableApiReq from '../servises/TableApiReq'

const Home = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true); // Boolean variable to track if there is more data to fetch
    const [docAmount, setDocAmount] = useState(0);
    const [tempData, setTempData] = useState([]);
    const [tempDocAmount, setTempDocAmount] = useState(0);


    // get the data from server
    // Fetch data when component mounts
    //    if(docAmount === data.length){
    //     setHasMoreData(false)
    //     return "full data fetch";
    //    }  else setHasMoreData(true);
    // stop request data fetching when getting all the data from server
    const fetchData = async () => {
        try {
            const url = API_URL + `employees/list?page=${page}`;
            const responseData = await doApiGet(url);
            // Check if newData is empty, if empty set hasMoreData to false
            if (responseData.length === 0) {
                setHasMoreData(false);
                return;
            }
            // Update data state with new data
            setData(prevData => [...prevData, ...responseData]);
            // Increment page number for the next request
            setPage(page + 1);
            setTempData(responseData); 
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // get the document amount in the server
    useEffect(() => {
        // Fetch data when component mounts
        const fetchDocLen = async () => {
            try {
                const url = API_URL + `employees/count`;
                const responseData = await doApiMethod(url, "PATCH");
                // Log response data for debugging
                console.log('Response data:', responseData);
                // Check if responseData contains the document count
                if (responseData !== undefined) {
                    setDocAmount(responseData.count);
                    setTempDocAmount(responseData.count);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchDocLen();
    }, []);


    const handleLoadMore = () => {
        if (docAmount === data.length) {
            setHasMoreData(false)
            return "full data fetch";
        } else setHasMoreData(true);
        fetchData(); // Fetch more data when "Load More" button is clicked
    };

//  Delete Employee in front side and rernder
    const removeEmployeeHere = (_id) => {
        setData(data.filter(employee => {
            return employee.id!== _id;
        }))
        setDocAmount(docAmount - 1);       
    };
    // Delete Employee API request 
    const deleteEmployee = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete?');
        if (!confirmed) {
          return; // Exit if user cancels confirmation
        }
        try {
            removeEmployeeHere(id);
            const url = API_URL + `employees/${id}`;
            const responseData = await doApiMethod(url, "DELETE");
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
            // Check if responseData contains the document count
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    return (
        <DataContext.Provider value={{ data,setData, handleLoadMore, docAmount,editEmployee,deleteEmployee,tempData, setTempData,tempDocAmount, setTempDocAmount }}>
            {/* <TableApiReq/> */}
            <div className='container-fluid'>
                <div className='container'>
                    <h1 className='text-center text-primary'>Employees Manegment</h1>
                    <FilterData/>
                    <FormDialog />
                    <br />
                    <Table />
                   
                  
                </div>
                
            </div>
        </DataContext.Provider>
    )
}

export default Home