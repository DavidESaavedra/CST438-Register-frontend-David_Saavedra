import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddNewStudent from './components/AddNewStudent';
import SchedList from './components/SchedList';
import Semester from './components/Semester';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Button } from '@mui/material';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AppBar position="static" color="default">
        <Toolbar>
           <Typography variant="h6" color="inherit" style={{flexGrow: 1, textAlign: "left"}}>
            Course Registration
           </Typography>
            <Button component={Link} to="/">Home</Button> 
            <Button id="addStudent" component={Link} to="/addstudent">Add Student</Button>
        </Toolbar>
      </AppBar>
       <Switch>
        <Route exact path='/' component={Semester} />
        <Route path='/schedule' component={SchedList} />
        <Route path='/addstudent' component={AddNewStudent} />
       </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;