import React from 'react'
import './datacollections.component.scss'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

export default class DataCollections extends React.Component {

  state = {
    collections: [],
    metrics: {},
    redirectURL: {},
    loading: true
  }

  componentDidMount = () => {
      axios.post(`http://localhost:5000/datacollections`,{user_id: this.props.user_id})
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
    if(this.state.redirectURL.collectionID !== undefined){
      return <Redirect to={`/practice/${this.state.redirectURL.collectionID}/${(this.state.redirectURL.sessionID) ? (this.state.redirectURL.sessionID) : ('new')}`}/>
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
    axios.post(`http://localhost:5000/guess-sessions/data-collection/${collection_id}`,{user_id: this.props.user_id}).then((res)=>{
    
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

  getMetrics = (index,collection_id) => {
    axios.post(`http://localhost:5000/datacollections/metrics/${collection_id}`,{user_id: this.props.user_id})
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
          bestRecall: (res.data.worstRecall.averageRecall > res.data.bestRecall.averageRecall) ? 'No data available' : `Best Recall : ${res.data.bestRecall.memoryText} ${res.data.bestRecall.averageRecall}%`,
          averageRecall: (res.data.worstRecall.averageRecall > res.data.bestRecall.averageRecall) ? '' : `Average Recall : ${res.data.averageRecall}%`,
          worstRecall: (res.data.worstRecall.averageRecall > res.data.bestRecall.averageRecall) ? '' : `Worst Recall : ${res.data.worstRecall.memoryText} ${res.data.worstRecall.averageRecall}%`
        }
      })
    }).catch(err=>console.log(`${err}`))
  }

  render(){
    return (
      <div>
        {this.renderRedirect()}
        {this.renderRedirectToPractice()}
        <div className="metrics-display">
          <div style={(this.state.metrics.collectionName) ? ({}): ({padding: 0})} className="recall recall-title">{(this.state.metrics.collectionName) ? (this.state.metrics.collectionName.toUpperCase()) : ('')}</div>
          <div style={(this.state.metrics.collectionName) ? ({}): ({padding: 0})} className="recall">{(this.state.metrics.averageRecall)}</div>
          <div style={(this.state.metrics.collectionName) ? ({}): ({padding: 0})} className="recall">{this.state.metrics.bestRecall}</div>
          <div style={(this.state.metrics.collectionName) ? ({}): ({padding: 0})} className="recall">{this.state.metrics.worstRecall}</div>
        </div>
        {this.state.collections.length === 0 && !this.state.loading  ? <div className="make-collection-link-container"><Link className="make-collection-link" to='/data_collections/new'> Make a collection! </Link></div> : ''}
        {this.state.collections.map((collection,index)=>
        <div key={`collection${index}`} className={`data-collection ${(collection.highlighted) ? ('highlighted-collection') : ('')}`} >
          <div className="data-collection-name">{collection.collectionName}</div>

          <div onClick={()=>this.getMetrics(index,collection.collection_id)} className={`data-collection-metrics`}>
            Metrics
            {/* <div className="recall-data">
              <div>Worst Recall:</div>
              <div>{`${this.findWorstMemoryTextOfCollection(collection.collection_id)}: ${this.findWorstRecallOfCollection(collection.collection_id)}%`}</div>
            </div> */}
            {/* <div className="recall-data">
              <div>Best Recall:</div>
              <div></div>
            </div> */}
            {/* <div className="recall-data">
              <div>Average Recall:</div>
              <div></div>
            </div> */}
          </div>
          
          <div onClick={()=>this.beginGuessSession(collection.collection_id)} className="practice">Practice</div>
        </div>
        )}
      </div>
    )
  }
}