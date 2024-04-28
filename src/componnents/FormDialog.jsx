import  React, {useState,forwardRef} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useForm } from "react-hook-form";
import { doApiMethod, API_URL, TOKEN_KEY } from '../servises/apiServices';
import { useState } from 'react';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = () => {
  const [open, setOpen] = useState(false);

  // open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // play the API request function when submit the form
  const onSubmit = (bodyData) => {
    doApiPost(bodyData);
  };

  // get props {_url - from .env, _method - post/get, _body - the obj to send }
  const doApiPost = async (bodyData) => {
    const url = API_URL + "employees/create";
    try {
      const data = await doApiMethod(url, "POST", bodyData);
      // Check if resp.data exists before accessing its properties
      if (data) {
        handleClose();
        console.log(data);
        alert('success employee added')
      }
      else {
        // Handle the case where the response doesn't contain expected data
        alert("Invalid response from server");
      }
    }
    catch (error) {
      alert("bad input");
      console.log(error);
    }
  }
  // controll the form 
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        add Employees
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={handleSubmit(onSubmit)} id="id_form">
          <DialogTitle>{"add employee"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <label>ID</label>
              <input {...register("id", { required: true, minLength: 9 })} className="form-control" type="text" />
              {errors.ID && <div className="text-danger">* Enter valid ID</div>}
              <label>Name</label>
              <input {...register("name", { required: true, minLength: 2 })} className="form-control" type="text" />
              {errors.Name && <div className="text-danger">* Enter valid Name</div>}
              <label>Position</label>
              <input {...register("position", { required: true, minLength: 2 })} className="form-control" type="text" />
              {errors.Position && <div className="text-danger">* Enter valid Position</div>}
              <label>Salary</label>
              <input {...register("salary", { required: true, minLength: 2 })} className="form-control" type="number" />
              {errors.Salary && <div className="text-danger">* Enter valid Salary</div>}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button type='submit' onClick={handleClose}>Agree</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default AlertDialogSlide;
