import React, { useState, useEffect } from "react";
import coffee_cup from "./../../../assets/coffee_cup.png"
import info_icon from "./../../../assets/info_icon.png"
import "./../../styles.css";
import "./../css/main.css";
import { retrieveStatus } from "./api";

function CoffeeMain() {
    const [status, setStatus] = useState("no");
    const [hidden, setHidden] = useState("hideCoffee");

    const colors = {
        "yes": "backgroundGreenCoffee",
        "enroute": "backgroundYellowCoffee",
        "no": "backgroundRedCoffee",
    };

    // set document title
    useEffect(() => {
        document.title = "Leo Ding - Coffee Status";
    }, []);

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
        retrieveStatus()
            .then((data) => {
                setStatus(data)
            })
            .catch((err) => console.log(err))
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
                <img data-testid={"coffeeImage"} className={"iconCoffee"} src={coffee_cup} alt={"Coffee Cup Icon"}/>
            </div>
            <div id={"infoContainerCoffee"}>
                <button id={"infoButtonCoffee"} onClick={displayInfo}>
                    <img id={"infoIconCoffee"} src={info_icon} alt={"Information Icon"} />
                </button>
                <div data-testid={"infoCard"} id={"infoCardCoffee"} className={`cardCoffee ${hidden}`}>
                    <div>Green = "Yes"</div>
                    <div>Yellow = "En Route"</div>
                    <div>Red = "No"</div>
                </div>
            </div>
        </div>
    )
}

export default CoffeeMain;
