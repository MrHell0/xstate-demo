import React from 'react';

import { useMachine } from '@xstate/react'
import { trafficLightMachine } from './TrafficLight'
import { Card, Button } from '@mui/material';
import { styled } from '@mui/system'

const Body =  styled('div')(
  `
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  `
);
  
type LightProps = {
  color: string;
  current: any
};

const Light = ({color, current}: LightProps) => {
  return (
    <input
      style={{
          appearance: 'none',
          width: '64px',
          height: '64px',
          borderRadius: '100%',
          marginBottom: '10px',
          backgroundColor: color,
          color: color,
          opacity: current.matches({ON: color}) ? 1 : 0.25,
      }}
      type='radio'
      readOnly
      value={color}
    />
  )
}
function App() {

  const [current, send] = useMachine(trafficLightMachine);

  return (
    <Body>
      <Card sx={{borderRadius: '15px', 
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '10px', display: 'inline-flex', flexDirection: 'column', verticalAlign: 'top', alignItems: 'center'}}>
            <Light color='red' current={current} />
            <Light color='yellow' current={current} />
            <Light color='green' current={current} />
            <Button onClick={()=> send(current.value.hasOwnProperty('ON') ? 'TURN_OFF' : 'TURN_ON')} variant='contained'>Power</Button>
      </Card>
    </Body>
  );
}

export default App;
