import React, { useState } from "react";
import "./../css/admin.css";
import { login } from "./api";

function AdminLogin(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const credentialSubmit = (event) => {
        event.preventDefault();

        let empty = false;

        if (password === "") {
            setPasswordError("Required");
            empty = true;
        } else {
            setPasswordError("");
        }

        if (username === "") {
            setUsernameError("Required");
            empty = true;
        } else {
            setUsernameError("");
        }

        if (!empty) {
            login(username.trim(), password.trim())
                .then((res) => {
                    props.setLoggedIn(true);
                    setUsername("");
                    setPassword("");
                    setUsernameError("");
                    setPasswordError("");
                })
                .catch((err) => {
                    props.setLoggedIn(false);
                    if (err.response.status === 400) {
                        setUsernameError("Invalid User")
                        setPasswordError("")
                    } else if (err.response.status === 401) {
                        setUsernameError("")
                        setPasswordError("Incorrect Password")
                    }
                })
        }
    }

    return (
        <div className={"adminCoffee"}>
            <h1>Admin Login</h1>
            <form onSubmit={credentialSubmit} data-testid={"loginForm"}>
                <div className={"textInput"}>
                    <input type={"text"} placeholder={"Username"} value={username}
                           onChange={(event) => setUsername(event.target.value)}/>
                    <div className={"messageCoffee errorCoffee"}>{usernameError}</div>
                </div>
                <div className={"textInput"}>
                    <input type={"password"} placeholder={"Password"} value={password}
                           onChange={(event) => setPassword(event.target.value)}/>
                    <div className={"messageCoffee errorCoffee"}>{passwordError}</div>
                </div>
                <button id={"loginCoffee"}>Login</button>
            </form>
        </div>
    )
}

export default AdminLogin;
