import React, { useState, useEffect, useContext } from 'react'
import Table from './Table'
import FormDialog from "./FormDialog"
import { doApiMethod, doApiGet, API_URL, TOKEN_KEY } from '../servises/apiServices'
import DataContext from '../context/DataContext'

const Home = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true); // Boolean variable to track if there is more data to fetch
    const [docAmount, setDocAmount] = useState(0);


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
            console.log(page);
            setPage(page + 1);
            console.log(responseData);
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

    return (
        <DataContext.Provider value={{ data, handleLoadMore, docAmount }}>
            <div className='container-fluid'>
                <div className='container'>
                    <h1 className='text-center text-primary'>Employees Manegment</h1>
                    {/* <Table data={data}/> */}
                    <Table />
                    <br />
                    <FormDialog />
                </div>
                
            </div>
        </DataContext.Provider>
    )
}

export default Home