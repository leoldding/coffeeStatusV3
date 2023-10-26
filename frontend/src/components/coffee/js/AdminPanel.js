import React, { useState, useEffect } from "react";
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
        <div className={"min-h-[calc(100%-36px)]"}>
            <h1 className={"text-4xl md:text-8xl pt-16 pb-12 px-4 text-center font-medium"}>Admin Panel</h1>
            <div className={"h-full flex flex-col mx-auto justify-center items-center space-y-8 md:space-y-16"}>
                <div data-testid={"statusMessage"} className={"text-center text-xs md:text-lg mx-auto h-4"}>{updateMessage}</div>
                <button className={"text-sm md:text-2xl mx-auto h-8 md:h-16 w-48 md:w-96 rounded shadow-[0.25rem_0.25rem_0.15rem_0.05rem_rgba(44,44,44,0.3)] transition duration-300 bg-coffeeGreen-1 md:hover:bg-coffeeGreen-2 md:focus:bg-coffeeGreen-2 md:active:bg-coffeeGreen-3"} onClick={(event) => statusSubmit(event, "yes")}>Yes</button>
                <button className={"text-sm md:text-2xl mx-auto h-8 md:h-16 w-48 md:w-96 rounded shadow-[0.25rem_0.25rem_0.15rem_0.05rem_rgba(44,44,44,0.3)] transition duration-300 bg-coffeeYellow-1 md:hover:bg-coffeeYellow-2 md:focus:bg-coffeeYellow-2 md:active:bg-coffeeYellow-3"} onClick={(event) => statusSubmit(event, "enroute")}>En Route</button>
                <button className={"text-sm md:text-2xl mx-auto h-8 md:h-16 w-48 md:w-96 rounded shadow-[0.25rem_0.25rem_0.15rem_0.05rem_rgba(44,44,44,0.3)] transition duration-300 bg-coffeeRed-1 md:hover:bg-coffeeRed-2 md:focus:bg-coffeeRed-2 md:active:bg-coffeeRed-3"} onClick={(event) => statusSubmit(event, "no")}>No</button>
                <button className={"text-sm md:text-2xl mx-auto h-8 md:h-16 bg-transparent underline w-fit"} onClick={setLogout}>logout</button>
            </div>
        </div>
    )
}

export default AdminPanel;
