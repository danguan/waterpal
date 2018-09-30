import React from 'react';

const Tear = ({width,height}) => (
<svg width={width} height={height} viewBox="0 0 30 42">
  <path fill="transparent" stroke="#000" strokeWidth="1.5"
        d="M15 3
           Q16.5 6.8 25 18
           A12.8 12.8 0 1 1 5 18
           Q13.5 6.8 15 3z" />
</svg>
)

export default Tear;
