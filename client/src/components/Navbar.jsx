import React from 'react';

export default class Navbar extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <svg width="25px" height="25px" viewBox="0 0 30 42">
          <path
            fill="transparent"
            stroke="#000"
            stroke-width="1.5"
            d="M15 3 Q16.5 6.8 25 18 A12.8 12.8 0 1 1 5 18 Q13.5 6.8 15 3z"
          />
        </svg>
      </div>
    );
  }
}
