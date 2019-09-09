import React from 'react'
import './DataPoint.scss'
export default class DataPoint extends React.Component {

  state = {
    parentDiameter: this.props.parentDiameter,
    diameter: this.props.diameter,
    rotationAngle: this.props.rotationAngle,
    radialDisplacement: this.props.radialDisplacement,
    transformOrigin: this.props.transformOrigin
  }

  render(){
    
    const { parentDiameter,
      diameter,
      radialDisplacement,
      rotationAngle,
      transformOrigin
    } = this.state
    
    return (
      <div className="datapoint-rotation-container"
      style={{
        width: `${radialDisplacement}px`,
        height: '1px',
        display: 'flex',
        transform: `translate(${parentDiameter / 2}px,${parentDiameter / 2}px) rotate(${rotationAngle}deg)`,
        transformOrigin,
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