import React from 'react'
import './DatasetContainer.scss'
import DataPoint from './DataPoint'

// Tier One - max size: 8
// As data exceeds this boundary
// 1. assume the same sub-circle diameter data points
// 2. Trial two 2nd concentric ring approaches 
  // Fill the nearest larger diameter with an
    // integer number of sub-circles using max-8
  // Reduce the number in the inner circle
    // then do as before

var revolution = 360
var degToRads = Math.PI/180

export default class DatasetContainer extends React.Component {

  state = {
    diameter: this.props.diameter,
    data: this.props.data
  }

  calculateSubCircleRadialDisplacement = (outerDiameter, data) => {
    return ((outerDiameter)/(Math.sin(degToRads*this.calculateSubCircleFullAngle(data)/2)+1))
  }

  calculateSubCircleFullAngle = (data) => {
    return (revolution / Object.entries(data).length)
  }
  calculateSubCircleRotationAngle = (rotationCoefficient,data) => {
    return Number(rotationCoefficient * this.calculateSubCircleFullAngle(data))
      // * degreesPerCircle * index)
  }

  calculateSubCircleDiameter = (outerDiameter, data) => {
    return outerDiameter * 2*(1 - ((1)/(1 + Math.sin(degToRads*(this.calculateSubCircleFullAngle(data))/2))))
  }

  renderContainerCircle = (diameter,backgroundColor, transformOffset) => {
    return(
      <div 
        className="DS-container"
        style={{
          width: diameter,
          height: diameter,
          backgroundColor,
          transform: `translate(${(transformOffset)}px,${transformOffset}px)`
        }}
      >
      </div>
    )
  }

  renderCircleRing = (diameter,data,transformOffset) =>{
    return (
      <div>
        {Object.entries(data).map((person,index)=>{
            return <DataPoint
              key={`dp-${index}`}
              parentDiameter={diameter}
              diameter={this.calculateSubCircleDiameter(diameter,data)}
              rotationAngle={this.calculateSubCircleRotationAngle(index,data)}
              radialDisplacement={this.calculateSubCircleRadialDisplacement(diameter,data)}
              text={person[0]}
              image_url={person[1]}
              transformOffset={transformOffset}
            />          
          })}
      </div>
    ) 
  }

  render(){
    const {
      diameter,
      data
    } = this.state
    return (
      <div 
        className="DS-offset"
        style={{}}
      >
        <div className="flex-wrapper">
          {this.renderContainerCircle(3*diameter, 'yellowgreen',0)}
          {this.renderContainerCircle(2*diameter, 'blue',diameter/2)}
          {this.renderCircleRing(diameter,data,diameter/2)}
          {this.renderCircleRing(1.5* diameter,data,0)}
        </div>
      </div>
    )
  }
}