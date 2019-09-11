import React from 'react'
import './DataPoint.scss'
export default class DataPoint extends React.Component {

  state = {
    parentDiameter: this.props.parentDiameter,
    diameter: this.props.diameter,
    rotationAngle: this.props.rotationAngle,
    radialDisplacement: this.props.radialDisplacement,
    transformOrigin: this.props.transformOrigin,
    transformOffset: (this.props.transformOffset),
    text: (this.props.text),
    image_url: (this.props.image_url)
  }

  render(){
    
    const {
      parentDiameter,
      diameter,
      radialDisplacement,
      rotationAngle,
      transformOffset,
      text,
      image_url
    } = this.state
    
    return (
      <div className="datapoint-rotation-container"
        style={
          {
            width: `${radialDisplacement}px`,
            transform: `translate(${parentDiameter + transformOffset}px,${parentDiameter + transformOffset}px) rotate(${rotationAngle}deg)`,
            transformOrigin: 'left center',
            height: 0,
            zIndex: '5'
          }
        }
      >
        <img 
          className="datapoint"
          src={image_url}
          style={
            {
              width: `${diameter}px`,
              height: `${diameter}px`,
              transform: `translate(${radialDisplacement - (diameter / 2)}px,${-diameter / 2}px) rotate(-${rotationAngle}deg)`,
              zIndex: '3'
            }
          }
        />
        {/* </div> */}
      </div>
    )
  }
}