import React from 'react';
import LiquidFillGauge from 'react-liquid-gauge';

export default class Landing extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <LiquidFillGauge
          style={{ margin: '0 auto' }}
          value={65}
          riseAnimation
          waveAnimation
          waveFrequency={2}
          waveAmplitude={1}
          gradient
          textRenderer={() => {
            return <tspan style={{ fontSize: '300%', fontFamily: 'Montserrat' }}>WaterPal</tspan>;
          }}
        />
      </div>
    );
  }
}
