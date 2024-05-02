import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { retrieveAllTodosForUser } from './api/TodoApiService';

export default function ListTodos() {

    const [todos,setTodos] = useState([])

    useEffect (
        ()=>refreshTodos(),[]
    )

    function refreshTodos(){
        retrieveAllTodosForUser('admin')
            .then(response=>{
                setTodos(response.data)
            })
            .catch(error=>console.log(error))
    }

    return (
        <div className="container">
            <h1 className="mb-5">You have To Do!</h1>
            <div>
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
                                </tr>
                            )
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
