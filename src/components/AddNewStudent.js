import React, { Component } from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


class AddNewStudent extends Component {
  constructor(props) {
      super(props);
      this.state = {open: false, email: "", name: "", message:"", flag: true};
  };

  emailHandler = (event) => {
      this.setState({email: event.target.value});
  };

  nameHandler = (event)=> {
    this.setState({name: event.target.value});
  };

  doneHandler = () => {
    if(!this.state.email.includes("@") || this.state.name === ""){
      this.setState({message: "Please enter a valid email and name", flag: false})
      return;
    }

    fetch("http://localhost:8080/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        statusCode: 0
      }),
    })
    .then((response) => {
      if(response.status === 400){
        return false;
      }
      return response.json()
    })
    .then((responseData) => {
      if(responseData === false){
        this.setState({message: "Student with email already exists", flag: false})
      }else{
        this.setState({message: "Student was added successfully", flag: true})
      }
    })
    .catch((err) => console.error(err));
  };

  render() {
    return (
      <div id="addStudentArea">
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent style={{paddingTop: 20}} >
          <TextField autoFocus id="email" label="Email" onChange={this.emailHandler} style={{width: 400}} />
          <br></br>
          <TextField id="name" label="Name" onChange={this.nameHandler} style={{width: 400, margin: 10}} />
        </DialogContent>
        <DialogActions sx={{display: "flex", justifyContent: "center"}}>
            <Button id="addButton" color="primary" onClick={this.doneHandler}>Add</Button>
        </DialogActions>
        <p id="message" style={{color: this.state.flag ? "green":"red"}}>{this.state.message}</p>
      </div>
    ); 
  };
};

export default AddNewStudent;