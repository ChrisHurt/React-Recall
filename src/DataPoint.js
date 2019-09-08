import React from 'react'
import './DataPoint.scss'
export default class DataPoint extends React.Component {

  state = {
    diameter: '150px',
    rotationAngle: '0',
    radialDisplacement: '0',
    transformOrigin: 'top left'
  }

  render(){
    const {diameter, transformOrigin} = this.state
    return (
      // Use the container and offset the child to rotate
      // the angular offset
      <div className="datapoint-rotation-container">
        <div 
          className="datapoint"
          style={{
            width: diameter,
            height: diameter,
            transformOrigin
            }}>
        </div>
      </div>
    )
  }
}