import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./NewProject.module.scss";
import { useHistory } from "react-router-dom";
import { UsuarioContext } from "../context/UsuarioContext";


const NewProject = () => {

    const initialValues = {
        projectName:"",
        dueDate:""
    }
    
    const [projectForm,setProjectForm] = useState(initialValues);
    const history = useHistory();
    const {usuario, setUsuario} = useContext(UsuarioContext);


    const handleOnChange = (e) => {
        setProjectForm({...projectForm, [e.target.name]: e.target.value})
    }
    const onSubmitHandle = async(e)=>{
        e.preventDefault();
        console.log(e);
        try {
            //creo el project 
            const response = await axios.post("http://localhost:8000/projects/new", projectForm);
            console.log(`onSubmitHandle: ${response.data}`);

            Swal.fire({
                title: "Project creado satisfactoriamente",
                text: "OK",
                icon: "success"
            })
            reset(); 
            history.push("/")

        } catch (err) {
            console.log(err);
            Swal.fire({
                title: `Project no fue creado ${err.response.data.err.message} `,
                text: "Not OK",
                icon: "error"
            })
        }
    }

    const reset = () => {
        setProjectForm(initialValues);
    }

    useEffect(()=>{
        if(!usuario){
            history.push("/sign_in");
        }
    },[]

    )

    return (
        <div>
            <Container>
                <Row>
                    <h1>Project Manager</h1>
                    <Link className={styles.linkCreateProject} to="/">Back to dashboard</Link>

                    <Col>
                        <form onSubmit={onSubmitHandle} >
                            <h4>Plan a New Project</h4>



                            <div className="form-group">
                                <label htmlFor="">Project</label>
                                <input className="form-control" type="text" name="projectName" value={projectForm.projectName} 
                                onChange={handleOnChange} required minLength="3"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Due Date</label>
                                <input className="form-control" type="date" name="dueDate" value={projectForm.dueDate} 
                                onChange={handleOnChange} required />
                            </div>

                            <button className="btn btn-primary mt-3" type="submit" >Plan a Project</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default NewProject;