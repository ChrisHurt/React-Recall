import React from 'react'
import './datasetcontainer.component.scss'
import DataPoint from './datapoint.component'
import CircleMemoryOutcomes from './circlememoryoutcomes.component'
import CircleCalculations from '../javascripts/circleCalculations'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
let domainName = 'https://react-recall-be.herokuapp.com'


var tierSizes = [8,15,22]

let seedData = (numDataPoints) => {
  let seed = {}
  for(let i = 0; i < numDataPoints; i++){
    seed[i] = i;
  }
  return seed
}

export default class DatasetContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
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
      successes: this.props.successes ? this.props.successes : 0,
      failures: this.props.failures ? this.props.failures : 0,
      session_id: undefined,
      axiosInDataPointsAllowed: true,
      completeMessage: undefined,
      redirecting: false,
    }
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

  recordGuess = (remembered,datapoint_id,key) => {
    if(this.state.axiosInDataPointsAllowed){
      axios.post(`${domainName}/guess-sessions/${this.state.session_id}/${datapoint_id}/add`,{user_id: this.props.user_id, remembered})
        .then(res=>{
          console.log()
          console.log('Guess Test Underway')
          console.log(res.data)
          console.log()
        })
    }
  }


  removeDataByKey = (key,remembered) => {
    console.log(`key: ${key}`)
    let newDataArray = Object.entries(this.state.data)

    let newDataObject = newDataArray.reduce((newDataObj,keyValPair,index)=>{
      if(keyValPair[0]!==key){
        newDataObj[keyValPair[0]] = keyValPair[1]
      } else {
        console.log(`keyValPair[0]: ${keyValPair[0]}`)
        console.log(`keyValPair[1]: ${keyValPair[1]}`)
      }
      return newDataObj
    },{})

    let datapoint_id = key

    axios.post(`${domainName}/guess-sessions/${this.state.session_id}/${datapoint_id}/add`,{user_id: this.props.user_id, remembered})
      .then(res=>{
        console.log()
        console.log('Guess Test Underway')
        console.log(res.data)
        console.log()
      })

    this.setState({
      data: newDataObject,
      circleTiers: CircleCalculations.circleTiers(newDataObject,this.state.diameter),
      selectedCircleIndex: (Object.entries(newDataObject).length === 1) ? 0 : undefined,
      selectedCircleTierIndex: (Object.entries(newDataObject).length === 1) ? 0 : undefined,
      largestDiameter: CircleCalculations.largestDiameter(newDataObject,this.state.diameter),
      axiosInDataPointsAllowed: true
    })
  }

  incrementSuccess = () => {
    // this.props.updateRecentSession('Collection Name',this.state.successes + 1,this.state.failures)
    this.setState({
      successes: this.state.successes + 1
    })
  }
  incrementFailure = () => {
    // this.props.updateRecentSession('Collection Name',this.state.successes,this.state.failures + 1)
    this.setState({
      failures: this.state.failures + 1
    })
  }

  centerTransition = (index,tierIndex) => {
    this.setState({
      selectedCircleIndex: index,
      selectedCircleTierIndex: tierIndex
    })
  }

  allowTransitions = () => {
    this.setState({
      transitionsAllowed: true
    })
  }

  preventTransitions = () => {
    this.setState({
      transitionsAllowed: false
    })
  }

  renderCircleRing = (diameter,data,transformOffset,fixedDiameter,tierIndex,axiosInDataPointsAllowed) =>{
    return (
      <div>
        {Object.entries(data).map((person,index)=>{
            return <DataPoint

              recordGuess = {this.recordGuess}
              axiosInDataPointsAllowed = {axiosInDataPointsAllowed}
              key={`dp-${index}`}
              id={person[0]}
              zIndex={(tierIndex!==1) ? (tierIndex) : 5}
              parentDiameter={diameter}

              diameter={(this.state.selectedCircleIndex === index && this.state.selectedCircleTierIndex === tierIndex) ?
                (2*this.state.circleTiers[0]['outerDiameter']) :
                // (fixedDiameter || CircleCalculations.calculateSubCircleDiameter(diameter,data))}
                (fixedDiameter!==undefined && fixedDiameter!==null ? fixedDiameter : CircleCalculations.calculateSubCircleDiameter(diameter,data))}
                
              rotationAngle={CircleCalculations.calculateSubCircleRotationAngle(index,data)}

              radialDisplacement={(this.state.selectedCircleIndex === index && this.state.selectedCircleTierIndex === tierIndex) ?
                 0 :
                //  (CircleCalculations.calculateNewRadialDisplacement(fixedDiameter/2,tierSizes[tierIndex]) || CircleCalculations.calculateSubCircleRadialDisplacement(diameter,data))}
                (fixedDiameter!==undefined && fixedDiameter!==null ? CircleCalculations.calculateNewRadialDisplacement(fixedDiameter/2,tierSizes[tierIndex]) : CircleCalculations.calculateSubCircleRadialDisplacement(diameter,data))}

              text={person[1].memoryText}
              image_url={person[1].imageURL}
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
              backgroundSize={`${(this.state.selectedCircleIndex === index && this.state.selectedCircleTierIndex === tierIndex) ?
                (2*this.state.circleTiers[0]['outerDiameter']) :
                (fixedDiameter || CircleCalculations.calculateSubCircleDiameter(diameter,data))}px ${(this.state.selectedCircleIndex === index && this.state.selectedCircleTierIndex === tierIndex) ? (2*this.state.circleTiers[0]['outerDiameter']) : (fixedDiameter || CircleCalculations.calculateSubCircleDiameter(diameter,data))}px,cover`}
            />          
          })}
      </div>
    ) 
  }

  componentDidMount = () => {

    let { collection_id, session_id } = this.props.match.params
    // Collect all data as needed
    axios.post(`${domainName}/datacollections/${collection_id}/datapoints`,{user_id: this.props.user_id})
      .then(res=> {
        let newDataArray = res.data.dataPoints

        // Make axios call to validate session id
        axios.post(`${domainName}/guess-sessions/${session_id}/isvalid`,{user_id: this.props.user_id}).then(res=>{
          if(res.data.guessSessionIsValid){
            console.log('valid')

            // Make axios call to find guesses
            axios.post(`${domainName}/guess-sessions/${session_id}/guesses`,{user_id: this.props.user_id}).then(res=>{
              
              let dataPointIDsGuessed = res.data.guesses.map(guess=>guess.dataPoint)

              console.log()
              console.log('All data points')
              console.log(newDataArray)
              console.log()
              console.log('Guessed Data Points')
              console.log(dataPointIDsGuessed)

              const checkIfAlreadyGuessed = (dp) => {
                let flagToKeep = true
                dataPointIDsGuessed.forEach((dataPointIDGuessed)=> {
                  if(dp._id === dataPointIDGuessed){
                    console.log(`Element '${dataPointIDGuessed}' removed!`)
                    flagToKeep = false
                  }
                })
                return flagToKeep
              }

              // then filter datapoints with guesses
              let filteredDataArray = newDataArray.filter(dataPoint=>{
                return checkIfAlreadyGuessed(dataPoint);
              })

              let filteredDataObject = filteredDataArray.reduce((dataObject,currentDataPoint)=>{
                dataObject[currentDataPoint._id] = {
                  imageURL: currentDataPoint.imageUrl,
                  memoryText: currentDataPoint.memoryText
                }
                return dataObject
              },{})

              console.log()
              console.log('filteredDataObject')
              console.log(filteredDataObject)
              console.log()
            
              // setstate to render data
              this.setState({
                data: filteredDataObject,
                circleTiers: CircleCalculations.circleTiers(filteredDataObject,this.props.diameter),
                selectedCircleIndex: (Object.entries(filteredDataObject).length === 1) ? 0 : undefined,
                selectedCircleTierIndex: (Object.entries(filteredDataObject).length === 1) ? 0 : undefined,
                largestDiameter: CircleCalculations.largestDiameter(filteredDataObject,this.state.diameter),
                session_id
              })

            })

          } else {
            console.log('invalid')
            // Make Axios call to post a new session
            axios.post(`${domainName}/guess-sessions/${collection_id}/add`,{user_id: this.props.user_id}).then(res=>{

              session_id = res.data.session_id

              console.log('New Session Added')
              let newDataObject = newDataArray.reduce((dataObject,currentDataPoint)=>{
                dataObject[currentDataPoint._id] = {
                  imageURL: currentDataPoint.imageUrl,
                  memoryText: currentDataPoint.memoryText
                }
                return dataObject
              },{})

              console.log()
              console.log('newDataObject')
              console.log(newDataObject)
              console.log()
              
              // setstate to render data
              this.setState({
                data: newDataObject,
                circleTiers: CircleCalculations.circleTiers(newDataObject,this.props.diameter),
                selectedCircleIndex: (Object.entries(newDataObject).length === 1) ? 0 : undefined,
                selectedCircleTierIndex: (Object.entries(newDataObject).length === 1) ? 0 : undefined,
                largestDiameter: CircleCalculations.largestDiameter(newDataObject,this.state.diameter),
                session_id
              })
            })
            
          }
        })


      }).catch(err=>console.log(`Error: ${err}`))

  }

  prepareToRedirect = () => {
    if(Object.keys(this.state.data).length === 0 && !this.state.redirecting){
      this.setState({
        redirecting: true
      })
    }
  }

  redirectOnFinish = () => {
    if(this.state.redirecting){
      return <Redirect to='/React-Recall/data_collections/me'/>
    }
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
      {this.prepareToRedirect()}
      {this.redirectOnFinish()}
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
                (Object.keys(circleTier.data).length !== tierSizes[index] && index!==0) ?
                  (CircleCalculations.calculateSubCircleDiameter(circleTier.outerDiameter,seedData(tierSizes[index]))) :
                  (null),
                index,
                this.state.axiosInDataPointsAllowed
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