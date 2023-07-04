import React from 'react';
import './../../styles.css';
import './../css/container.css';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.colors = {
            'Yes': 'backgroundGreenCoffee',
            'En Route': 'backgroundYellowCoffee',
            'No': 'backgroundRedCoffee',
            'None': 'backgroundGrayCoffee',
        }
    }

    render() {
        if (this.props.textAndColor !== '') {
            return (
                <div className={`containerCoffee ${this.props.status === this.props.textAndColor ? this.colors[this.props.textAndColor] : this.colors['None']}`}>
                    <p>{this.props.textAndColor}</p>
                    <p>{this.props.status === this.props.textAndColor && this.props.substatus}</p>
                </div>
            )
        }  else {
            return (
                <div className={`containerCoffee ${this.colors[this.props.status]}`}>
                    <p>{this.props.status}</p>
                    <p>{this.props.substatus}</p>
                </div>
            )
        }
    }
}

export default Container
