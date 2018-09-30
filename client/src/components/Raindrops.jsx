import React from 'react';

export default class Raindrops extends React.Component {
  state = {};

  render() {
    return (
      <svg width="25vw" height="25vh" viewBox="0 0 30 42">
        <path
          fill="lightblue"
          stroke="#000"
          strokeWidth="1.0"
          d="M15 3 Q16.5 6.8 25 18 A12.8 12.8 0 1 1 5 18 Q13.5 6.8 15 3z"
        />
      </svg>
    );
  }
}
