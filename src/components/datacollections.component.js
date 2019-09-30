import React from 'react'
import './datacollections.component.scss'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

let domainName = 'https://react-recall-be.herokuapp.com'

export default class DataCollections extends React.Component {

  state = {
    collections: [],
    metrics: {
      collectionName: '',
      worstRecall: '',
      averageRecall: '',
      bestRecall: ''
      //  this.props.recentSession.collectionName ? `Recently Guessed ${this.props.recentSession.correctGuesses} of ${this.props.recentSession.correctGuesses + this.props.recentSession.incorrectGuesses} Correctly.` : ''
    },
    redirectURL: {},
    loading: true,
    firstLoad: true,
    expandedCollection: {
      key: null,
      data: [] // populate with imageurl's
    }
  }

  componentDidMount = () => {
      axios.post(`${domainName}/datacollections`,{user_id: this.props.user_id})
    .then((res)=>{

        this.setState({
          // collections: res.data.map((dataCollection,index) => {
          //   return {
          //     collectionName: dataCollection.collectionName,
          //     collection_id: dataCollection._id,
          //     highlighted: false,
          //     index
          //   }
          // })
          collections: res.data.filter(dataCollection=>{
            if(dataCollection.dataPoints.length === 0){
              return false;
            }
            return true
          }).map((dataCollection,index) => {
            return {
              collectionName: dataCollection.collectionName,
              collection_id: dataCollection._id,
              highlighted: false,
              index
            }
          }),
          loading: false
        })
    }).catch(err=>console.log(`${err}`))
  }
  renderRedirectToPractice = () => {
    if(this.state.redirectURL.collectionID !== undefined && this.state.redirectURL.sessionID){
      return <Redirect to={`/React-Recall/practice/${this.state.redirectURL.collectionID}/${(this.state.redirectURL.sessionID) ? (this.state.redirectURL.sessionID) : ('new')}`}/>
    }
  }

  renderRedirect = () => {
    if(this.props.user_id === null || this.props.user_id === null){
      // return <Redirect to='/login'/>
      // window.location = '/login'
    }
  }

  beginGuessSession = (collection_id) => {
    // TODO
    // Make Axios Request here
    axios.post(`${domainName}/guess-sessions/data-collection/${collection_id}`,{user_id: this.props.user_id}).then((res)=>{
    
    let sessionID = null

    
      if(res.data.guessSession !== undefined && res.data.guessSession !== false){
        // set the session ID
        sessionID = res.data.guessSession._id
      }

      this.setState({
        redirectURL: {
          collectionID: collection_id,
          sessionID: sessionID
        }
      })
    })
  }

  updateSessionResults = () => {
    // if the session has just ended

    axios.post(`${domainName}/guess-sessions/recent-results`,{user_id: this.props.user_id})
    .then((res)=>{
      let correctGuesses = res.data.correct;
      let incorrectGuesses = res.data.incorrect;
      let collectionName = res.data.collectionName;

      if(this.state.firstLoad && correctGuesses && incorrectGuesses && collectionName){
        this.setState({
          metrics: {
            collectionName: collectionName,
            bestRecall: '',
            averageRecall: `Recently Guessed ${correctGuesses} of ${correctGuesses + incorrectGuesses} Correctly.`,
            worstRecall: ``
          },
          firstLoad: false
        })
      }
    })

  }

  getMetrics = (index,collection_id) => {
    axios.post(`${domainName}/datacollections/metrics/${collection_id}`,{user_id: this.props.user_id})
    .then((res)=>{

      this.setState({
        collections: this.state.collections.map(collection=>{
  
          let isHighlighted = false
          if(collection.index === index){
            isHighlighted = true
          }
  
          return {
            collectionName: collection.collectionName,
            collection_id: collection.collection_id,
            highlighted: isHighlighted,
            index: collection.index
          }
        }),
        metrics: {
          collectionName: this.state.collections.filter((collection)=>collection.index === index)[0].collectionName,
          bestRecall: (res.data.worstRecall.averageRecall > res.data.bestRecall.averageRecall) ? '' : `Best Recall : ${res.data.bestRecall.memoryText} ${res.data.bestRecall.averageRecall}%`,
          averageRecall: (res.data.worstRecall.averageRecall > res.data.bestRecall.averageRecall) ? 'No data available' : `Average Recall : ${res.data.averageRecall}%`,
          worstRecall: (res.data.worstRecall.averageRecall > res.data.bestRecall.averageRecall) ? '' : `Worst Recall : ${res.data.worstRecall.memoryText} ${res.data.worstRecall.averageRecall}%`
        }
      })
    }).catch(err=>console.log(`${err}`))
    this.setState({
      metrics: {
        collectionName: 'Loading...',
        worstRecall: '',
        averageRecall: '',
        bestRecall: ''
      }
    })
  }

  render(){
    return (
      <div>
        {this.renderRedirect()}
        {this.renderRedirectToPractice()}
        {this.updateSessionResults()}
        <div className="metrics-display">
          <div style={(this.state.metrics.collectionName) ? ({}): ({padding: 0})} className="recall recall-title">{(this.state.metrics.collectionName) ? (this.state.metrics.collectionName.toUpperCase()) : ('')}</div>
          <div style={(this.state.metrics.collectionName && this.state.metrics.averageRecall) ? ({}): ({padding: 0})} className="recall">{(this.state.metrics.averageRecall)}</div>
          <div style={(this.state.metrics.collectionName && this.state.metrics.averageRecall) ? ({}): ({padding: 0})} className="recall">{this.state.metrics.bestRecall}</div>
          <div style={(this.state.metrics.collectionName && this.state.metrics.averageRecall) ? ({}): ({padding: 0})} className="recall">{this.state.metrics.worstRecall}</div>
        </div>
        {this.state.collections.length === 0 && !this.state.loading  ? <div className="make-collection-link-container"><Link className="make-collection-link" to='/React-Recall/data_collections/new'> Make a collection! </Link></div> : ''}
        <div className="collections-wrapper">
          {this.state.collections.map((collection,index)=>
          <div key={`collection${index}`} className={`data-collection ${(collection.highlighted) ? ('highlighted-collection') : ('')}`} >
            <div className="data-collection-name">
              <div>{collection.collectionName}</div>
              <i className="fas fa-chevron-down"></i>
            </div>

            <div onClick={()=>this.getMetrics(index,collection.collection_id)} className={`data-collection-metrics`}>
              <div>Metrics</div>
              <i className="fas fa-chart-line"></i>
            </div>
            
            <div onClick={()=>this.beginGuessSession(collection.collection_id)} className="practice">
              <div>Practice</div>
              <i className="fas fa-dumbbell"></i>
            </div>
          </div>
          )}
        </div>
      </div>
    )
  }
}