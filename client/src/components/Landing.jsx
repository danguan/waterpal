import React from 'react';

export default class Landing extends React.Component {
  state = {};

  render() {
    return (
      <div
        className={this.props.clicked ? 'out' : ''}
        style={{
          animationDuration: '3s',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <svg width="25vw" height="25vh" viewBox="0 0 30 42">
          <path
            class="active"
            cursor="pointer"
            onClick={evt => this.props.handleClick(evt)}
            fill="transparent"
            stroke="#000"
            stroke-width="1.0"
            d="M15 3 Q16.5 6.8 25 18 A12.8 12.8 0 1 1 5 18 Q13.5 6.8 15 3z"
          />
        </svg>
      </div>
    );
  }
}
