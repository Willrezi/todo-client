import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    title: "",
    tasks: []
  };

  refreshTask = () => {
    axios.get("http://localhost:3000/").then(response => {
      this.setState({ tasks: response.data });
      console.log(response.data);
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    const { title } = this.state;
    event.preventDefault();

    axios
      .post("http://localhost:3000/create", {
        title: title
      })
      .then(response => {
        {
          this.refreshTask();
        }
      });
  };

  render() {
    return (
      <div className="container">
        <h1>To-Do list</h1>
        <div>
          <ul>
            {this.state.tasks.map(task => {
              return (
                <li key={task._id}>
                  <span
                    onClick={() => {
                      axios
                        .post("http://localhost:3000/delete", {
                          id: task._id
                        })
                        .then(response => {
                          axios.get("http://localhost:3000/").then(response => {
                            this.setState({ tasks: response.data });
                            console.log(response.data);
                          });
                        });
                    }}
                  >
                    X{" "}
                  </span>
                  <span
                    //   className="update"
                    onClick={() => {
                      axios
                        .post("http://localhost:3000/update", {
                          id: task._id
                        })
                        .then(response => {
                          console.log(response.data);
                        });
                    }}
                  >
                    {task.title}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <form className="task-form" onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Titre"
            className="task-input"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <button className="task-button" type="submit">
            AJOUTER UNE TÂCHE
          </button>
        </form>
      </div>
    );
  }

  componentDidMount() {
    axios.get("http://localhost:3000/").then(response => {
      this.setState({ tasks: response.data });
      console.log(response.data);
    });
  }
}

export default App;
