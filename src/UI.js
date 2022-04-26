import React, { useState } from 'react'
// import { Html, useProgress } from '@react-three/drei';
import { stat } from './state';
import { useSnapshot } from 'valtio';
import styled from 'styled-components'


// Spinner : depreciated
// export const Spinner = () => {
//     const { progress } = parseInt(useProgress());
//     console.log(progress);
//     return (
//         <Html fullscreen>
//             <div className="canvasSpinner">
//                 <div className="gugmu9vdpaw">
//                     <p>{`${progress}`}</p>
//                     <div></div>
//                 </div>
//             </div>
//         </Html>)
// }

const Link = styled.div`
  text-decoration: underline;
  cursor: pointer;
  width: fit-content;
  display: block;
    transition: ${props => props.theme.transition};

  &:hover{
    color: ${props => props.theme.hover};
    text-shadow: 1px 0px 1.75px ${props => props.theme.hover} !important;
  }

  &.start{
    color:  ${props => props.theme.hover} !important;
    text-shadow: 1px 0px 1.75px ${props => props.theme.hover} !important;
    
    &:hover{
    color:  ${props => props.theme.baseColor} !important;
    text-shadow: 1px 0px 1.75px ${props => props.theme.baseColor} !important;
    }
  }
`

const Option = styled.div`
display: flex;
justify-content: center;
gap: 40px;
`

function Options() {
    const snap = useSnapshot(stat)
    var elem = document.documentElement;

    function openFullscreen() {
        stat.fullscreen = true;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }
    function closeFullscreen() {
        stat.fullscreen = false;
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
    function start() {
        stat.start = true;
    }
    function stop() {
        stat.start = false;
        // clear axis
        for (const axis in snap.location) {
            if (stat.location[axis]) {
                stat.location[axis] = null;
            }
        }
    }
    function externalMode() {
        if (stat.start) {
            stop()
        }
        stat.selfie = true;
    }
    function laptopMode() {
        if (stat.start) {
            stop()
        }
        stat.selfie = false;
    }
    // function themeDark() {
    //     stat.themeChanged = true;
    //     stat.theme = 'dark'
    //     console.log(stat.themeChanged);
    // }
    // function themeLite() {
    //     stat.themeChanged = true;
    //     stat.theme = 'light'
    // }

    return (
        <Option>
            {!snap.selfie ? <Link onClick={externalMode}>External</Link> : <Link onClick={laptopMode}>Laptop</Link>}
            {snap.fullscreen ? <Link onClick={closeFullscreen}>Exit</Link> : <Link onClick={openFullscreen}>Fullscreen</Link>}
            {/* Bugged */}
            {/* {snap.theme === 'light' ? <Link onClick={themeDark}>Dark</Link> : <Link onClick={themeLite}>Lite</Link>} */}
            {snap.start ? <Link className='start' onClick={stop}><b>Stop</b></Link> : <Link className='start' onClick={start}><b>Start</b></Link>}
        </Option>
    )
}

const Button = styled.div`
cursor: pointer;
position: absolute;
transition: 1s;
z-index: 1000;

&:hover{
    color: ${props => props.theme.hover};
    text-shadow: 1px 0px 1.75px ${props => props.theme.hover} !important;
    /* box-shadow: 0 0 50px 50px  ${props => props.theme.baseColorAlpha};
  -webkit-box-shadow: 0 0 50px 50px  ${props => props.theme.baseColorAlpha}; 
  -moz-box-shadow: 0 0 50px 50px  ${props => props.theme.baseColorAlpha};  */
}
`

const Status = styled.p`
&.open{
  color: #3cf5aa !important;
  text-shadow: 1px 0px 1.75px #3cf5aa !important;
  background-color: #08afff;
}
&.point{
  color: #08afff !important;
text-shadow: 1px 0px 1.75px #08afff !important;
background-color: #3cf5aa67;
}
&.closed{
color: #009698 !important;
text-shadow: 1px 0px 1.75px #009698 !important;
background-color: #acddff77;
}
`
function UI() {
    const snap = useSnapshot(stat)
    const [hide, setHide] = useState(false)

    var x = window.matchMedia("(max-width: 768px)");
    if (x.matches) {
        // mobile
        return (
            <div className='mobileCaption' style={{ top: "50% !important", translate: "transform(-50%, -50%) !important" }}>
                Use a <b>Computer</b> to play <br />
                <i>Gear and Loading</i>
            </div>
        )
    } else {
        // not mobile
        return (
            <>
                <Button onClick={() => { setHide(!hide) }}>{hide ? '★' : '☆'}</Button>
                <div className='caption' style={hide ? { pointerEvents: "none", opacity: 0, transition: "1s" } : { pointerEvents: "all", opacity: 1, transition: "0.2s" }}>
                    <i>Gear and Loading</i> c/o <a href='https://nabla.ooo/'>Nabla</a><br />
                    This is a work in progress, follow it's development on <a href='https://github.com/nohr/gear-and-loading'>Github</a><br />
                    <a href='mailto:aite@nabla.ooo'>Email me</a>
                    <p style={{ paddingTop: '5px' }}>☆ Make point, fist, or open handsigns to test detection ☆<br />Be advised: This demo works best in a well-lit area.</p>
                    <br />
                    <Options />
                    <div className='statusbar'>
                        <p>Camera stream is in <b>{!snap.selfie ? "Laptop" : "External"}</b> mode</p>
                        <br />
                        {snap.start ?
                            <Status className={snap.load === "closed" ?
                                "closed" : snap.load === 'open' ?
                                    "open" : snap.load === 'point' ?
                                        "point" : null}>
                                {snap.load === 'closed' ? 'fist' : snap.load}
                            </Status> : <Status >Press Start</Status >}
                        {snap.location.x && snap.start && <>
                            <p>x: {`${snap.location.x}`} </p>
                            <p>y: {`${snap.location.y}`} </p>
                            <p>w: {`${snap.location.w}`} </p>
                            <p>h: {`${snap.location.h}`} </p>
                        </>}
                    </div>
                </div
                ></>
        )
    }
}

export default UI