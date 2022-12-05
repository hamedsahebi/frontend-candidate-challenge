import React, {Component } from "react";
import TodoList from "./TodoList";
import getTasks from '../services/taskInitiator';
import joi from 'joi-browser';
import {Outlet,useNavigate} from 'react-router-dom';
import paginate from '../services/paginate';
import Pagination from "./common/pagination";
import InputForm from "./common/inputForm";


class Main extends Component {
    state = { 
      todos:[],
      data:{newTask:""},
      currentPage:1,
      pageSize:4,
      errors:{}
     }
     
     schema = {
      newTask: joi.string().min(3).required().label('Task')
     }

     getTasks = ()=>{
      const {todos,currentPage} = this.state;
      return paginate(todos,currentPage,this.state.pageSize);
     }
  
     validateProperty = ({name,value})=>{
      const schema = {[name]:this.schema[name]};
      const obj = {[name]:value};
      const {error} = joi.validate(obj,schema);
         return error? error.details[0].message:null;
     }

     handleSave = (_id,value)=>{

        const todos = this.state.todos;
        const task = todos.find(task => task._id === _id);
      
        task.text = value;
        this.setState({todos});
     }

     handleDone = (_id)=>{
        const todos = this.state.todos;
        const task = todos.find(task => task._id === _id);
        task.done = !task.done;
        this.setState({todos});
     }
  
     onChangeHandler = ({currentTarget:input})=>{
      const errorMessage = this.validateProperty(input);
      const errors = {...this.state.errors};
  
      if(errorMessage) errors[input.name] = errorMessage;
      else delete errors[input.name];
  
      const data = {...this.state.data};
      data[input.name] = input.value;
  
      this.setState({errors,data});
     }
  
     componentDidMount(){
      this.setState({todos:getTasks()});
     }
  
    handleAdd = ()=>{
      const todos = this.state.todos;
      const data = {...this.state.data};
      const sortedIds = todos.map(task =>  parseInt(task._id));
      const newId = (Math.max(...sortedIds)|0) + 1
      todos.unshift({_id:newId.toString(),text:data.newTask,done:false});
      data.newTask = "";
      this.setState({todos,data,currentPage:1});
      this.props.navigation('/');
     }

  
     handleDeleteTask = (taskId)=>{
      const todos = this.state.todos;
  
      const filtered = todos.filter(task => task._id !== taskId);
      this.setState({todos:filtered,currentPage:1});
      this.props.navigation('/');
  
     }

     handlePage = (page) =>{

      this.setState({currentPage:page});

  }
    render() {
      
      const {data,errors,todos,pageSize,currentPage} = this.state;
      return (
        <div className="row">
            <div className="col-3">
            <div className="todoListApp">
        <div className="forsta-logo" />
        
          <InputForm name="newTask" value={data.newTask} 
                    title="New task" onChange={this.onChangeHandler}
                    error={errors['newTask']}
                    onSubmit={()=> this.handleAdd()}
                    disabled={this.validateProperty({name:'newTask',
                                  value:data.newTask})?true:false}
                    btnTitle="Add task"/>
          <TodoList todos={this.getTasks()} 
                  onDeleteTask={this.handleDeleteTask}
                  onDone={this.handleDone}/>

          <Pagination itemsCount={todos.length}
                          pageSize = {pageSize}
                          onPageChange={this.handlePage}
                          currentPage={currentPage} />
          </div>
            </div>
            <div className="col-2">
            <Outlet context={{
                data:todos,
                onSave:this.handleSave
            }}/> 
            </div>
        </div>
      );
    }
  }
   
  export default (props)=>{
    const navigation = useNavigate();
    return <Main {...props}  navigation={navigation}/>
  } 