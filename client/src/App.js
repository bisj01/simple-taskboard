// /client/App.js
import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";

class App extends Component {
  // initialize our state 
  state = {
    data: [],
    id: 0,
    title: null,
    description: null,
    due_date: null,
    creator: null,
    assignee: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has 
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever 
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object 
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify 
  // data base entries

  // our first get method that uses our backend api to 
  // fetch data from our data base
  getDataFromDb = () => {
    fetch("http://localhost:3001/api/getCard")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  AddToDB = message => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("http://localhost:3001/api/putCard", {
      id: idToBeAdded,
      title: this.state.title,
      description: this.state.description
    });
  };


  // our delete method that uses our backend api 
  // to remove existing database information
  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat.id;
      }
    });

    axios.delete("http://localhost:3001/api/deleteCard", {
      data: {
        id: objIdToDelete
      }
    });
  };


  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    console.debug("ID" + idToUpdate);
    this.state.data.forEach(dat => {
      console.debug("Testing: " + dat);
      if (dat.id == idToUpdate) {
        console.debug("Found: " + dat.id);
        objIdToUpdate = dat.id;
        console.debug("objIdToUpdate:" + objIdToUpdate);
      }
    });

    axios.post("http://localhost:3001/api/updateCard", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };


  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen
  render() {
    const { data } = this.state;
    const children = data.map(dat => (
      <Card id={dat.id}
            title={dat.title}
            description={dat.description}/>
    ));
    return (
      <div>
        <ul>
          {data.length <= 0
            ? "NO DB ENTRIES YET"
            : children}
        </ul>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            onChange={e => this.setState({ title: e.target.value })}
            placeholder="Title"
            style={{ width: "200px" }}
          />
          <input
            type="text"
            onChange={e => this.setState({ description: e.target.value })}
            placeholder="Description"
            style={{ width: "200px" }}
          />
          <input
            type="text"
            onChange={e => this.setState({ due_date: e.target.value })}
            placeholder="Due Date"
            style={{ width: "200px" }}
          />
          <input
            type="Number"
            onChange={e => this.setState({ creator: e.target.value })}
            placeholder="Creator"
            style={{ width: "200px" }}
          />
          <input
            type="Number"
            onChange={e => this.setState({ assignee: e.target.value })}
            placeholder="Assignee"
            style={{ width: "200px" }}
          />
          <button onClick={() => this.AddToDB(this.state.message)}>
            ADD
          </button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
        </div>
      </div>
    );
  }
}

export default App;