import React from "react";
import Axios from "axios";
import "./../../styles.css";
import "./../css/admin.css";
import coffee_cup from "../../../assets/coffee_cup.png";

class CoffeePanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            updateMessage: "",
            updateCounter: 0,
        }
    }

    async componentDidMount(){
        window.onload = () => {
            let icon = document.getElementById("icon")
            icon.href = coffee_cup

            let apple_icon = document.getElementById("apple_icon")
            apple_icon.href = coffee_cup

            document.title = "Leo Ding - Coffee Admin";
        }
    }

    logout = async (event) => {
        event.preventDefault();

        try {
            await Axios.get("/backend/coffeeLogout")
        } catch(err) {
            if (err.response.status === 500) {
                console.log(err)
            }
        }
        this.props.logout();
        this.setState({loggedIn: false});
    }

    statusSubmit = async (event, status) => {
        event.preventDefault();
        event.currentTarget.blur();

        try {
            await Axios.post("/backend/coffeeStatusUpdate", {
                status: status,
            })
            this.setState({updateMessage: "Status Updated"});
        } catch(err) {
            if (err.response.status === 401) {
                this.setState({loggedIn: false, updateMessage: ""})
            } else {
                console.log(err)
                this.setState({updateMessage: "Error with Status Update"});
            }
        }
        this.setState({updateCounter: this.state.updateCounter + 1})
        setTimeout(() => {
                this.setState({updateCounter: this.state.updateCounter - 1})
            }, 5000);
    }

    render() {
        const counter = this.state.updateCounter
        let statusUpdateMessage
        if (counter > 0) {
            statusUpdateMessage = this.state.updateMessage;
        } else {
            statusUpdateMessage = "";
        }
        return (
            <div className={"adminCoffee"}>
                <h1>Admin Panel</h1>
                <div id={"statusMessageCoffee"} className={"messageCoffee"}>{statusUpdateMessage}</div>
                <div className={"statusChangeContainerCoffee"}>
                    <button id={"yesStatusCoffee"} onClick={(event) => this.statusSubmit(event, "yes")}>Yes</button>
                    <button id={"enrouteStatusCoffee"} onClick={(event) => this.statusSubmit(event, "enroute")}>En Route</button>
                    <button id={"noStatusCoffee"} onClick={(event) => this.statusSubmit(event, "no")}>No</button>
                    <button id={"logoutCoffee"} onClick={this.logout}>logout</button>
                </div>
            </div>
        )
    }
}

export default CoffeePanel;