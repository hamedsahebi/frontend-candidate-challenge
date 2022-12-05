import React from "react";
import "./styles.css";
import {Route,Routes } from 'react-router-dom';
import EditTask from "./components/edittask";
import Main from "./components/main";



const App = () => {
  return ( <React.Fragment>
    <Routes>
      <Route path='/' element={<Main/>}>
      <Route path='/:taskId' element={<EditTask/>}/>
      </Route>
    </Routes>
    </React.Fragment> );
}
 
export default App;
  
 
    
   

    


