import React from 'react';
import Axios from 'axios';
import './../../styles.css';
import './../css/admin.css';
import coffee_cup from "../../../assets/coffee_cup.png";

class CoffeeAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            username: "",
            password: "",
            usernameError: "",
            passwordError: "",
            statusUpdate: "",
            updateError: "",
            updateSuccess: "",
        }

        this.usernameFocus = React.createRef();
        this.passwordFocus = React.createRef();
    }

    async componentDidMount() {
        var icon = document.getElementById("icon")
        icon.href = coffee_cup

        var apple_icon = document.getElementById("apple_icon")
        apple_icon.href = coffee_cup

        document.title = "Coffee Admin";

        try {
            await Axios.get("/backend/coffeeCheckSession");
            this.setState({"loggedIn": true,});
        } catch(err) {
            if (err.response.status !== 400) {
                console.log(err);
            }
            this.usernameFocus.current.focus();
        }
    }

    credentialSubmit = async (event) => {
        event.preventDefault();

        var empty = false;

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
                this.setState({username: "", password: "", usernameError: "", passwordError: "", loggedIn: true})

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
            }
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
        this.setState({loggedIn: false})
    }

    statusSubmit = async (event, status) => {
        event.preventDefault();
        event.currentTarget.blur();

        try {
            await Axios.post("/backend/coffeeStatusUpdate", {
                status: status,
            })
            this.setState({updateSuccess: "Status Updated", updateError: "",});
        } catch(err) {
            if (err.response.status === 401) {
                this.setState({loggedIn: false, updateError: "", updateSuccess: "",})
            } else {
                console.log(err)
                this.setState({updateSuccess: "", updateError: "Error with Status Update"});
            }
        }

        setTimeout(() => this.setState({updateError: "", updateSuccess: "",}), 5000);
    }

    render() {
        let usernameErrorMessage = this.state.usernameError
        let passwordErrorMessage = this.state.passwordError
        let statusUpdateError = this.state.updateError
        let statusUpdateSuccess = this.state.updateSuccess
        if (this.state.loggedIn === false) {
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
                        <button>Login</button>
                    </form>
                </div>
            )
        } else {
            return (
                <div className={"adminCoffee"}>
                    <h1>Admin Panel</h1>
                    <div className={"statusUpdateMessage"}>
                        <div className={"messageCoffee successCoffee"}>{statusUpdateSuccess}</div>
                        <div className={"messageCoffee errorCoffee"}>{statusUpdateError}</div>
                    </div>
                    <div className={"statusChangeContainerCoffee"}>
                        <button id={"yesStatusCoffee"} onClick={(event) => this.statusSubmit(event, 'yes')}>Yes</button>
                        <button id={"enrouteStatusCoffee"} onClick={(event) => this.statusSubmit(event, 'enroute')}>En Route</button>
                        <button id={"noStatusCoffee"} onClick={(event) => this.statusSubmit(event, 'no')}>No</button>
                        <button onClick={this.logout}>Logout</button>
                    </div>
                </div>
            )
        }
    }
}

export default CoffeeAdmin;