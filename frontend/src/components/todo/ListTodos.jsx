import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { deleteTodoApi, retrieveAllTodosForUserApi } from './api/TodoApiService';
import { useAuth } from './security/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ListTodos() {

    const [todos,setTodos] = useState([])
    const [message,setMessage] = useState(null)
    const authContext = useAuth()
    const username = authContext.username
    const navigate = useNavigate()

    useEffect (
        ()=>refreshTodos()
    )

    function refreshTodos(){
        retrieveAllTodosForUserApi(username)
            .then(response=>{
                setTodos(response.data)
            })
            .catch(error=>console.log(error))
    }
    function deleteTodo(id){
        const isConfirmed = window.confirm("Are you sure you want to delete this todo?");
        if (isConfirmed) {
            console.log("Delete confirmed for ID:", id);
            deleteTodoApi(username,id)
                .then(
                    ()=>{
                        refreshTodos()
                        setMessage("Delete Succesful")
                    }
                )
        } else {
            console.log("Delete canceled for ID:", id);
        }
    }
    function editTodo(id){
        navigate(`/todo/${id}`)
    }

    return (
        <div className="container">
            <h1 className="mb-5">You have To Do!</h1>
            <div>
            {message && <div className='alert alert-warning'>{message}</div>}
                <Table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Complete</th>
                            <th>Target Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.complete.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className='btn btn-primary m-1' onClick={()=>editTodo(todo.id)}>Edit</button><button className='btn btn-danger' onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
                                </tr>
                            )
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
