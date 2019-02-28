import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Edit from './components/Edit';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bookmark: []
    }
  }
  componentDidMount() {
    const BASE_URL = 'http://localhost:8000/bookmarks'
    fetch(BASE_URL)
      .then(res => {
        if (!res.ok)
          throw new Error(res.message)
        return res.json();
      })
      .then(data => this.setState({ bookmark: data }))
      .catch(err => console.error(err.message))
  }

  render() {
    let results = this.state.bookmark.map(i => {
      return(
        <div key={i.id}>
        <Link to={`/bookmarks/${i.id}`}><h3>{i.title}</h3></Link>
        <p>{i.url}</p>
        <p>{i.description}</p>
        <p>{i.rating}</p>
        </div>
      )
    })


    return (
      <div className="App">
          <Route exact path='/bookmarks' render={() =>results} />
          <Route exact path='/bookmarks/:id' component={() => <Edit />} />
      </div>
    );
  }
}

export default App;
