import React from 'react'
import './DatasetContainer.scss'
import DataPoint from './DataPoint'
import CircleMemoryOutcomes from './CircleMemoryOutcomes'
import CircleCalculations from '../javascripts/circleCalculations'

var tierSizes = [8,15,22]

export default class DatasetContainer extends React.Component {

  state = {
    diameter: this.props.diameter,
    subCircleDiameter: CircleCalculations.calculateSubCircleDiameter(this.props.diameter,(CircleCalculations.circleTiers(this.props.data,this.props.diameter)[0]['data'])),
    data: this.props.data,
    circleTiers: CircleCalculations.circleTiers(this.props.data,this.props.diameter),
    largestDiameter: CircleCalculations.largestDiameter(this.props.data,this.props.diameter),
    parentWidth: this.props.parentWidth,
    parentHeight: this.props.parentHeight,
    parentWidthUnit: this.props.parentWidthUnit,
    parentHeightUnit: this.props.parentHeightUnit,
    transitionsAllowed: true,
    successes: 0,
    failures: 0
  }

  renderContainerCircle = (diameter,backgroundColor,transformOffset,zIndex) => {
    return(
      <div style = {{
        height: 0,
        width: 0
      }}>
        <div 
          className="DS-container"
          style={{
            position: "relative",
            width: 2*diameter,
            height: 2*diameter,
            backgroundColor,
            zIndex: (zIndex || '0'),
            top: `calc(${this.state.parentHeight/2}${this.state.parentHeightUnit} - ${this.state.largestDiameter - transformOffset}px)`,
            left: `calc(${this.state.parentWidth/2}${this.state.parentWidthUnit} - ${this.state.largestDiameter - transformOffset}px)`
          }}
        >
        </div>
      </div>
    )
  }

  removeDataByKey = (key) => {
    console.log(`key: ${key}`)
    let newDataArray = Object.entries(this.state.data)

    let newDataObject = newDataArray.reduce((newDataObj,keyValPair,index)=>{
      if(keyValPair[0]!==key){
        newDataObj[keyValPair[0]] = keyValPair[1]
      } else {
        console.log(`keyValPair[0]: ${keyValPair[0]}`)
        console.log(`keyValPair[1]: ${keyValPair[1]}`)
        console.log('Value ignored??')
      }
      return newDataObj
    },{})

    this.setState({
      data: newDataObject,
      circleTiers: CircleCalculations.circleTiers(newDataObject,this.state.diameter),
      selectedCircleIndex: undefined,
      selectedCircleTierIndex: undefined,
      largestDiameter: CircleCalculations.largestDiameter(newDataObject,this.state.diameter),
    })
  }

  incrementSuccess = () => {
    this.setState({
      successes: this.state.successes + 1
    })
  }
  incrementFailure = () => {
    this.setState({
      failures: this.state.failures + 1
    })
  }

  centerTransition = (index,tierIndex) => {
    // console.log('center transitioning')
    // console.log(`previous selected circle index \t\t\t${this.state.selectedCircleIndex}`)
    // console.log(`previous selected circle tier index \t${this.state.selectedCircleTierIndex}`)

    // console.log(`current selected circle index \t\t\t${index}`)
    // console.log(`current selected circle tier index \t ${tierIndex}`)

    this.setState({
      selectedCircleIndex: index,
      selectedCircleTierIndex: tierIndex
    })
  }

  allowTransitions = () => {
    // console.log('center not transitioning')
    // console.log(`allowing transitions global: ${this.state.transitionsAllowed}`)
    // console.log('')
    this.setState({
      transitionsAllowed: true
    })
  }

  preventTransitions = () => {
    // console.log(`preventing transitions global: ${this.state.transitionsAllowed}`)
    // console.log('')
    this.setState({
      transitionsAllowed: false
    })
  }

  renderCircleRing = (diameter,data,transformOffset,fixedDiameter,tierIndex) =>{
    return (
      <div>
        {Object.entries(data).map((person,index)=>{
            return <DataPoint
              key={`dp-${index}`}
              zIndex={(tierIndex!==1) ? (tierIndex) : 5}

              parentDiameter={diameter}
              diameter={(this.state.selectedCircleIndex === index && this.state.selectedCircleTierIndex === tierIndex) ? (2*this.state.circleTiers[0]['outerDiameter']) : (fixedDiameter || CircleCalculations.calculateSubCircleDiameter(diameter,data))}
              rotationAngle={CircleCalculations.calculateSubCircleRotationAngle(index,data)}
              radialDisplacement={(this.state.selectedCircleIndex === index && this.state.selectedCircleTierIndex === tierIndex) ? 0 : (CircleCalculations.calculateNewRadialDisplacement(fixedDiameter/2,tierSizes[tierIndex]) || CircleCalculations.calculateSubCircleRadialDisplacement(diameter,data))}
              text={person[0]}
              image_url={person[1]}
              transformOffset={transformOffset}
              top={`calc(${this.state.parentHeight/2}${this.state.parentHeightUnit} - ${this.state.largestDiameter}px)`}
              left={`calc(${this.state.parentWidth/2}${this.state.parentWidthUnit} - ${this.state.largestDiameter}px)`}
              
              transitionAllowed={this.state.transitionsAllowed}

              index={index}
              tierIndex={tierIndex}
              centred={(this.selectedCircleIndex === index && this.selectedCircleTierIndex === tierIndex)}

              centerTransition={this.centerTransition}
              preventTransitions={this.preventTransitions}
              allowTransitions={this.allowTransitions}
              removeDataByKey={this.removeDataByKey}
              incrementSuccess={this.incrementSuccess}
              incrementFailure={this.incrementFailure}

              backgroundSize={`${(this.state.selectedCircleIndex === index && this.state.selectedCircleTierIndex === tierIndex) ? (2*this.state.circleTiers[0]['outerDiameter']) : (fixedDiameter || CircleCalculations.calculateSubCircleDiameter(diameter,data))}px ${(this.state.selectedCircleIndex === index && this.state.selectedCircleTierIndex === tierIndex) ? (2*this.state.circleTiers[0]['outerDiameter']) : (fixedDiameter || CircleCalculations.calculateSubCircleDiameter(diameter,data))}px,cover`}
              // backgroundSize="contain"
            />          
          })}
      </div>
    ) 
  }

  render(){
    const {
      subCircleDiameter,
      circleTiers,
      largestDiameter,
      successes,
      failures
    } = this.state
    return (
      <div 
        className="DS-offset"
        style={{}}
      >
        
        {circleTiers.map((circleTier,index)=>{
          return (
            <div 
              key={`CircleTier: ${index}`}
              style={{
                width: 0,
                height: 0
              }}
            >
            {/* Render Circle Ring */}
            {
              this.renderCircleRing(
                circleTier.outerDiameter,
                circleTier.data,
                largestDiameter - circleTier.outerDiameter,
                (Object.keys(circleTier.data).length !== tierSizes[index] && index!==0) ? (subCircleDiameter) : (null),
                index
              )
            }
            {/* Render Circle Backgrounds */}
            {
              this.renderContainerCircle(
                circleTier.outerDiameter,
                '#116466',
                (
                  largestDiameter - circleTier.outerDiameter
                )
              )
            }
          </div>
          )
        })}
        <CircleMemoryOutcomes successes={successes} failures={failures} />
      </div>
    )
  }
}