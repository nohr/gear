import React from 'react'
import { state } from './state'
import { useSnapshot } from 'valtio'
import { Box, Html } from '@react-three/drei';
import { Panel } from './UI';
import styled from 'styled-components';

const Start = styled(Html)`
    width: max-content;
`

function StartScreen() {

    return (
        <>
            <Start
                gameUIWrapper
                center
            >Press space!
            </Start>
        </>
    )
}

function Instructions() {
    return (
        <>
            <Start
                gameUIWrapper
                center
            >
                {/* ***This displays the instructions picture that fades out */}
            </Start>
        </>
    )
}

// Malware
// Shock
// Bugged

function Game() {
    const snap = useSnapshot(state);

    return (
        <>
            {snap.stage === 0 && snap.mobile === false ?
                <>
                    <StartScreen />
                </>
                :
                snap.stage === 1 ?
                    <Instructions />
                    :
                    null
            }
        </>
    )
}

export default Game