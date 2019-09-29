import React from 'react'
import './DataPoint.scss'
import axios from 'axios'


export default class DataPoint extends React.Component {

  state = {
    axiosRequestSent: false
  }


  render(){
    
    const {
      index,
      tierIndex,
      parentDiameter,
      diameter,
      radialDisplacement,
      rotationAngle,
      transformOffset,
      text,
      image_url,
      top,
      left,
      transitionAllowed,
      allowTransitions,
      preventTransitions,
      centerTransition,
      removeDataByKey,
      backgroundSize,
      zIndex,
      incrementSuccess,
      incrementFailure,
      recordGuess
      
    } = this.props
    
    return (
      <div className="datapoint-rotation-container"
        style={
          {
            position: "relative",
            width: `${radialDisplacement}px`,
            transform: `translate(${parentDiameter + transformOffset}px,${parentDiameter + transformOffset}px) rotate(${rotationAngle}deg)`,
            transformOrigin: 'left center',
            height: 0,
            zIndex: (radialDisplacement===0) ? (4)  : zIndex+1,
            top,
            left
          }
        }
      >
        <div 
          className="datapoint" 
          style={
            {
              backgroundImage: `url(${image_url})`,
              backgroundSize,
              position: 'relative',
              width: `${diameter}px`,
              height: `${diameter}px`,
              // lineHeight: `${diameter/2}px`,
              transform: `translate(${radialDisplacement - (diameter / 2)}px,${-diameter / 2}px) rotate(-${rotationAngle}deg)`,
              zIndex,
              transition: 'transform 0.35s ease-in, width 0.35s ease-in, height 0.35s ease-in',
              color: '#2C3531',
              fontWeight: '700',
              textShadow: '1px 1px #D1E8E2',
              textAlign: 'center',
              fontSize: '1.5em',
              textWrap: 'wrap'
            }
          }
          onClick={
            (transitionAllowed) ? (function(){
              centerTransition(index,tierIndex)
              preventTransitions()
            }) : ()=>{}
          }
        >
          {(radialDisplacement === 0)? (<div
              style={{
                width: `${diameter}px`,
                height: `${diameter}px`,
              }}
            >
            <div style={{
              userSelect: 'none',              
            }}><span
              style={{
                fontSize: ``,
                backgroundColor: 'rgba(255,203,154,0.65)',
                height: `${diameter / 3}px`,
                lineHeight: `${diameter / 3}px`
              }}
            >Remember<br></br>{text.split('').slice(0,16).join('')+ '?'}</span></div>
            <button
              style={{
                width: 7*diameter/18,
                userSelect: 'none',
                zIndex: zIndex+1,
                padding: '0.25em',
                backgroundColor: '#FFCB9A',
                borderRadius: '0.5em',
                marginRight: '0.5em'
              }}
              onClick={
                ()=>{
                  removeDataByKey(this.props.id,1)
                  allowTransitions()
                  incrementSuccess()
                  // this.props.recordGuess(1,this.props.id,text)
                }
              }
            >
              I remember
            </button>
            <button 
              style={{
                width: 7*diameter/18,
                userSelect: 'none',
                zIndex: zIndex+1,
                padding: '0.25em',
                backgroundColor: '#D9B08C',
                borderRadius: '0.5em'
              }}
              onClick={
                ()=>{
                  removeDataByKey(this.props.id,0)
                  allowTransitions()
                  incrementFailure()
                  // this.props.recordGuess(0,this.props.id,text)
                }
              }
            >
              I forgot
            </button>
          </div>) : ('')}
        </div>
      </div>
    )
  }
}