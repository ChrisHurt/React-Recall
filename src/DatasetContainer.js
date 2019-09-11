import React from 'react'
import './DatasetContainer.scss'
import DataPoint from './DataPoint'
import CircleCalculations from './circleCalculations'

export default class DatasetContainer extends React.Component {

  state = {
    diameter: this.props.diameter,

    subCircleDiameter: CircleCalculations.calculateSubCircleDiameter(this.props.diameter,this.props.data),
    data: this.props.data,
    circleTiers: [],
    // circleData: [0,0,0],                        // Fill in data distribution
    // circleDiameters: [this.props.diameter,0,0], // Fill in diameters
    largestDiameter: 0                          // Use External Library 
                                                // To make functions
                                                // Available Here
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
              // diameter={(fixedDiameter || this.calculateSubCircleDiameter(diameter,data))}
              diameter={(fixedDiameter || CircleCalculations.calculateSubCircleDiameter(diameter,data))}
              rotationAngle={CircleCalculations.calculateSubCircleRotationAngle(index,data)}
              radialDisplacement={(CircleCalculations.calculateNewRadialDisplacement(fixedDiameter/2,Object.entries(data).length) || CircleCalculations.calculateSubCircleRadialDisplacement(diameter,data))}
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
                CircleCalculations.calculateNewOuterDiameter(
                  subCircleDiameter / 2,
                  CircleCalculations.calculateDataNeededForSecondRing(diameter,subCircleDiameter)
                ) - diameter
              )
            )
          }
          {
            this.renderCircleRing(
              CircleCalculations.calculateNewOuterDiameter(
                subCircleDiameter / 2,
                CircleCalculations.calculateDataNeededForSecondRing(diameter,subCircleDiameter)
              ),
              CircleCalculations.seedData(CircleCalculations.calculateDataNeededForSecondRing(diameter,subCircleDiameter)),
              0,
              subCircleDiameter
            )
          }
          {/* 3rd tier example - using nested calls of last diameter */}
          {
            this.renderCircleRing(
              CircleCalculations.calculateNewOuterDiameter(
                subCircleDiameter / 2,
                CircleCalculations.calculateDataNeededForSecondRing(CircleCalculations.calculateNewOuterDiameter(
                  subCircleDiameter / 2,
                  CircleCalculations.calculateDataNeededForSecondRing(diameter,subCircleDiameter)
                ),subCircleDiameter)
              ),
              CircleCalculations.seedData(CircleCalculations.calculateDataNeededForSecondRing(CircleCalculations.calculateNewOuterDiameter(
                subCircleDiameter / 2,
                CircleCalculations.calculateDataNeededForSecondRing(diameter,subCircleDiameter)
              ),subCircleDiameter)),
              -CircleCalculations.calculateNewOuterDiameter(
                subCircleDiameter / 2,
                CircleCalculations.calculateDataNeededForSecondRing(diameter,subCircleDiameter)
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
                CircleCalculations.calculateNewOuterDiameter(
                  subCircleDiameter / 2,
                  CircleCalculations.calculateDataNeededForSecondRing(diameter,subCircleDiameter)
                )-diameter
              )
            )
          }
          {
            this.renderContainerCircle(
              CircleCalculations.calculateNewOuterDiameter(
                subCircleDiameter / 2,
                CircleCalculations.calculateDataNeededForSecondRing(diameter,subCircleDiameter)
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