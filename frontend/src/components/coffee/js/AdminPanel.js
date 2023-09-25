import React, { useState, useEffect } from "react";
import "./../../styles.css";
import "./../css/admin.css";
import { logout, statusUpdate } from "./api";

function AdminPanel(props) {
    const [updateMessage, setUpdateMessage] = useState("");
    const [updateCounter, setUpdateCounter] = useState(0);

    // logout
    const setLogout = () => {
        logout()
            .catch((err) => console.log(err))
        props.setLoggedIn(false)
    }

    // update status
    const statusSubmit = (event, status) => {
        event.preventDefault();
        event.currentTarget.blur();

        statusUpdate(status)
            .then(() => {
                setUpdateMessage("Status Updated")
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    props.setLoggedIn(false)
                } else {
                    setUpdateMessage("Error with Status Update")
                }
                console.log(err)
            })

        setUpdateCounter(updateCounter + 1)
    }

    // manage update counter
    useEffect(() => {
        if (updateCounter === 0) {
            setUpdateMessage("");
        } else if (updateCounter > 0) {
            const timeout = setTimeout(setUpdateCounter, 5000, updateCounter - 1);
            return () => clearTimeout(timeout)
        }
    }, [updateCounter])

    return (
        <div className={"adminCoffee"}>
            <h1>Admin Panel</h1>
            <div id={"statusMessageCoffee"} className={"messageCoffee"}>{updateMessage}</div>
            <div className={"statusChangeContainerCoffee"}>
                <button id={"yesStatusCoffee"} onClick={(event) => statusSubmit(event, "yes")}>Yes</button>
                <button id={"enrouteStatusCoffee"} onClick={(event) => statusSubmit(event, "enroute")}>En Route</button>
                <button id={"noStatusCoffee"} onClick={(event) => statusSubmit(event, "no")}>No</button>
                <button id={"logoutCoffee"} onClick={setLogout}>logout</button>
            </div>
        </div>
    )
}

export default AdminPanel;
