import React from "react";
import Axios from "axios";
import "./../../styles.css";
import "./../css/admin.css";
import coffee_cup from "../../../assets/coffee_cup.png";
import Login from "./Login.js";
import Panel from "./Panel.js";

class CoffeeAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
        }
    }

    async componentDidMount() {
        window.onload = () => {
            let icon = document.getElementById("icon")
            icon.href = coffee_cup

            let apple_icon = document.getElementById("apple_icon")
            apple_icon.href = coffee_cup

            document.title = "Leo Ding - Coffee Admin";
        }

        try {
            await Axios.get("/backend/coffeeCheckSession");
            this.setState({"loggedIn": true,});
        } catch(err) {
            if (err.response.status !== 400) {
                console.log(err);
            }
        }
    }

    loginState() {
        this.setState({"loggedIn": true})
    };

    logoutState() {
        this.setState({"loggedIn": false})
    };

    render() {
        if (this.state.loggedIn === false) {
            return (
                <Login login={() => this.loginState()} logout={() => this.logoutState()}/>
            )
        } else {
            return(
                <Panel logout={() => this.logoutState()}/>
            )
        }
    }
}

export default CoffeeAdmin;