import React, { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap"
import Swal from "sweetalert2";
import axios from "axios";
import { UsuarioContext } from "../context/UsuarioContext";
import { useHistory } from "react-router-dom";


const UserForm = () => {

    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirm: ''
    }
    
    const [userForm, setUserForm] = useState(initialValues);
    const [loginForm, setLoginForm] = useState(initialValues);
    const { setUsuario } = useContext(UsuarioContext);
    const history = useHistory();


    const handleOnChange = (e) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value })
    }

    const onSubmitHandle = async (e) => {
        e.preventDefault();
        if (userForm.password !== userForm.confirm) {
            Swal.fire({
                title: "error",
                text: "Las contraseñas no coinciden",
                icon: "error"
            });
            //retornar false para salir de onSubmitHandle ya no se debe ejecutar las siguientes lineas
            return false;
        }

        try {
            //creo el usuario 
            const response = await axios.post("http://localhost:8000/user", userForm);
            console.log(`onSubmitHandle: ${response.data}`);

            Swal.fire({
                title: "Usuario creado satisfactoriamente",
                text: "OK",
                icon: "success"
            })

        } catch (err) {
            console.log(err);
            Swal.fire({
                title: `Usuario no fue creado ${err.response.data.err.message} `,
                text: "Not OK",
                icon: "error"
            })
        }
        reset();
    }


    const handleOnChangeLogin = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }

    const onLoginHandle = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8000/user/${loginForm.email}`);
            const { user } = response.data;

            if (loginForm.password === user.password) {
                console.log("Usuario encontrado en la bd");
                Swal.fire({
                    title: "Connected",
                    text: "User Connected",
                    icon: "success"
                });
                reset();
                setUsuario(user);
                history.push("/");
            } else {
                console.log("Usuario no encontrado en la BD");
                Swal.fire({
                    title: "User not found",
                    text: "User Not Connected",
                    icon: "error"
                });
            }

        } catch (err) {
            console.log(err)
        }
    }

    const reset = () => {
        setUserForm(initialValues);
        setLoginForm(initialValues);


    }
    return (
        <div>
            <Container>
                <Row>
                    <h2>Project Manager</h2>

                    <Col>
                        <form onSubmit={onSubmitHandle} >
                            <h3>Register</h3>

                            <div className="form-group">
                                <label htmlFor="">Username</label>
                                <input className="form-control" type="text" name="username" value={userForm.username} onChange={handleOnChange} required minLength="3" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Email</label>
                                <input className="form-control" type="email" name="email" value={userForm.email} onChange={handleOnChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Password</label>
                                <input className="form-control" type="password" name="password" value={userForm.password} onChange={handleOnChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Confirmar </label>
                                <input className="form-control" type="password" name="confirm" value={userForm.confirm} onChange={handleOnChange} />
                            </div>


                            <button className="btn btn-primary mt-3" type="submit" >Registrar</button>
                        </form>

                    </Col>
                    <Col >
                        <form onSubmit={onLoginHandle} >
                            <h3>Login</h3>


                            <div className="form-group">
                                <label htmlFor="">Email</label>
                                <input className="form-control" type="email" name="email" value={loginForm.email} onChange={handleOnChangeLogin} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Password</label>
                                <input className="form-control" type="password" name="password" value={loginForm.password} onChange={handleOnChangeLogin} required />
                            </div>

                            <button className="btn btn-primary mt-3" type="submit" >Login</button>
                        </form>


                    </Col>
                </Row>

            </Container>

        </div>
    )
}
export default UserForm;