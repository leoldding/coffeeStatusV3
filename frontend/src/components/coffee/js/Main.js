import React, { useState, useEffect } from "react";
import { retrieveStatus } from "./api";
import CoffeeFooter from "./Footer";

function CoffeeMain() {
    const [status, setStatus] = useState("blank");
    const [hidden, setHidden] = useState("opacity-0");
    const [loading, setLoading] = useState(false);

    const colors = {
        "yes": "bg-coffeeGreen-1",
        "enroute": "bg-coffeeYellow-1",
        "no": "bg-coffeeRed-1",
        "blank": "bg-transparent",
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
        setLoading(true);
        retrieveStatus()
            .then((data) => {
                setStatus(data)
                setLoading(false);
            })
            .catch((err) => console.log(err))
    }, []);

    // hide/show info card
    const displayInfo = () => {
        if (hidden === "opacity-0") {
            setHidden("opacity-100");
        } else {
            setHidden("opacity-0");
        }
    };

    return (
        <div className={"min-h-full"}>
            <h1 className={"text-4xl md:text-8xl pt-16 px-4 text-center font-medium"}>Is Leo at Think Coffee?</h1>
            <div className={`h-56 w-56 md:h-96 md:w-96 rounded-full mx-auto mt-24 mb-4 flex flex-column justify-center items-center ${colors[status]}`}>
                <div className={"absolute h-56 w-56 md:h-96 md:w-96 border-4 border-solid border-t-coffeeBlack-1 rounded-full " + (loading ? "border-transparent animate-spin" : "border-coffeeBlack-1 animate-none")}></div>
                <img data-testid={"coffeeImage"} className={"h-40 w-40 md:h-64 md:w-64 mt-[1.5rem] mr-[1.5rem] mb-[2.5rem] ml-[2.25rem] md:mt-[2.25rem] md:mr-[2.625rem] md:mb-[3.75rem] md:ml-[3.375rem]"} src={process.env.PUBLIC_URL + "coffee_cup.png"} alt={"Coffee Cup Icon"}/>
            </div>
            <div className={"relative"}>
                <button className={"absolute right-4"} onClick={displayInfo}>
                    <img className={"h-8 w-8"} src={process.env.PUBLIC_URL + "info_icon.png"} alt={"Information Icon"} />
                </button>
                <div data-testid={"infoCard"} className={`absolute md:text-2xl bg-[#D7C5B4] border-2 border-coffeeBlack-1 border-solid rounded shadow-[0.25rem_0.25rem_0.15rem_0.05rem_rgba(44,44,44,0.3)] p-2 top-8 right-12 md:-top-28 w-fit transition duration-200 ${hidden}`}>
                    <div>Green = "Yes"</div>
                    <div>Yellow = "En Route"</div>
                    <div>Red = "No"</div>
                </div>
            </div>
            <CoffeeFooter link={"/admin"} text={"Admin Login"}/>
        </div>
    )
}

export default CoffeeMain;
