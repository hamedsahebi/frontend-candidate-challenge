import React from 'react';
import { IoIosTrash } from "react-icons/io";
import { AiFillEdit,AiFillCheckCircle,AiOutlineCheckCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';



const TodoList = (props) => {
  const{todos,onDeleteTask,onDone} = props;
  return (
    <table>
        <tbody>
        {todos.map((item) => (
          <tr key={item._id}>
            <td>
              <span data-testid={`todo${item._id}`}>{item.text}</span>
            </td>
            <td>
              <button onClick={()=> onDone(item._id)} data-testid={`doneBtn${item._id}`}>
                {item.done?
                <AiFillCheckCircle  data-testid={`done${item._id}`}/>:
                <AiOutlineCheckCircle data-testid={`undone${item._id}`}/>}
              </button>
            </td>
            <td>
              <Link style={{cursor:'pointer'}} to={`/${item._id}`} data-testid={`edit${item._id}`}>
              <AiFillEdit/>
              </Link>
            </td>
            <td>
                <button onClick={()=> onDeleteTask(item._id)} data-testid={`delete${item._id}`}>
                  <IoIosTrash/>
                  </button>
            </td>
          </tr>
        ))}
        </tbody>
    </table>
  );
}

TodoList.propTypes = {
  todos:propTypes.arrayOf(propTypes.shape({
    _id:propTypes.string,
    text:propTypes.string,
    done:propTypes.bool
  })).isRequired,
  onDeleteTask:propTypes.func,
  onDone:propTypes.func
}
 
export default TodoList;

