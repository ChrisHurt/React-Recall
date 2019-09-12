import React from 'react'

export default class CircleMemoryOutcomes extends React.Component {
  state = {}

  render(){
    const {
      successes,
      failures
    } = this.props


    return (
      <div style = {{
        paddingLeft: '1em',
        paddingRight: '1em',
        padding: '0.5em',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#2C3531',
        color: '#D1E8E2'
      }}>
        <div>Correct Guesses: {successes}</div>
        <div>Incorrect Guesses: {failures}</div>
      </div>
    )
  }
}