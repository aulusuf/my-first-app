import React from 'react';

import './App.css';

class App extends React.Component {
    state = {
        value: '',
        movie: [
            {
                id: 1,
                title: "Midsomar",
                done: false
            },
            {
                id: 2,
                title: "Truseg",
                done: true
            },
            {
                id: 1,
                title: "Midsomar",
                done: false
            }
        ]
    }

    async handleClickChange(e) {
        this.setState({value: e.target.value})
    }

    async handleSubmit(e) {
        const { value, movie } = this.state;
        let temp = movie.slice();
        temp = [...movie, { id: movie.length+1, title: value, done: false}];
        this.setState({value:"", movie: temp})
        e.preventDefault();
    }
    
    async listWatched(item) {
        const { movie } = this.state;
        let mapped = movie.map((el) => {
            return el.id === item.id ? {...el, done: !el.done } : el;
        })
        this.setState({movie: mapped})
    }

    async componentDidMount() {
        console.log("test")
        this.setState({ isLoading: true })
    }

    async handleChange(e) {
        this.setState({ value: e.target.value})
    }

    async fetchData() {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then((json) => {
                this.state({userList:json})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        const {value, movie} = this.state;
        return (
            <div class="row">
                <form onSubmit = {(e) => this.handleSubmit(e)}>
                    <input
                        value = {value}
                        type = 'text'
                        onChange = {(e) => this.handleClickChange(e)}
                        placeholder = 'enter movie title'
                    />
                    <button>Submit</button>
                </form>
                {movie.map((item) => {
                    return (
                        <div key={item.id} onClick={() => this.listWatched(item)} style={{ cursor: "pointer"}}>
                            <p>{item.title}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}


export default App;
