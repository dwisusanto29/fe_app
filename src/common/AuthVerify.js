import React from "react";
import { withRouter } from "react-router-dom";

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

const AuthVerify = (props) => {
    props.history.listen(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = parseJwt(token);
            if (user) {
                if (user.exp * 1000 < Date.now()) {
                    localStorage.removeItem("token");
                    props.history.push("/login");
                }
            }
        } else {
            props.history.push("/login");
        }
    });
    return null;
};

export default withRouter(AuthVerify);