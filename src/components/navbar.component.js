import React from 'react'
import { Link } from 'react-router-dom'
import "./navbar.component.scss"
import axios from 'axios'

let domainName = 'https://react-recall-be.herokuapp.com'

export default class Navbar extends React.Component {


  logout = (e) => {
    axios.post(`${domainName}/logout`).then(()=>{
      this.props.updateUserID(undefined,'')
    })
  }

  render(){
    return (
      <nav style={{}}>
        {(this.props.user_id !== undefined) ? 
          (<div className='navbar'>
            <Link to="/React-Recall/data_collections/me" className="navbar-brand">React. Recall.</Link>
            <Link to="/React-Recall/data_collections/new" className="navbar-link">New Collection</Link>
            <Link to="/React-Recall/data_collections/me"  className="navbar-link">My Collections</Link>
            <button onClick={this.logout} className="logout-button">Logout <span>{this.props.username}</span></button>
          </div>)
          : ''}
      </nav>
    )
  }
}