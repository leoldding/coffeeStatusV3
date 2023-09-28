import React, { useState, useEffect } from "react";
import "./../css/admin.css";
import AdminLogin from "./AdminLogin.js";
import AdminPanel from "./AdminPanel.js";
import { checkSession } from "./api";

function CoffeeAdmin() {
    const [loggedIn, setLoggedIn] = useState(false)

    // set document title
    useEffect(() => {
        document.title = "Leo Ding - Coffee Admin";
    }, [])

    // check for active session
    useEffect(() => {
        checkSession()
            .then(() => {
                setLoggedIn(true)
            })
            .catch((err) => console.log(err))
    }, []);

    if (!loggedIn) {
        return (
            <AdminLogin setLoggedIn={setLoggedIn}/>
        )
    } else {
        return(
            <AdminPanel setLoggedIn={setLoggedIn}/>
        )
    }
}

export default CoffeeAdmin;
