import React, { Component }  from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const listTodos = `query listTodos {
  listTodos {
    items{
      id
      name
      description
    }
  }
}`;

const addTodo = `mutation createTodo($name:String! $description: String!) {
  createTodo(input:{
    name:$name
    description:$description
  }){
    id
    name
    description
  }
}`;

class App extends Component {

  todoMutation = async () => {
    const todoDetails = {
      name: 'Party tonight!',
      description: 'Amplify CLI rocks!'
    };

    const newTodo = await API.graphql(graphqlOperation(addTodo, todoDetails));
    alert(JSON.stringify(newTodo));
  };

  listQuery = async () => {
    console.log('listing todos');
    const allTodos = await API.graphql(graphqlOperation(listTodos));
    alert(JSON.stringify(allTodos));
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.listQuery}>GraphQL Query</button>
        <button onClick={this.todoMutation}>GraphQL Mutation</button>
      </div>
    );
  }
}

export default App;
