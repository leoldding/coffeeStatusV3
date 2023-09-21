import React, { useState, useEffect } from "react";
import Axios from "axios";
import coffee_cup from "./../../../assets/coffee_cup.png"
import info_icon from "./../../../assets/info_icon.png"
import "./../../styles.css";
import "./../css/main.css";

function CoffeeMain() {
    const [status, setStatus] = useState("no");
    const [hidden, setHidden] = useState("hideCoffee");

    const colors = {
        "yes": "backgroundGreenCoffee",
        "enroute": "backgroundYellowCoffee",
        "no": "backgroundRedCoffee",
    };

    // websocket channel
    useEffect(() => {
        const webSocket = new WebSocket("wss://" + window.location.host + "/ws/coffeeWS");

        webSocket.onmessage = event => {
            setStatus(event.data)
        }

        webSocket.onclose = _ => {
            console.log("webSocket connection has been closed.");
        }

        webSocket.onerror = _ => {
            console.log("Error has occurred. webSocket connection has been closed.");
        }
    }, []);

    // get current status on load
    useEffect(() => {
        Axios.get("/backend/coffeeRetrieveStatus")
            .then((res) => setStatus(res.data.status))
            .catch(err => console.log(err))
    }, []);

    // set index elements
    useEffect(() => {
        let icon = document.getElementById("icon")
        icon.href = coffee_cup

        let apple_icon = document.getElementById("apple_icon")
        apple_icon.href = coffee_cup

        document.title = "Leo Ding - Coffee Status";
    }, []);

    // hide/show info card
    const displayInfo = () => {
        if (hidden === "hideCoffee") {
            setHidden("");
        } else {
            setHidden("hideCoffee");
        }
    };

    return (
        <div className={"mainCoffee"}>
            <h1>Is Leo at Think Coffee?</h1>
            <div className={`iconContainerCoffee ${colors[status]}`}>
                <img className={"iconCoffee"} src={coffee_cup} alt={"Coffee Cup Icon"}/>
            </div>
            <div id={"infoContainerCoffee"}>
                <button id={"infoButtonCoffee"} onClick={displayInfo}>
                    <img id={"infoIconCoffee"} src={info_icon} alt={"Information Icon"} />
                </button>
                <div id={"infoCardCoffee"} className={`cardCoffee ${hidden}`}>
                    <div>Green = "Yes"</div>
                    <div>Yellow = "En Route"</div>
                    <div>Red = "No"</div>
                </div>
            </div>
        </div>
    );
}

export default CoffeeMain;
