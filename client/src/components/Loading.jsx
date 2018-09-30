import React from 'react';
import LiquidFillGauge from 'react-liquid-gauge';

export default class Landing extends React.Component {
  state = {};

  render() {
    return (
      <div
        className={this.props.clicked ? 'move' : ''}
        style={{
          position: 'fixed',
          top: '-23%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <LiquidFillGauge
          style={{ margin: '0 auto' }}
          value={58}
          riseAnimation
          waveAnimation
          waveFrequency={2}
          waveAmplitude={1}
          gradient
          circleStyle={{
            fill: '#fff'
          }}
          textStyle={{
            fontFamily: 'liquido'
          }}
          waveTextStyle={{
            fill: '#fff',
            fontFamily: 'liquido-fluid'
          }}
          textRenderer={() => {
            return (
              <tspan style={{ fontSize: '400%' }}>
                <tspan style={{ fontSize: '140%' }}>W</tspan>
                ATER
                <tspan style={{ fontSize: '140%' }}>P</tspan>
                AL
              </tspan>
            );
          }}
        />
      </div>
    );
  }
}
