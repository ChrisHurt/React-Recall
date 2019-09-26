import React from 'react'
import './loginregister.component.scss'
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

  render(){
    return (
      <div>I am All the data collections
        {this.renderRedirect()}
        {this.state.collections.map((collection,index)=> <div key={`collection${index}`}>{collection.collectionName}: {collection.collection_id}</div>)}
      </div>
    )
  }
}