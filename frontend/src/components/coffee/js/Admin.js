import React from 'react';
import Axios from 'axios';
import './../../styles.css';
import './../css/admin.css';

class CoffeeAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            username: "",
            password: "",
            usernameError: "",
            passwordError: "",
            status: "",
            statusError: "",
            successMessage: "",
        }

        this.usernameFocus = React.createRef();
        this.passwordFocus = React.createRef();
    }

    async componentDidMount() {
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

        if (this.state.username === "") {
            this.setState({usernameError: "Required", passwordError: "",});
            this.usernameFocus.current.focus();
        } else if (this.state.password === "") {
            this.setState({usernameError: "", passwordError: "Required",});
            this.passwordFocus.current.focus();
        } else {
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

    statusSubmit = async (event) => {
        event.preventDefault();

        var validStatuses = ["yes", "enroute", "no"]

        if (this.state.status === "") {
            this.setState({statusError: "Status can't be empty!", successMessage: "",})
        } else if (validStatuses.findIndex(status => {return status === this.state.status}) === -1) {
            this.setState({statusError: "Not a valid status!", successMessage: "",})
        } else {
            this.setState({status: "", statusError: "",})
            try {
                await Axios.post("/backend/coffeeStatusUpdate", {
                    status: this.state.status,
                })
                this.setState({successMessage: "Successfully sent status!"})
            } catch(err) {
                if (err.response.status === 401) {
                    this.setState({loggedIn: false, status: "", statusError: "", successMessage: "",})
                } else {
                    console.log(err)
                }
            }
        }
    }

    render() {
        let usernameErrorMessage = this.state.usernameError
        let passwordErrorMessage = this.state.passwordError
        let statusErrorMessage = this.state.statusError
        let statusSuccessMessage = this.state.successMessage
        if (this.state.loggedIn === false) {
            return (
                <div className={"adminCoffee"}>
                    <h1>Admin Login</h1>
                    <div className={"formContainerCoffee"}>
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
                </div>
            )
        } else {
            return (
                <div className={"adminCoffee"}>
                    <h1>Admin Panel</h1>
                    <div className={"formContainerCoffee"}>
                        <form onSubmit={this.statusSubmit}>
                            <div className={"messageCoffee successCoffee"}>{statusSuccessMessage}</div>
                            <input type={"text"} placeholder={"Status [Yes / En Route / No]"} value={this.state.status}
                                   onChange={(event) => this.setState({status: event.target.value})}/>
                            <div className={"messageCoffee errorCoffee"}>{statusErrorMessage}</div>
                            <div className={"multipleButtonsCoffee"}>
                                <button>Submit</button>
                                <button onClick={this.logout}>Logout</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

export default CoffeeAdmin;