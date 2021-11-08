import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Dashboard.module.scss";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { UsuarioContext } from "../context/UsuarioContext";
import { useHistory } from "react-router-dom";



const Dashboard = () => {

    const [projectList, setProjectList] = useState([]);
    const {usuario, setUsuario} = useContext(UsuarioContext);
    const history = useHistory();

    const getAllProjects = async () => {
        try {
            const response = await axios.get("http://localhost:8000/projects");
            console.log(response.data);
            setProjectList(response.data);
            console.log(projectList);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        if(!usuario){
            history.push("/sign_in");
        }
        //setTimeout(()=>{
        getAllProjects();

        // },1000)

    }, [])




    const moveToProgress = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8000/projects/${id}/toprogress`);
            console.log(response.data);

            Swal.fire({
                title: "Project updated InProgress",
                text: "OK",
                icon: "success"
            })

            getAllProjects();

        } catch (err) {
            console.log(err);
            Swal.fire({
                title: `Projecto no fue actualizado ${err.response.data.err.message} `,
                text: "Not OK",
                icon: "error"
            })
        }
    }

    const moveToCompleted = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8000/projects/${id}/tocompleted`);
            console.log(response.data);

            Swal.fire({
                title: "Project updated to completed",
                text: "OK",
                icon: "success"
            })

            getAllProjects();

        } catch (err) {
            console.log(err);
            Swal.fire({
                title: `Project no fue actualizado ${err.response.data.err.message} `,
                text: "Not OK",
                icon: "error"
            })
        }
    }


    const deleteProject = async (id) => {
        await axios.delete(`http://localhost:8000/projects/${id}`)
            .then(res => {
                Swal.fire({
                    title: "Project Deleted",
                    text: `Project eliminado`,
                    icon: "success"
                });
                
                getAllProjects();
            })
            .catch(err => {
                Swal.fire({
                    title: `Error`,
                    text: `No se pudo eliminar projecto `,
                    icon: "error"
                })
            })
    }


    return (
        <Container>
            <Row><h2>Project Manager</h2>
                <Col className={styles.overflow}>
                    <p className={styles.backlog}>Backlog</p>
                    {
                        projectList.filter(item => (item.status === 'I'))
                            .map(item =>
                                <div className={styles.cardBackLog} key={item._id}>
                                    <h4>{item.projectName}</h4>
                                    <p>Due: {item.dueDate}</p>
                                    <Button onClick={() => moveToProgress(item._id)} className={styles.buttonBacklog}>Start Project  &#62;</Button>
                                </div>
                            )

                    }
                </Col>
                <Col className={styles.overflow}>
                    <p className={styles.inprogress}>In Progress</p>
                    {
                        projectList.filter(item => (item.status === 'P'))
                            .map(item =>
                                <div className={styles.cardInProgress} key={item._id}>
                                    <h4>{item.projectName}</h4>
                                    <p>Due: {item.dueDate}</p>
                                    <Button onClick={() => moveToCompleted(item._id)} className={styles.buttonInprogress}>Move to Completed  &#62;</Button>
                                </div>
                            )

                    }
                </Col>
                <Col className={styles.overflow}>
                    <p className={styles.completed}>Completed</p>
                    {
                        projectList.filter(item => (item.status === 'C'))
                            .map(item =>
                                <div className={styles.cardBackLog} key={item._id}>
                                    <h4>{item.projectName}</h4>
                                    <p>Due: {item.dueDate}</p>
                                    <Button onClick={() => deleteProject(item._id)} className={styles.buttonCompleted}>Remove Project  &#62;</Button>
                                </div>
                            )

                    }

                </Col>
                
            </Row>
            <Link className={styles.linkAdd} to="/projects/new">+ Add New Project</Link>
        </Container>

    )
}

export default Dashboard;