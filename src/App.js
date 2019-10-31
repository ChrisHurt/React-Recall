import React from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom"
import { Redirect } from 'react-router-dom'
import './reset.css';

import Navbar from "./components/navbar.component"
import DatasetContainer from './components/datasetcontainer.component'
import LoginRegisterForm from './components/loginregister.component'
import DataCollections from './components/datacollections.component'
import NewCollectionForm from './components/newcollectionform.component'

let dataset1 =  {    
    Placeholder: ''
}

class App extends React.Component {

  state = {
    user_id: undefined,
    username: ''
  }

  updateUserID = (newID,newUsername) => {
    if(!newUsername){
      newUsername = ''
    }
    this.setState({
      user_id: newID,
      username: newUsername
    })
  }

  renderLoginReturn = () => {
    if(this.state.user_id === undefined){
      return <Redirect to='/React-Recall/login' />
    }
  }

  render(){
    return (
      <Router>
        {this.renderLoginReturn()}
        <div 
          className="App"
          style = {{
            backgroundColor: '#D1E8E2'
          }}
        >
        <Navbar user_id={this.state.user_id} updateUserID={this.updateUserID} username={this.state.username}/>
        <Route path="/React-Recall/login" exact component={()=><LoginRegisterForm user_id={this.state.user_id} updateUserID={this.updateUserID}/>} />
          <Route path="/React-Recall/data_collections/me" exact component={() => <DataCollections user_id={this.state.user_id} />} />
          <Route path="/React-Recall/data_collections/new" exact component={()=><NewCollectionForm user_id={this.state.user_id} />} />
          <Route path="/React-Recall/practice/:collection_id/:session_id" component={
            ({match})=><DatasetContainer match={match} user_id={this.state.user_id} diameter={140} data={dataset1} parentWidth={100} parentHeight={100} parentWidthUnit={'vw'} parentHeightUnit={'vh'}/>
          }/>
  
        </div>
      </Router>
    );
  }
}

export default App;