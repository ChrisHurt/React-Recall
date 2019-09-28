import React from 'react'
import { Link } from 'react-router-dom'
import "./navbar.component.scss"
import axios from 'axios'

export default class Navbar extends React.Component {

  logout = (e) => {
    // e.preventDefault()
    axios.post('http://localhost:5000/logout').then(()=>{
      this.props.updateUserID(undefined)
      // window.location = '/login'
    })
  }

  render(){
    return (
      <nav style={{}}>
        {(this.props.user_id !== undefined) ? 
          (<div className='navbar'>
            <Link to="/data_collections/me" className="navbar-brand">React. Recall.</Link>
            <Link to="/data_collections/new" className="navbar-link">New Collection</Link>
            <Link to="/data_collections/me"  className="navbar-link">My Collections</Link>
            <button onClick={this.logout} className="logout-button">Logout</button>
          </div>)
          : ''}
      </nav>
    )
  }
}