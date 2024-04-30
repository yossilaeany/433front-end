import React, { useState, useContext } from 'react';
import DataContext from '../context/DataContext'

const FilterData = () => {
    const [searchValue, setSearchValue] = useState("");
    const [choice, setChoice] = useState("");
    const {docAmount,tempData,data, setTempData,setTempDocAmount} = useContext(DataContext);

    
  

    // filter by category 
    const filterArray = () => {
        let newArray = data.filter((employee) => {
            if (choice == "id")
                return employee.id == searchValue;
            if (choice == "name")
                return employee.name.toLocaleLowerCase().includes(
                    searchValue.toLocaleLowerCase());
            if (choice == "position")
                return employee.position.toLocaleUpperCase() ==
                    searchValue.toLocaleUpperCase();
            if (choice == "salary") {
                let temp = employee.salary
                return temp <= parseInt(searchValue);
            }
        })
        setTempDocAmount(newArray.length);
        return newArray;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // no value in the input case
        if (searchValue === "") {
            setTempData(data);
            setTempDocAmount(docAmount);
        }
        else {
            const filterArr = filterArray();
            //   no data found
            if (filterArr.length == 0) {
                alert("no data found🤦‍♂️, please try again");
                setTempData(data);
                setTempDocAmount(docAmount)
            }
            //  found currect data😊
            else {
                setTempData(filterArr);
            }
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit} className='text-center
pt-4'>
                <input onChange={(e) =>
                    setSearchValue(e.target.value)} type="text" className='w-25 m-auto'
                />
                <select onChange={(e) =>
                    setChoice(e.target.value)} className='m-2'>
                    <option value='id'>id</option>
                    <option value='name' >name</option>
                    <option value='position'>position</option>
                    <option value='salary'>salary</option>
                </select>
                <button className='btn
btn-info'>Search</button>
            </form>
        </div>
    )
}

export default FilterData