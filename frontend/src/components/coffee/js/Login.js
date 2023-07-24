import React from "react";
import Axios from "axios";
import "./../../styles.css";
import "./../css/admin.css";
import coffee_cup from "../../../assets/coffee_cup.png";

class CoffeeLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            usernameError: "",
            passwordError: "",
        }

        this.usernameFocus = React.createRef();
        this.passwordFocus = React.createRef();
    }

    async componentDidMount() {
        window.onload = () => {
            let icon = document.getElementById("icon")
            icon.href = coffee_cup

            let apple_icon = document.getElementById("apple_icon")
            apple_icon.href = coffee_cup

            document.title = "Leo Ding - Coffee Admin";
        }
    }

    credentialSubmit = async (event) => {
        event.preventDefault();

        let empty = false;

        if (this.state.password === "") {
            this.setState({passwordError: "Required"});
            this.passwordFocus.current.focus();
            empty = true;
        } else {
            this.setState({passwordError: ""});
        }

        if (this.state.username === "") {
            this.setState({usernameError: "Required"});
            this.usernameFocus.current.focus();
            empty = true;
        } else {
            this.setState({usernameError: ""});
        }

        if (!empty) {
            try {
                await Axios.post("/backend/coffeeLogin", {
                    username: this.state.username.trim(),
                    password: this.state.password.trim(),
                });
                this.props.login();
                this.setState({username: "", password: "", usernameError: "", passwordError: ""});

            } catch (err) {
                if (err.response.status === 400) {
                    this.setState({usernameError: "Invalid User", passwordError: "",});
                    this.usernameFocus.current.focus();
                } else if (err.response.status === 401) {
                    this.setState({usernameError: "", passwordError: "Invalid Password"});
                    this.passwordFocus.current.focus();
                } else {
                    console.log(err)
                }
                this.props.logout();
            }
        }
    }

    render() {
        let usernameErrorMessage = this.state.usernameError
        let passwordErrorMessage = this.state.passwordError
        return (
            <div className={"adminCoffee"}>
                <h1>Admin Login</h1>
                <form onSubmit={this.credentialSubmit}>
                    <div className={"textInput"}>
                        <input type={"text"} placeholder={"Username"} value={this.state.username} ref={this.usernameFocus}
                               onChange={(event) => this.setState({username: event.target.value})}/>
                        <div className={"messageCoffee errorCoffee"}>{usernameErrorMessage}</div>
                    </div>
                    <div className={"textInput"}>
                        <input type={"password"} placeholder={"Password"} value={this.state.password} ref={this.passwordFocus}
                               onChange={(event) => this.setState({password: event.target.value})}/>
                        <div className={"messageCoffee errorCoffee"}>{passwordErrorMessage}</div>
                    </div>
                    <button id={"loginCoffee"}>Login</button>
                </form>
            </div>
        )
    }

}

export default CoffeeLogin;