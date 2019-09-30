import React from 'react'
import {Redirect} from 'react-router-dom'
import $ from 'jquery'
import axios from 'axios'
import './newcollectionform.component.scss'

let domainName = 'https://react-recall-be.herokuapp.com'

export default class NewCollectionForm extends React.Component {

  state = {
    collectionName: '',
    collectionID: '',
    memoryText: '',
    imageURL: '',
    diameter: 100,
    redirecting: false,
    message: ''
  }

  addToCollection = () => {
    // Make axios request to make new datapoint
    axios.post(`${domainName}/datacollections/${this.state.collectionID}/add`,
    {
      user_id: this.props.user_id,
      memoryText: this.state.memoryText,
      imageUrl: this.state.imageURL
    })
      .then(res=>{
        this.setState({
          memoryText: '',
          imageURL: '',
          message: `${this.state.memoryText } added to ${this.state.collectionName}`
        })
      })
  }

  prepareToSubmitCollection = () => {
    this.setState({
      redirecting: true
    })
  }

  submitCollection = () => {
    if(this.state.redirecting){
      return <Redirect to='/React-Recall/data_collections/me'/>
    }
  }

  onChangeMemoryText = (e) => {
    this.setState({
      memoryText: e.target.value
    })
  }

  onChangeImageURL = (e) => {
    this.setState({
      imageURL: e.target.value
    })
  }

  onChangeCollectionName = (e) =>{
    this.setState({
      collectionName: e.target.value
    })
  }

  collectionNameChosen = (e) => {
    e.preventDefault()
    // Make axios request to make new collection
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow"); 
    axios.post(`${domainName}/datacollections/add`,{user_id: this.props.user_id, collectionName: this.state.collectionName})
      .then(res=>{
        this.setState({
          collectionID: res.data.collection_id
        })
      })
  }

  render(){
    return (
      <div className="full-page">
        <div className={this.state.message ? 'user-feedback': ''}>
          {this.state.message}
        </div>
        <div className="login-page">
          {this.submitCollection()}
        <div className="form">
          <form className="register-form">
            <h3>{this.state.collectionName}</h3>
            <input
              type="text"
              placeholder="Memory text"
              name="memoryText"
              onChange={this.onChangeMemoryText}
              value={this.state.memoryText}
            />
            <input
              type="text"
              placeholder="Image URL"
              name="imageURL"
              onChange={this.onChangeImageURL}
              value={this.state.imageURL}
            />

            <div
              className="demo-container"
            >
              <div
                className="demo-datapoint"
                style={{
                  backgroundImage: `url(${this.state.imageURL})`,
                }}
              >

              </div>
            </div>

            <button
              type="button"
              onClick={this.addToCollection}
              style={{marginBottom: '1em'}}
            >
              Add To Collection
            </button>
            <button
              type="button"
              onClick={this.prepareToSubmitCollection}
            >
              Submit Collection
            </button>
          </form>
          <form className="login-form">
            <h3>New  Collection</h3>
            <input
              type="text"
              placeholder="Name your collection!"
              name="collectionName"
              onChange={this.onChangeCollectionName}
              value={this.state.collectionName}
            />
            <button
              type="button"
              onClick={this.collectionNameChosen}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
    )
  }
}