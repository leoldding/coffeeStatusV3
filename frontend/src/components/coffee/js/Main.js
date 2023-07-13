import React from 'react';
import Axios from 'axios';
import Container from './Container.js';
import coffee_cup from './../../../assets/coffee_cup.png'
import info_icon from './../../../assets/info_icon.png'
import './../../styles.css';
import './../css/main.css';

class CoffeeMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
        };
    };

    async componentDidMount() {
        var icon = document.getElementById("icon")
        icon.href = coffee_cup

        var apple_icon = document.getElementById("apple_icon")
        apple_icon.href = coffee_cup

        document.title = "Leo Ding - Coffee Status";

        try {
            var data
            await Axios.get("/backend/coffeeRetrieveStatus")
                .then(function (response) {
                    data = response.data
                })
            this.setState({status: data.status})
        } catch(err) {
            console.log(err)
        }
    };

    displayInfo = async (event) => {
        event.preventDefault();

        var info = document.getElementById("infoCardCoffee");

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
                <Container status={this.state.status}/>
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