import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MainPage extends Component {

  constructor(props){
    super(props);

    this.state ={

    }
  }

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

  render(){
    return(
      <div>test</div>
    )
  }
}