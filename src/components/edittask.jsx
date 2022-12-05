import React,{Component} from 'react';
import { Link,useParams,
    useOutletContext,useNavigate} from 'react-router-dom';
import joi from 'joi-browser';
import InputForm from './common/inputForm';
import {AiOutlineCloseSquare} from  "react-icons/ai";
import propTypes from 'prop-types';



class EditTask extends Component {
    state = { 
        data:{taskValue:''},
        errors:{}
    }

loadData =()=>{
    const{taskId} = this.props.params;
    const {data:todos} = this.props.data;
    
    const task = todos.find(task => task._id === taskId);
    
    if(!task) return;

    const data = {...this.state.data};
    data.taskValue = task.text;
    this.setState({data});
}
componentDidMount(){
    this.loadData();
}

schema = {
        taskValue: joi.string().min(3).required().label('Task')
}

validateProperty = ({name,value})=>{
        const schema = {[name]:this.schema[name]};
        const obj = {[name]:value};
        const {error} = joi.validate(obj,schema);
           return error? error.details[0].message:null;
       }
onChangeHandler = ({currentTarget:input})=>{
    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input);
    if(errorMessage) errors[input.name] = errorMessage
    else delete errors[input.name]

    const data = {...this.state.data};
    data[input.name] = input.value;
    this.setState({data,errors});
}

componentDidUpdate(prevProps,prevState){

    const {taskId} = prevProps.params;

    if(taskId !==this.props.params.taskId){
        this.loadData();
        this.setState({errors:{}});
    }
}
    render() { 
        const {taskId} = this.props.params;
        const {onSave} = this.props.data;
        const{data, errors} = this.state;
        return (
            <div style={{border:'1px black solid', borderRadius:10, width:205}} >

                <Link style={{float:'right'}} to="/"><AiOutlineCloseSquare/></Link>
                <h3>Edit task</h3>
                <InputForm name='taskValue'
                    title=''
                    value={data.taskValue} 
                    onChange={this.onChangeHandler} 
                    error={errors['taskValue']}
                    disabled={this.validateProperty({name:'taskValue',
                              value:data.taskValue})?true:false} 
                    onSubmit={()=>{onSave(taskId,data.taskValue)
                                   this.props.navigate('/')
                               }
                            }
                    btnTitle={'Save'} />
            </div>)
    }
}

EditTask.propTypes = {
    params:propTypes.objectOf(propTypes.string).isRequired,
    data: propTypes.shape({
        data:propTypes.arrayOf(propTypes.shape({
            _id:propTypes.string,
            text:propTypes.string,
            done:propTypes.bool,
        })).isRequired,
        onSave:propTypes.func.isRequired
    })
}
export default  (props)=>{
    const params = useParams();
    const data = useOutletContext();
    const navigate = useNavigate()
    return <EditTask {...props} 
                     params={params} 
                     data={data}
                     navigate={navigate} />
}


