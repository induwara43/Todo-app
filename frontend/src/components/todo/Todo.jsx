import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import moment from "moment"

export default function Todo(){

    const {id} = useParams()
    const authContext = useAuth()
    const username = authContext.username
    const navigate = useNavigate()

    useEffect(
        ()=>retrieveTodo(),[id]
    )
    const [description,setDescription] = useState('')
    const [targetDate,setTargetDate] = useState('')

    function retrieveTodo(){
       if(id!==-1){ 
        retrieveTodoApi(username,id)
            .then(response=>{
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch(error=>console.log(error))
        }
    }

    function onSubmit(values){
        const todo = {
            id:id,
            username:username,
            description:values.description,
            targetDate:values.targetDate,
            complete:false
        }
        if(id===-1){
            createTodoApi(username,todo)
            .then(response=>{
                console.log(response)
                navigate("/todos")
            })
            .catch(error=>console.log(error))
        }
        updateTodoApi(username,id,todo)
            .then(response=>{
                console.log(response)
                navigate("/todos")
            })
            .catch(error=>console.log(error))
    }

    function validate(values){
        let errors = {
        }
        if(values.description.length<5)
            errors.description = "Enter at least 5 values"
        if(values.targetDate == null||values.targetDate==""||!moment(values.targetDate).isValid())
            errors.targetDate = "Enter a date"
        return errors
    }

    return(
        <div className="container">
            <h1>Edit Todo Details</h1>
            <div>
               <Formik initialValues ={{description,targetDate}} enableReinitialize = {true} onSubmit={onSubmit} validate={validate}>
                {
                    (props)=>(
                        <Form>
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type="text" required className="form-control" name="description" />
                                <ErrorMessage name="description" component="small" className="text-danger"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type="date" required className="form-control" name="targetDate" />
                                <ErrorMessage name="targetDate" component="small" className="text-danger"/>
                            </fieldset>
                            <div>
                                <button type="submit" className="btn btn-success m-3">Save</button>
                            </div>
                        </Form>
                    )
                }
               </Formik>
            </div>
        </div>
    )
}