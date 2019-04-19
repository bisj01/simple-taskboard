import React, { Component } from "react";

class Card extends Component {
  // initialize our state 
  state = {
    data: [],
    id: -1,
    title: null,
    description: null,
    due_date: null,
    creator: -1,
    assignee: -1
  };

  /*constructor(props) {
      super(props);
      this.setState({
          id: props.id,
          title: props.title,
          description: props.description,
          due_date: props.due_date,
          creator: props.creator,
          assignee: props.assignee,
      })
  }*/
  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has 
  // changed and implement those changes into our UI
  componentDidMount() {
  }

  // never let a process live forever 
  // always kill a process everytime we are done using it
  componentWillUnmount() {
  }

  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen
  render() {
    //const { data } = this.props;
    return (
      <div>
        <p>{this.props.id}</p>
        <p>{this.props.title}</p>
        <p>{this.props.description}</p>
        <p>{this.props.due_date}</p>
        <p>{this.props.creator}</p>
        <p>{this.props.assignee}</p>
      </div>
    );
  }
}

export default Card;