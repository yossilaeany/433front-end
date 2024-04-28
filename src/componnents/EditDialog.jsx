import React, { useState, forwardRef, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useForm } from "react-hook-form";
import { doApiMethod, API_URL, TOKEN_KEY } from '../servises/apiServices';
import EditIcon from '@mui/icons-material/Edit';
import DataContext from '../context/DataContext';



const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditDialog = ({employee}) => {
    const { setData,data } = useContext(DataContext);
    const [open, setOpen] = useState(false);

    // open the dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    // close the dialog
    const handleClose = () => {
        updateEmployee()
        setOpen(false);
    };

    // play the API request function when submit the form
    const onSubmit = (bodyData) => {
        updateEmployee(bodyData);
    };

    // update the employee after editing
    const replaceObjectByKey = (_id, newData) => {
        // Find the index of the employee with the specified id
        const index = data.findIndex(obj => obj.id === _id);
        if (index !== -1) {
            // Create a copy of the original array
            const newArray = [...data];
            // Replace the object at the found index with the new object
            newArray[index] = newData;
            // Update state with the modified array
            setData(newArray);
        }
    };

    // get props {_url - from .env, _method - post/get, _body - the obj to send }
    const updateEmployee = async (bodyData) => {
        try {
            const url = API_URL + `employees/${employee.id}`;
            console.log(bodyData);
            console.log(url);
            const responseData = await doApiMethod(url, "PUT", bodyData);
            if (responseData) {
                handleClose();
                console.log(responseData);
                replaceObjectByKey(employee.id,bodyData);
                alert('success employee adited')
              }
              else {
                // Handle the case where the response doesn't contain expected data
                alert("Invalid response from server");
              }
            // Check if responseData contains the document count
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    // controll the form 
    const { register, handleSubmit, formState: { errors }, } = useForm();

    return (
        <React.Fragment>
            <Button onClick={() => handleClickOpen()} size="small" variant="outlined" startIcon={<EditIcon />}>
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <form onSubmit={handleSubmit(onSubmit)} id="id_form">
                    <DialogTitle>{"Edit employee"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <label>ID</label>
                            <input {...register("id", { required: true, minLength: 9 })} className="form-control" type="text" defaultValue={employee.id}/>
                            {errors.ID && <div className="text-danger">* Enter valid ID</div>}
                            <label>Name</label>
                            <input {...register("name", { required: true, minLength: 2 })} className="form-control" type="text"  defaultValue={employee.name}/>
                            {errors.Name && <div className="text-danger">* Enter valid Name</div>}
                            <label>Position</label>
                            <input {...register("position", { required: true, minLength: 2 })} className="form-control" type="text" defaultValue={employee.position} />
                            {errors.Position && <div className="text-danger">* Enter valid Position</div>}
                            <label>Salary</label>
                            <input {...register("salary", { required: true, minLength: 2 })} className="form-control" type="number" defaultValue={employee.salary}/>
                            {errors.Salary && <div className="text-danger">* Enter valid Salary</div>}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit' onClick={handleClose}>Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}


export default EditDialog