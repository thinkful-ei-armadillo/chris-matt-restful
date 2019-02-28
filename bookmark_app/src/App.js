import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

class App extends Component {

  componentDidMount(){
    const BASE_URL = 'http://localhost:8000/bookmarks'
    fetch(BASE_URL)
      .then(res => {
        if(!res.ok)
          throw new Error(res.message)
        return res.json();
      })
      .then(data => console.log(data))
      .catch(err => console.error(err.message))
  }
  render() {
    return (
      <div className="App">
       Test 2
      </div>
    );
  }
}

export default App;
