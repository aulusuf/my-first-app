import React from 'react';
import Header from './components/Header'
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class App extends React.Component {
    state = {
        value: '',
        toDoList: [
            {
                id: 1,
                description: "Do Something Stupid",
                done: false
            },
            {
                id: 2,
                description: "Learn Something Better",
                done: false
            },
            {
                id: 3,
                description: "Diam mengatasi pandemi, bergerak menguasai mid",
                done: true
            }
        ]
    }

    async handleClickChange(e) {
        this.setState({value: e.target.value})
    }

    async tambahToDo(e) {
        const { value, toDoList } = this.state;
        let temp = toDoList.slice();
        temp = [...toDoList, { id: toDoList.length+1, description: value}];
        this.setState({value:"", toDoList: temp})
        e.preventDefault();
    }
    
    async toDoListDone(item) {
        const { toDoList } = this.state;
        let mapped = toDoList.map((el) => {
            return el.id === item.id ? {...el, done: !el.done } : el;
        })
        this.setState({toDoList: mapped})
    }
    
    async deleteToDo(item) {
        const {toDoList} = this.state;
        let filter = toDoList.filter(el => el.id !== item.id)
        this.setState({toDoList:filter})
    }

    render() {
        const {value, toDoList} = this.state;
        return (
            <Router>
            <div>
                <Header title="To Do List" />
                <form class="px-5 py-5 border border-1" onSubmit = {(e) => this.tambahToDo(e)}>
                    <div class="mb-3 text-center">
                    <label for="toDoList" class="d-flex flex-row justify-content-center mb-3">Your new To Do</label>
                    <input
                        value = {value}
                        type="text"
                        class="p-3 rounded border-primary border-1 col-5 text-center"
                        onChange = {(e) => this.handleClickChange(e)}
                        placeholder = 'Enter your next To Do'
                        required/>
                    </div>
                    <div class="invalid-feedback">
                        Please provide a valid city.
                    </div>
                    <div class="d-flex justify-content-center">
                    <button class="btn btn-primary ">Tambahkan</button>
                    </div>
                </form>
                {toDoList.map((item) => {
                    return (
                        <div class="d-flex flex-row justify-content-center">
                            <div
                                style={{backgroundColor: item.done ? 'silver': 'cornsilk'}}
                                class="col-4 d-px-3 py-3 my-3 text-center">
                                <p>{item.description}</p>
                                <div class="border-top border-1 pt-3 d-flex justify-content-center">
                                    <button class='btn btn-outline-success mx-2' onClick = {() => this.toDoListDone(item)}>
                                        <div key = {item.id}  >
                                            <i class="fa fa-check"></i>
                                        </div>
                                    </button>
                                    <button class='btn btn-outline-danger mx-2' onClick = {() => this.deleteToDo(item)}>
                                            <div key = {item.id}  >
                                                <i class="fa fa-trash"></i>
                                            </div>
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    )
                })}
            </div>
            </Router>
        )
    }
}


export default App;
