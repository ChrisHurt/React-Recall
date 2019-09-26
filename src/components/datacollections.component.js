import React from 'react'
import './datacollections.component.scss'
import axios from 'axios'
// import { Redirect } from 'react-router-dom'

export default class DataCollections extends React.Component {

  state = {
    collections: []
  }

  // updateCollections = () => {
  //   // find all the collections belonging to me...
  //   axios.get('/datacollections').then((res)=>{
  //     console.log('axios time!')
  //     console.log(res.data)

  //       // return res.data.map(dataCollection => {
  //       //   return {
  //       //     collectionName: dataCollection.collectionName,
  //       //     collection_id: dataCollection._id
  //       //   }
  //       // })
  //   })
  // }

  componentDidMount = () => {
      axios.post(`http://localhost:5000/datacollections`,{user_id: this.props.user_id})
    .then((res)=>{
      console.log('axios time!')
      console.log(res.data)

        this.setState({
          collections: res.data.map(dataCollection => {
            return {
              collectionName: dataCollection.collectionName,
              collection_id: dataCollection._id
            }
          })
        })
    }).catch(err=>console.log(`${err}`))
  }

  renderRedirect = () => {
    if(this.props.user_id === null || this.props.user_id === null){
      // return <Redirect to='/login'/>
      window.location = '/login'
    }
  }

  findWorstRecallInCollection = () => {
    return 'worst'
  }

  findBestRecallInCollection = () => {
    return 'best'
  }

  findAverageRecallInCollection = () => {
    return 'average-st'
  }

  render(){
    return (
      <div>
        {this.renderRedirect()}
        {this.state.collections.map((collection,index)=>
        <div key={`collection${index}`} className="data-collection">
          <div className="data-collection-name">{collection.collectionName}</div>
          <div className="data-collection-metrics">
            <div className="recall-data">
              <div>Worst Recall:</div>
              <div>{this.findWorstRecallInCollection()}</div>
            </div>
            <div className="recall-data">
              <div>Best Recall:</div>
              <div>{this.findBestRecallInCollection()}</div>
            </div>
            <div className="recall-data">
              <div>Average Recall:</div>
              <div>{this.findAverageRecallInCollection()}</div>
            </div>
          </div>
          <div className="practice">Practice{/*collection.collection_id*/}</div>
        </div>
        )}
      </div>
    )
  }
}