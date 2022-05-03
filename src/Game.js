import React from 'react'
import { stat } from './state'
import { useSnapshot } from 'valtio'
import { Box, Html } from '@react-three/drei';
import { Panel } from './UI';
import styled from 'styled-components';

const Start = styled(Html)`
    width: fit-content;
`

function StartScreen() {

    return (
        <>
            <Start
                gameUIWrapper
                center
            >Press space to begin.
            </Start>
        </>
    )
}

function Instructions() {
    return (
        <>
            <Html
                as='div'
            >
                <Panel> Use these different handsigns to expose flaws in your prosthetic arm.</Panel>
            </Html>
        </>
    )
}

// Malware
// Shock
// Bugged

function Game() {
    const snap = useSnapshot(stat);

    return (
        <>
            {snap.stage === 0 && snap.mobile === false ?
                <>
                    <StartScreen />
                </>
                :
                null
            }
        </>
    )
}

export default Game