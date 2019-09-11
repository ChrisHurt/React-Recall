import React from 'react'
import './DatasetContainer.scss'
import DataPoint from './DataPoint'
import CircleCalculations from './circleCalculations'

var tierSizes = [8,15,22]

export default class DatasetContainer extends React.Component {

  state = {
    diameter: this.props.diameter,
    // subCircleDiameter: CircleCalculations.calculateSubCircleDiameter(this.props.diameter,this.props.data),
    subCircleDiameter: CircleCalculations.calculateSubCircleDiameter(this.props.diameter,(CircleCalculations.circleTiers(this.props.data,this.props.diameter)[0]['data'])),
    data: this.props.data,
    circleTiers: CircleCalculations.circleTiers(this.props.data,this.props.diameter),
    largestDiameter: CircleCalculations.largestDiameter(this.props.data,this.props.diameter)
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

  renderCircleRing = (diameter,data,transformOffset,fixedDiameter,tierIndex) =>{
    return (
      <div>
        {Object.entries(data).map((person,index)=>{
            return <DataPoint
              key={`dp-${index}`}
              parentDiameter={diameter}
              diameter={(fixedDiameter || CircleCalculations.calculateSubCircleDiameter(diameter,data))}
              rotationAngle={CircleCalculations.calculateSubCircleRotationAngle(index,data)}
              radialDisplacement={(CircleCalculations.calculateNewRadialDisplacement(fixedDiameter/2,tierSizes[tierIndex]) || CircleCalculations.calculateSubCircleRadialDisplacement(diameter,data))}
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
        // Consider calculating as a ratio
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
      subCircleDiameter,
      circleTiers,
      largestDiameter
    } = this.state
    return (
      <div 
        className="DS-offset"
        style={{}}
      >
        
        {circleTiers.map((circleTier,index)=>{
          return (<div key={`CircleTier: ${index}`}>
            {/* Render Circle Ring */}
            {
              this.renderCircleRing(
                circleTier.outerDiameter,
                circleTier.data,
                largestDiameter - circleTier.outerDiameter,
                // subCircleDiameter
                (Object.keys(circleTier.data).length != tierSizes[index] && index!==0) ? (subCircleDiameter) : (null),
                (Object.keys(circleTier.data).length != tierSizes[index] && index!==0) ? (index) : (null)
              )
            }
            {/* Render Circle Backgrounds */}
            {
              this.renderContainerCircle(
                circleTier.outerDiameter,
                'blue',
                (
                  largestDiameter - circleTier.outerDiameter
                )
              )
            }
          </div>
          )
        })}
      </div>
    )
  }
}