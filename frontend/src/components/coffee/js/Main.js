import React from 'react';
import Axios from 'axios';
import Container from './Container.js';
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

    render() {
        return (
            <div className={"mainCoffee"}>
                <h1>Is Leo at Think Coffee?</h1>
                <Container status={this.state.status}/>
            </div>
        )
    }
}

export default CoffeeMain;