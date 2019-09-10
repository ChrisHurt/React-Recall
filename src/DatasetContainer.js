import React from 'react'
import './DatasetContainer.scss'
import DataPoint from './DataPoint'

var revolution = 360
var degToRads = Math.PI/180
var radsToDegs = 180/Math.PI

export default class DatasetContainer extends React.Component {

  state = {
    diameter: this.props.diameter,
    subCircleDiameter: this.props.diameter *2* (1 - ((1)/(1 + Math.sin(degToRads*((revolution / Object.entries(this.props.data).length))/2)))),
    data: this.props.data,
    circleDiameters: [],
    largestDiameter: 0
  }

  seedData = (numDataPoints) => {
    let seed = {}
    for(let i = 0; i < numDataPoints; i++){
      seed[i] = i;
    }
    return seed
  }

  calculateDataNeededForSecondRing = (innerDiameter) =>{
    return Math.ceil(180 / (radsToDegs * Math.asin((1)/(1+ (innerDiameter)/(this.state.subCircleDiameter/2) ))))
  }

  calculateSubCircleRadialDisplacement = (outerDiameter, data) => {
    return ((outerDiameter)/(Math.sin(degToRads*this.calculateSubCircleFullAngle(data)/2)+1))
  }

  calculateSubCircleFullAngle = (data) => {
    return (revolution / Object.entries(data).length)
  }

  calculateNewOuterDiameter = (fixedSubCircleRadius,numDataPoints) => {
    return fixedSubCircleRadius * (1 + (1)/(Math.sin(degToRads * ((revolution/2)/numDataPoints))))
  }

  calculateSubCircleRotationAngle = (rotationCoefficient,data) => {
    return Number(rotationCoefficient * this.calculateSubCircleFullAngle(data))
  }

  calculateSubCircleDiameter = (outerDiameter, data) => {
    return outerDiameter * 2*(1 - ((1)/(1 + Math.sin(degToRads*(this.calculateSubCircleFullAngle(data))/2))))
  }

  calculateNewRadialDisplacement = (fixedSubCircleRadius,numDataPoints) => {
    return this.calculateNewOuterDiameter(fixedSubCircleRadius,numDataPoints) - fixedSubCircleRadius
  }

  renderContainerCircle = (diameter,backgroundColor,transformOffset,zIndex) => {
    return(
      <div 
        className="DS-container"
        style={{
          width: 2*diameter,
          height: 2*diameter,
          backgroundColor,
          transform: `translate(${(transformOffset)}px,${transformOffset}px)`,
          zIndex: (zIndex || '0')
        }}
      >
      </div>
    )
  }

  renderCircleRing = (diameter,data,transformOffset,fixedDiameter) =>{
    return (
      <div>
        {Object.entries(data).map((person,index)=>{
            return <DataPoint
              key={`dp-${index}`}
              parentDiameter={diameter}
              diameter={(fixedDiameter || this.calculateSubCircleDiameter(diameter,data))}
              rotationAngle={this.calculateSubCircleRotationAngle(index,data)}
              radialDisplacement={(this.calculateNewRadialDisplacement(fixedDiameter/2,Object.entries(data).length) || this.calculateSubCircleRadialDisplacement(diameter,data))}
              text={person[0]}
              image_url={person[1]}
              transformOffset={transformOffset}
            />          
          })}
      </div>
    ) 
  }

  // TODO: Component Design Workflow
    // Break down data object into at most 3 tiers of sub-data objects
      // Use array of data objects to achieve rendering
      // One object per tier
    // Could use recursive logic to calculate
      // successive layers of diameters
    // Consider separating functions into a calculations js file
      // for jest test automation and for a better separation of concerns

    // For fully automated rendering
      // 1. Calculate all tier diameters & data distribution
      // 2. Store the largest diameter in the state
        // a. Use this for transform offset calculations
      // 3. Iterate through each data tier
        // a. Render each background circle
        // b  Render each ring of sub-circles
          // Use the sub-data for datapoint position & size
          // Use the global largestDiameter to correctly calculate offsets
            // i.e. transformOffset = largestDiameter - thisDiameter


  render(){
    const {
      diameter,
      data,
      subCircleDiameter
    } = this.state
    return (
      <div 
        className="DS-offset"
        style={{}}
      >
          {
            this.renderCircleRing(
              diameter,
              data,
              (
                this.calculateNewOuterDiameter(
                  subCircleDiameter / 2,
                  this.calculateDataNeededForSecondRing(diameter)
                ) - diameter
              )
            )
          }
          {
            this.renderCircleRing(
              this.calculateNewOuterDiameter(
                subCircleDiameter / 2,
                this.calculateDataNeededForSecondRing(diameter)
              ),
              this.seedData(this.calculateDataNeededForSecondRing(diameter)),
              0,
              subCircleDiameter
            )
          }
          {/* 3rd tier example - using nested calls of last diameter */}
          {
            this.renderCircleRing(
              this.calculateNewOuterDiameter(
                subCircleDiameter / 2,
                this.calculateDataNeededForSecondRing(this.calculateNewOuterDiameter(
                  subCircleDiameter / 2,
                  this.calculateDataNeededForSecondRing(diameter)
                ))
              ),
              this.seedData(this.calculateDataNeededForSecondRing(this.calculateNewOuterDiameter(
                subCircleDiameter / 2,
                this.calculateDataNeededForSecondRing(diameter)
              ))),
              -this.calculateNewOuterDiameter(
                subCircleDiameter / 2,
                this.calculateDataNeededForSecondRing(diameter)
              )+diameter,
              subCircleDiameter
            )
          }
          {/* 3rd tier example - using nested calls of last diameter */}
          {
            this.renderContainerCircle(
              diameter,
              'blue',
              (
                this.calculateNewOuterDiameter(
                  subCircleDiameter / 2,
                  this.calculateDataNeededForSecondRing(diameter)
                )-diameter
              )
            )
          }
          {
            this.renderContainerCircle(
              this.calculateNewOuterDiameter(
                subCircleDiameter / 2,
                this.calculateDataNeededForSecondRing(diameter)
              )
              ,
              'yellowgreen',
              0,
              -1
            )
          }
      </div>
    )
  }
}