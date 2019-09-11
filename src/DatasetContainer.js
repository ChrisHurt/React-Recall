import React from 'react'
import './DatasetContainer.scss'
import DataPoint from './DataPoint'
import CircleCalculations from './circleCalculations'

var tierSizes = [8,15,22]

export default class DatasetContainer extends React.Component {

  state = {
    diameter: this.props.diameter,
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
                (Object.keys(circleTier.data).length !== tierSizes[index] && index!==0) ? (subCircleDiameter) : (null),
                (Object.keys(circleTier.data).length !== tierSizes[index] && index!==0) ? (index) : (null)
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