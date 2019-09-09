import React from 'react'
import './DatasetContainer.scss'
import DataPoint from './DataPoint'

var revolution = 360
var degToRads = Math.PI/180

export default class DatasetContainer extends React.Component {

  state = {
    diameter: 300,
    data: {
      John: 'https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80',
      Sue: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      Sue3: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      Hipster5: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
      John2: 'https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80',
      Sue2: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      Hipster58: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
      Hipster59: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
      Hipster60: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
      Hipster61: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60'
    }
  }

  render(){
    const {
      diameter,
      data
    } = this.state
    return (
      <div className="DS-offset">
        <div className="DS-container"
        style={{
          width: 2*diameter,
          height: 2*diameter,
          transform: `translate(${-diameter/2}px,${-diameter/2}px)`
          
          }}>
        </div>
        {Object.entries(data).map((person,index)=>{
          let degreesPerCircle = (revolution / Object.entries(data).length)
          let calculatedAngle = Number(degreesPerCircle * index)
          let calculatedDiameter = diameter * 2*(1 - ((1)/(1 + Math.sin(degToRads*degreesPerCircle/2))))
          return <DataPoint
            key={`dp-${index}`}
            parentDiameter={diameter}
            diameter={calculatedDiameter}
            rotationAngle={calculatedAngle}
            radialDisplacement={(diameter)/(Math.sin(degToRads*degreesPerCircle/2)+1)}
            transformOrigin={'left center'}
            text={person[0]}
            image_url={person[1]}
          />          
        })}
      </div>
    )
  }
}