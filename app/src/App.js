import React, { Component } from 'react';
import './App.css';
const ReactDOM = require('react-dom');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {text: []};
    }

    componentDidMount() {
        fetch("http://localhost:8080/hello", {method: "GET"})
            .then(function(response){
                return response.text();
            })
            .then((data) => {
                this.setState({
                    text: data
                });
            })
    }

    render() {
        return (
            <div>{this.state.text}</div>
        )
    }
}

export default App;
