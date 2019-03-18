import React, {Component} from 'react';
import './App.css';

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
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8080/getCheckList",
            {
                method: "GET"
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    items: data.items
                });
            })
    }

    handleCheckboxChange(id) {
        fetch("http://localhost:8080/updateStatus?id=" + id,
            {
                method: "POST"
            }
        )
        .then(function (response) {
            return response.json();
        })
        .then((data) => {
            this.setState({
                items: data.items
            });
        });
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

    handleDelete(id) {
        fetch("http://localhost:8080/deleteItem?id=" + id,
            {
                method: "POST"
            }
        )
        .then(function (response) {
            return response.json();
        })
        .then((data) => {
            this.setState({
                items: data.items
            });
        });
    }

    handleSubmit() {
        fetch("http://localhost:8080/addItem?name=" + this.state.newItemName + '&description=' + this.state.newItemDescription, {method: "POST"});
    }

    render() {
        let items = [];
        let completedItems = [];
        let index = 0;

        this.state.items.map((item) => {
            if (item.completed === false) {
                items.push(
                    <CheckListItem key={index}
                                   id={item.id}
                                   name={item.name}
                                   description={item.description}
                                   completed={item.completed}
                                   handleCheckboxChange={this.handleCheckboxChange.bind(this)}
                                   handleDelete={this.handleDelete.bind(this)}/>);
                index = index + 1;
            } else {
                completedItems.push(
                    <CompletedCheckListItem key={index}
                                            id={item.id}
                                            name={item.name}
                                            description={item.description}
                                            completed={item.completed}
                                            handleCheckboxChange={this.handleCheckboxChange.bind(this)}
                                            handleDelete={this.handleDelete.bind(this)}/>);
                index = index + 1;
            }
        });

        return (
            <div>
                <h1> To-Do List </h1>
                <table id="CheckListTable" className="table-bordered" border="1">
                    <thead>
                    <tr>
                        <th id="status">Status</th>
                        <th id="name">Name</th>
                        <th id="description">Description</th>
                        <th id="delete button"></th>
                    </tr>
                    </thead>
                    <tbody className="tbody">
                    {items}
                    </tbody>
                </table>

                <h3> Completed Items </h3>
                <table id="CompletedCheckListTable" className="table-bordered" border="1">
                    <thead>
                    <tr>
                        <th id="status">Status</th>
                        <th id="name">Name</th>
                        <th id="description">Description</th>
                        <th id="delete button"></th>
                    </tr>
                    </thead>
                    <tbody className="tbody">
                    {completedItems}
                    </tbody>
                </table>

                <h3> Add New Item </h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input id="newItemName" type="text" value={this.state.newItemName}
                               onChange={this.handleNameChange} required={true}/>
                    </label>
                    <label>
                        Description:
                        <input id="newItemDescription" type="text" value={this.state.newItemDescription}
                               onChange={this.handleDescriptionChange} required={true}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

class CheckListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            completed: this.props.completed
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
    }

    changeHandler() {
        this.setState({
            completed: true
        });
        this.props.handleCheckboxChange(this.props.id);
    }

    deleteHandler() {
        this.setState({
            deleted: true
        });
        this.props.handleDelete(this.props.id)
    }

    render() {
        return (
            <tr>
                <td>
                    <input id="completed" type="checkbox" checked={this.state.completed ? 'checked' : ''}
                           value={this.state.completed}
                           onChange={this.changeHandler}/>
                </td>
                <td>{this.props.name}</td>
                <td>{this.props.description}</td>
                <td>
                    <button onClick={this.deleteHandler}>
                        Delete
                    </button>
                </td>
            </tr>
        )
    }
}

class CompletedCheckListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            completed: this.props.completed,
            deleted: false
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
    }

    changeHandler() {
        this.setState({
            completed: false
        });
        this.props.handleCheckboxChange(this.props.id);

    }

    deleteHandler() {
        this.setState({
            deleted: true
        });
        this.props.handleDelete(this.props.id)
    }

    render() {
        return (
            <tr>
                <td>
                    <input id="completed" type="checkbox" checked={this.state.completed ? 'checked' : ''}
                           value={this.state.completed}
                           onChange={this.changeHandler}/>
                </td>
                <td>{this.props.name}</td>
                <td>{this.props.description}</td>
                <td>
                    <button onClick={this.deleteHandler}>
                        Delete
                    </button>
                </td>
            </tr>
        )
    }
}

export default App;
