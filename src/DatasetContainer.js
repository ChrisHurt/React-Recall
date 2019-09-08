import React from 'react'
import './DatasetContainer.scss'
import DataPoint from './DataPoint'
export default class DatasetContainer extends React.Component {

  state = {
    diameter: '300px'
  }

  render(){
    const {diameter} = this.state
    return (
      <div className="DS-offset">
        <div className="DS-container" style={{width: diameter, height: diameter}}>
        </div>
        <DataPoint/>
        <DataPoint/>
      </div>
    )
  }
}