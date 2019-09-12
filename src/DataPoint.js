import React from 'react'
import './DataPoint.scss'
export default class DataPoint extends React.Component {

  // state = {
  //   parentDiameter: this.props.parentDiameter,
  //   diameter: this.props.diameter,
  //   rotationAngle: this.props.rotationAngle,
  //   radialDisplacement: this.props.radialDisplacement,
  //   transformOrigin: this.props.transformOrigin,
  //   transformOffset: this.props.transformOffset,
  //   text: this.props.text,
  //   image_url: this.props.image_url,
  //   top: this.props.top,
  //   left: this.props.left,
  //   transitionAllowed: this.props.transitionAllowed,
  //   preventTransitions: this.props.preventTransitions,
  //   allowTransitions: this.props.allowTransitions,
  //   expandDiameter: this.props.expandDiameter
  // }

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
      zIndex
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
              lineHeight: `${diameter/2}px`,
              transform: `translate(${radialDisplacement - (diameter / 2)}px,${-diameter / 2}px) rotate(-${rotationAngle}deg)`,
              zIndex,
              transition: 'transform 0.35s ease-in, width 0.35s ease-in, height 0.35s ease-in',
              color: 'red',
              textAlign: 'center'
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
                height: `${diameter}px`
              }}
            >
            <div style={{
              userSelect: 'none'
            }}>{text}</div>
            <button
              style={{
                width: 7*diameter/18,
                userSelect: 'none',
                zIndex: zIndex+1
              }}
              onClick={
                ()=>{
                  removeDataByKey(text)
                  allowTransitions()
                }
              }
            >
              I remember
            </button>
            <button 
              style={{
                width: 7*diameter/18,
                userSelect: 'none',
                zIndex: zIndex+1
              }}
              onClick={
                ()=>{
                  removeDataByKey(text)
                  allowTransitions()
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