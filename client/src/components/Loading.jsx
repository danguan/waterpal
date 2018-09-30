import React from 'react';
import LiquidFillGauge from 'react-liquid-gauge';
import Tear from './svgs/Tear.jsx'

export default class Landing extends React.Component {
  state = {};

  render() {
    return (
      <div>
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
            return <tspan style={{ fontSize: '400%'}}>
            <tspan style={{ fontSize: '140%'}}>W</tspan>
            ATER
            <tspan style={{ fontSize: '140%'}}>P</tspan>
            AL
            </tspan>;
          }}
        />
      </div>
    );
  }
}
