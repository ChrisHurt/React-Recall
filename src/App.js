import React from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom"
import './reset.css';

import Navbar from "./components/navbar.component"
import DatasetContainer from './components/datasetcontainer.component'
import LoginRegisterForm from './components/loginregister.component'
import DataCollections from './components/datacollections.component'


// TODO
  // Hard-code all data and finish UI implementation
    // Move highlights to center
    // Allow User Input - Success or Failure
    // Remove highlighted data afterward
      // Store the data in correct & incorrect arrays inside the state 
  // Allow user input of photos & text through drag and drop logic
    // Force square input - stretch goal
      // By clipping or,
      // Rejecting non-square images
  // Manage user information through db
    // Initially use image urls
    // Implement Amazon S3 for drag & drop if there is time

let dataset1 =  {    
  Daniel: 'https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  Hinze: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
  Erik: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1404&q=80',
  Bater: 'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80',
  Sarah: 'https://images.unsplash.com/photo-1535324492437-d8dea70a38a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80',
  Gemima: 'https://images.unsplash.com/photo-1521252659862-eec69941b071?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80',
  Warren: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Mohammed: 'https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Drew: 'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Atikh: 'https://images.unsplash.com/photo-1471015060382-6cbd8b4e34d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Nguyen: 'https://images.unsplash.com/photo-1485361767769-5ceffc9f2144?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Andre: 'https://images.unsplash.com/photo-1491617636265-a676d2700d7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=60',
  // Allef: 'https://images.unsplash.com/photo-1485742032238-7543513eeba6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Carla: 'https://images.unsplash.com/photo-1552771390-bc65936fe55c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Ashley: 'https://images.unsplash.com/photo-1505841907000-5bf5e95cd105?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=60',
  // Madelaine: 'https://images.unsplash.com/photo-1546538994-4f15d0aa966f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Maura: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Sasha: 'https://images.unsplash.com/photo-1513732822839-24f03a92f633?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Jack: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Jessica: 'https://images.unsplash.com/photo-1532910404247-7ee9488d7292?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=60',
  // Hope: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Tobias: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Albert: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Denise: 'https://images.unsplash.com/photo-1486074051793-e41332bf18fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Michael: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=60',
  // Maddie: 'https://images.unsplash.com/photo-1531251445707-1f000e1e87d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Britney: 'https://images.unsplash.com/photo-1516756587022-7891ad56a8cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Eduardo: 'https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Gabbie: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Ophelia: 'https://images.unsplash.com/photo-1523661149972-0becaca2016e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Rachel: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Tobuscus: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=60',
  // Kimson: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Stefan: 'https://images.unsplash.com/photo-1506634572416-48cdfe530110?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // May: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Joe: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Tyler: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Brooke: 'https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Paolo: 'https://images.unsplash.com/photo-1500832333538-837287aad2b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Georgia: 'https://images.unsplash.com/photo-1496203695688-3b8985780d6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Mary: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Cristian: 'https://images.unsplash.com/photo-1511546395756-590dffdcdbd1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Ayo: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=60',
  // Ryan: 'https://images.unsplash.com/photo-1503593245033-a040be3f3c82?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
  // Michelle: 'https://images.unsplash.com/photo-1526080652727-5b77f74eacd2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60'


}

class App extends React.Component {

  state = {
    user_id: null
  }

  updateUserID = (newID) => {
    this.setState({
      user_id: newID
    })
  }

  render(){
    return (
      <Router>
        <div 
          className="App"
          style = {{
            backgroundColor: '#D1E8E2'
          }}
        >
        <Navbar updateUserID={this.updateUserID}/>
        <Route path="/login" exact component={()=><LoginRegisterForm user_id={this.state.user_id} updateUserID={this.updateUserID}/>} />
          <Route path="/data_collections/me" exact component={() => <DataCollections user_id={this.state.user_id} updateUserID={this.updateUserID}/>} />
  
          <Route path="/data_collections/:id/practice" exact component={
            ()=><DatasetContainer user_id={this.state.user_id} updateUserID={this.updateUserID} diameter={140} data={dataset1} parentWidth={100} parentHeight={100} parentWidthUnit={'vw'} parentHeightUnit={'vh'}/>
          }/>
  
  
  
        </div>
      </Router>
    );
  }
}

export default App;