import React from 'react'
import './DataPoint.scss'
export default class DataPoint extends React.Component {

  state = {
    parentDiameter: this.props.parentDiameter,
    diameter: this.props.diameter,
    rotationAngle: this.props.rotationAngle,
    radialDisplacement: this.props.radialDisplacement,
    transformOrigin: this.props.transformOrigin,
    transformOffset: (this.props.transformOffset || 0)
  }

  render(){
    
    const {
      parentDiameter,
      diameter,
      radialDisplacement,
      rotationAngle,
      transformOffset
    } = this.state
    
    return (
      <div className="datapoint-rotation-container"
      style={{
        width: `${radialDisplacement}px`,
        transform: `translate(${parentDiameter + transformOffset}px,${parentDiameter + transformOffset}px) rotate(${rotationAngle}deg)`,
        transformOrigin: 'left center',
        zIndex: '5'
      }}>
        <div 
          className="datapoint"
          style={{
            width: `${diameter}px`,
            height: `${diameter}px`,
            transform: `translate(${radialDisplacement - (diameter / 2)}px,${-diameter / 2}px)`,
            zIndex: '1'
            }}>
        </div>
      </div>
    )
  }
}