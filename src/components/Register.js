import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";

const required = (value) => {
    if (!value) {
        return (
        <div className="invalid-feedback">
            This field is required.
        </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
        <div className="invalid-feedback">
            Please enter a valid email.
        </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6) {
        return (
        <div className="invalid-feedback">
            Password must be at least 6 characters.
        </div>
        );
    }
};

const Register = (props) => {
    const from = useRef();
    const checkBtn = useRef();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        from.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(name, email, password).then(
                (response) => {
                    if (response.data.message) {
                        console.log(response.data.message);
                        setMessage(response.data.message);
                        setSuccessful(true);
                    } else {
                        props.history.push("/login");
                    }
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        } 
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img 
                    src="https://freepngimg.com/thumb/logo/73656-social-logo-slideshare-computer-icons-free-clipart-hq.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Form onSubmit={handleRegister} ref={from}>
                {!successful && (
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={onChangeName}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={onChangeEmail}
                                validations={[required, validEmail]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required, vpassword]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={onChangeConfirmPassword}
                                validations={[required, vpassword]}
                            />
                        </div>
                        <div className="form-group">

                            <button className="btn btn-primary btn-block">Register</button>
                        </div>
                    </div>
                )}
                {successful && (
                    <div className="form-group">
                        <h4>{message}</h4>
                    </div>
                )}

                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );
}


export default Register;
