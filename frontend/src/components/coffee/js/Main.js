import React from 'react';
import Axios from 'axios';
import Container from './Container.js';
import './../../styles.css';
import './../css/main.css';

class CoffeeMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: true,
            status: '',
            substatus: '',
        };
    };

    async componentDidMount() {
        if (window.matchMedia("(min-width: 769px)").matches) {
            this.setState({mobile: false})
        }

        window.addEventListener('resize', (event) => {
            window.innerWidth < 768 ? this.setState({mobile: true}) : this.setState({mobile: false})
        });

        try {
            var data
            await Axios.get("/backend/coffeeRetrieveStatus")
                .then(function (response) {
                    data = response.data
                })
            this.setState({status: data.status, substatus: data.substatus})
        } catch(err) {
            console.log(err)
        }
    };

    render() {
        return (
            <div className={"mainCoffee"}>
                <h1>Is Leo at Think Coffee?</h1>
                <div className={"statusContainerCoffee"}>
                    {this.state.mobile ?
                        <div>
                            <Container status={this.state.status} substatus={this.state.substatus} textAndColor={'Yes'}/>
                            <Container status={this.state.status} substatus={this.state.substatus} textAndColor={'En Route'}/>
                            <Container status={this.state.status} substatus={this.state.substatus} textAndColor={'No'}/>
                        </div>
                        :
                        <div>
                            <Container status={this.state.status} substatus={this.state.substatus} textAndColor={''}/>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default CoffeeMain;