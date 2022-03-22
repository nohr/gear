import './App.css';

import Webcam from 'react-webcam';
import styled from 'styled-components'
import { useRef } from 'react';

const Camera = styled.div`
position: absolute;
top: 0;
right: 0;
width: 100vw;
height: 100vh;
`


function App() {
  const cameraRef = useRef(null);
  return (
    <div className="App">
      {/* TODO: Add webcam for debugging */}
      hello world
      <Camera ref={cameraRef}>
        <Webcam />
      </Camera>
    </div>
  );
}

export default App;
