import React, {Component} from 'react';
import './App.css';

const ReactDOM = require('react-dom');

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            newItemName: "",
            newItemDescription: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8080/getCheckList",
            {
                method: "GET"
            }
            )
            .then(function(response){
                return response.json();
            })
            .then((data) => {
                this.setState({
                    items: data.items
                });
            })
    }

    handleNameChange(event) {
        this.setState({
            newItemName: event.target.value
        });
    }

    handleDescriptionChange(event) {
        this.setState({
            newItemDescription: event.target.value
        });
    }

    handleSubmit() {
        fetch("http://localhost:8080/addListItem?name=" + this.state.newItemName + '&description=' + this.state.newItemDescription,
            {
                method: "POST",
            }
            )
            .then((responseText) => {
                alert(responseText);
            });
    }

    render() {
        let items = [];
        let index = 0;
            this.state.items.map((item) => {
                items.push(
                    <CheckListItem key={index}
                                   id={item.id}
                                   name={item.name}
                                   description={item.description}
                                   createdDate={item.createdDate}
                                   completed={item.completed.toString()}/> );
                index = index + 1;});


        return (
            <div>
                <table id="CheckListTable" className="table-bordered" border="1">
                    <thead>
                    <tr>
                        <th id="name">Name</th>
                        <th id="description">Description</th>
                        <th id="completed">Completed?</th>
                    </tr>
                    </thead>
                    <tbody className="tbody">
                        {items}
                    </tbody>
                </table>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input id="newItemName" type="text" value={this.state.newItemName} onChange={this.handleNameChange} required={true} />
                    </label>
                    <label>
                        Description:
                        <input id="newItemDescription" type="text" value={this.state.newItemDescription} onChange={this.handleDescriptionChange} required={true} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

// Represent a CheckListItemRow
class CheckListItem extends React.Component {

    constructor(props) {
        super(props);
        // this.handleDelete = this.handleDelete.bind(this);
    }

    // handleDelete() {
    //     this.props.onDelete(this.props.employee);
    // }

    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.description}</td>
                <td>{this.props.completed}</td>
            </tr>
        )
    }
}

// Represents the check list table
class CheckList extends React.Component {

    constructor(props) {
        super(props);
        // this.handleDelete = this.handleDelete.bind(this);
    }

    // handleAdd() {
    //     this.props.onDelete(this.props.employee);
    // }

    // listItems(props) {
    //     const numbers = props.numbers;
    //     const listItems = numbers.map((number) =>
    //         <li>{number}</li>
    //     );
    //     return (
    //         <ul>{listItems}</ul>
    //     );
    // }

    render() {
        return (
            <tr>
                <td>{this.props.items.id}</td>
                <td>{this.props.items.name}</td>
                <td>{this.props.items.description}</td>
                <td>{this.props.items.createdDate}</td>
                <td>{this.props.items.completed}</td>
                {/*<td>*/}
                {/*<button onClick={this.handleAdd}>Add</button>*/}
                {/*</td>*/}
            </tr>
        )
    }
}

export default App;
