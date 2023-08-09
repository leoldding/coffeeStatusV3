import React from "react";
import Axios from "axios";
import coffee_cup from "./../../../assets/coffee_cup.png"
import info_icon from "./../../../assets/info_icon.png"
import "./../../styles.css";
import "./../css/main.css";

class CoffeeMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "",
        };
        this.colors = {
            "yes": "backgroundGreenCoffee",
            "enroute": "backgroundYellowCoffee",
            "no": "backgroundRedCoffee",
        };
    };

    ws = new WebSocket("wss://" + window.location.host + "/ws/coffeeWS");

    async componentDidMount() {
        window.onload = () => {
            let icon = document.getElementById("icon")
            icon.href = coffee_cup

            let apple_icon = document.getElementById("apple_icon")
            apple_icon.href = coffee_cup

            document.title = "Leo Ding - Coffee Status";
        }

        try {
            const data = await this.getCoffeeStatus();
            this.setState({status: data.status});
        } catch(err) {
            console.log(err)
        }

        this.ws.onmessage = event => {
            this.setState({status: event.data})
        }

        this.ws.onclose = _ => {
            console.log("WS connection has been closed.")
        }

        this.ws.onerror = _ => {
            console.log("Error has occurred. WS connection has been closed.")
        }

    };

    async getCoffeeStatus() {
        try {
            const response = await Axios.get("/backend/coffeeRetrieveStatus");
            return response.data;
        } catch(err) {
            console.log(err);
            return { status: "no"}; // default value
        }
    }

    displayInfo = async (event) => {
        event.preventDefault();

        let info = document.getElementById("infoCardCoffee");

        if (info.classList.contains("hideCoffee")) {
            info.classList.remove("hideCoffee");
        } else {
            info.classList.add("hideCoffee");
        }
    }

    render() {
        return (
            <div className={"mainCoffee"}>
                <h1>Is Leo at Think Coffee?</h1>
                <div className={`iconContainerCoffee ${this.colors[this.state.status]}`}>
                    <img className={"iconCoffee"} src={coffee_cup} alt={"Coffee Cup Icon"}/>
                </div>
                <div id={"infoContainerCoffee"}>
                    <button id={"infoButtonCoffee"} onClick={this.displayInfo}>
                        <img id={"infoIconCoffee"} src={info_icon} alt={"Information Icon"} />
                    </button>
                    <div id={"infoCardCoffee"} className={"cardCoffee hideCoffee"}>
                        <div>Green = "Yes"</div>
                        <div>Yellow = "En Route"</div>
                        <div>Red = "No"</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CoffeeMain;