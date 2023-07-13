import React from "react";
import "./../../styles.css";
import "./../css/container.css";
import coffee_cup from "./../../../assets/coffee_cup.png"

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.colors = {
            "yes": "backgroundGreenCoffee",
            "enroute": "backgroundYellowCoffee",
            "no": "backgroundRedCoffee",
        }
    }

    render() {
        return (
            <div className={`iconContainerCoffee ${this.colors[this.props.status]}`}>
                <img className={"iconCoffee"} src={coffee_cup} alt={"Coffee Cup Icon"}/>
            </div>
        )
    }
}

export default Container
