import React from 'react';
import './circlememoryoutcomes.component.scss';

export default class CircleMemoryOutcomes extends React.Component {
  state = {}

  render(){
    const {
      successes,
      failures
    } = this.props


    return (
      <div className="outcomes-bar">
        <div>Correct Guesses: {successes}</div>
        <div>Incorrect Guesses: {failures}</div>
      </div>
    )
  }
}