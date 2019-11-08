import React from 'react'
import './datapoint.component.scss'


export default class DataPoint extends React.Component {

  state = {
    axiosRequestSent: false
  }


  render(){
    
    const {
      /* Data Hierarchy ~ START */
      index,
      tierIndex,
      /* Data Hierarchy ~ END */
      /* Layout & Geometry ~ START */
      parentDiameter,
      diameter,
      radialDisplacement,
      rotationAngle,
      transformOffset,
      top,
      left,
      backgroundSize,
      zIndex,
      /* Layout & Geometry ~ END */
      /* Datapoint content ~ START */
      text,
      image_url,
      /* Datapoint content ~ END */
      /* Control Flow Booleans ~ START */
      transitionAllowed,
      /* Control Flow Booleans ~ END */
      /* Functions ~ START */
      allowTransitions,
      preventTransitions,
      centerTransition,
      removeDataByKey,
      incrementSuccess,
      incrementFailure
      /* Functions ~ END */
    } = this.props
    
    return (
      <div className="datapoint-rotation-container"
        style={
          {
            width: `${radialDisplacement}px`,
            transform: `translate(${parentDiameter + transformOffset}px,${parentDiameter + transformOffset}px) rotate(${rotationAngle}deg)`,
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
              width: `${diameter}px`,
              height: `${diameter}px`,
              transform: `translate(${radialDisplacement - (diameter / 2)}px,${-diameter / 2}px) rotate(-${rotationAngle}deg)`,
              zIndex
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
            <div className = "not-selectable">
              <span
                className="background-color-light-orange"
                style={{
                  height: `${diameter / 3}px`,
                  lineHeight: `${diameter / 3}px`
                }}
            >Remember<br></br>{text.split('').slice(0,16).join('')+ '?'}</span></div>
            <button
              className="not-selectable datapoint-button-remembered"
              style={{
                width: 7*diameter/18,
                zIndex: zIndex+1
              }}
              onClick={
                ()=>{
                  removeDataByKey(this.props.id,1);
                  allowTransitions();
                  incrementSuccess();
                }
              }
            >
              I remember
            </button>
            <button
              className="not-selectable datapoint-button-forgot" 
              style={{
                width: 7*diameter/18,
                zIndex: zIndex+1,
              }}
              onClick={
                ()=>{
                  removeDataByKey(this.props.id,0)
                  allowTransitions()
                  incrementFailure()
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