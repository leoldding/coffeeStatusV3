import React, { useState } from "react";
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
        <div className={"min-h-[calc(100%-36px)] pb-8"}>
            <h1 className={"text-4xl md:text-8xl pt-16 pb-12 px-4 text-center font-medium"}>Admin Login</h1>
            <form onSubmit={credentialSubmit} data-testid={"loginForm"} className={"h-full flex flex-col mx-auto justify-center items-center space-y-8 md:space-y-16 mt-8 md:mt-16"}>
                <div className={"mx-auto"}>
                    <input type={"text"} className={"bg-coffeeWhite-1 h-8 md:h-16 w-48 md:w-96 md:text-2xl border-solid border-0 border-b-[1px] border-coffeeBlack-1"}
                           placeholder={"Username"} value={username}
                           onChange={(event) => setUsername(event.target.value)}/>
                    <div className={"text-xs md:text-lg text-coffeeRed-1 my-1 md:my-2 mx-auto h-4"}>{usernameError}</div>
                </div>
                <div className={"mx-auto"}>
                    <input type={"password"} className={"bg-coffeeWhite-1 mx-auto h-8 md:h-16 w-48 md:w-96 md:text-2xl border-solid border-0 border-b-[1px] border-coffeeBlack-1"}
                           placeholder={"Password"} value={password}
                           onChange={(event) => setPassword(event.target.value)}/>
                    <div className={"text-xs md:text-lg text-coffeeRed-1 my-1 md:my-2 mx-auto h-4"}>{passwordError}</div>
                </div>
                <button className={"text-sm md:text-2xl text-coffeeWhite-1 mx-auto h-8 md:h-16 w-48 md:w-96 rounded shadow-[0.25rem_0.25rem_0.15rem_0.05rem_rgba(44,44,44,0.3)] transition duration-300 bg-[#9C6F44] md:hover:bg-[#6F4827] md:focus:bg-[#6F4827] md:active:bg-[#563517]"}>Login</button>
            </form>
        </div>
    )
}

export default AdminLogin;
