import React, { useEffect, useRef, useState } from 'react';
import { stat } from './state';
import { useSnapshot } from 'valtio';
import styled from 'styled-components';
// Sound Imports
import useSound from 'use-sound';
import selectFile from './sounds/select.mp3'
import readyFile from './sounds/open.mp3'
// R3F Imports
// import { Html, useProgress } from '@react-three/drei';


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
    const snap = useSnapshot(stat);
    const [select] = useSound(selectFile);
    var elem = document.documentElement;
    // const [status, setStatus] = useState('');
    // let option = '';


    function openFullscreen() {
        stat.fullscreen = true;
        select();
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
        select();
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
        select();
    }
    function stop() {
        stat.start = false;
        select();
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
        select();
    }
    function laptopMode() {
        if (stat.start) {
            stop()
        }
        stat.selfie = false;
        select();
    }

    // TODO: Render camera feed popup
    // function PopupCamera() {
    //     console.log(window);
    //     select();
    // }

    // TODO: update status bar on mouseover
    // ENABLE: onMouseOver={() => toolTip(n)} onMouseOut={() => toolTip(0)}
    // function toolTip(n) {
    //     console.log("switch");
    //     if (!stat.start) {
    //         if (n === 0) {
    //             option = 'Press Start';
    //             setStatus(status);
    //         } else if (n === 1) {
    //             option = 'Flips the camera view.';
    //             setStatus(status);
    //         } else if (n === 2) {
    //             option = 'Opens the app in fullscreen.';
    //             setStatus(status);
    //         } else if (n === 3) {
    //             option = 'Pop out the camera feed';
    //             setStatus(status);
    //         } else if (n === 4) {
    //             option = 'Start the game.';
    //             setStatus(status);
    //         }
    //         stat.load = status;
    //     }
    // }
    return (
        <Option>
            {!snap.selfie ? <Link onClick={externalMode}>External</Link> : <Link onClick={laptopMode}>Laptop</Link>}
            {snap.fullscreen ? <Link onClick={closeFullscreen}>Windowed</Link> : <Link onClick={openFullscreen}>Fullscreen</Link>}
            {/* {snap.popup ? null : <Link onClick={PopupCamera}>Popup Camera</Link>} */}
            {snap.start ? <Link className='start' onClick={stop}><b>Stop</b></Link> : <Link className='start' onClick={start}><b>Start</b></Link>}
        </Option>
    )
}

const Shown = styled.svg`
    fill: ${props => props.theme.baseColor};
    stroke: none !important;
    stroke-width: 1px;
    filter: drop-shadow(1px 0px 1.75px ${props => props.theme.baseColor} ) !important;
    height: 24px;
    cursor: pointer;
    position: absolute;
    transition: 1s;
    z-index: 1000;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    overflow: visible;

    &:hover{
        fill: ${props => props.theme.hover} !important;
        filter: drop-shadow(1px 0px 1.75px ${props => props.theme.hover} ) !important;
        stroke: none !important;
}
`
const Hidden = styled.svg`
    fill: transparent;
    stroke: ${props => props.theme.baseColor};
    stroke-width: 1px;
    filter: drop-shadow(1px 0px 1.75px ${props => props.theme.baseColor} ) !important;
    height: 24px;
    cursor: pointer;
    position: absolute;
    transition: 1s;
    z-index: 1000;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    overflow: visible;

    &:hover{
        fill: ${props => props.theme.hover} !important;
        filter: drop-shadow(1px 0px 1.75px ${props => props.theme.hover} ) !important;
        stroke: none !important;
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

const Caption = styled.div`
  position: absolute;
  width: 50vw;
  z-index: 200;
  top: 15px;
  padding: 20px;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;

    a.start{
        text-decoration: none !important;
    color:  ${props => props.theme.hover} !important;
    text-shadow: 1px 0px 1.75px ${props => props.theme.hover} !important;
    
    &:hover{
    color:  ${props => props.theme.baseColor} !important;
    text-shadow: 1px 0px 1.75px ${props => props.theme.baseColor} !important;
    }
  }
`

const MobileCaption = styled.div`
    position: absolute;
    z-index: 200;
    top: 50%;
    padding: 20px;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 14px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
`
function UI() {
    const [ready] = useSound(readyFile);
    const statusRef = useRef(null);
    const snap = useSnapshot(stat);
    const [hide, setHide] = useState(false);
    // const props = ['name', 'email', 'tel', 'address', 'icon'];
    // const opts = { multiple: true };
    // const supported = ('contacts' in navigator && 'ContactsManager' in window);

    // Hide button
    function CD() {
        if (hide) {
            return (
                <Hidden
                    onClick={() => { setHide(!hide) }}
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 300 246.9"
                    xmlSpace="preserve"
                    className={hide ? 'hidden' : null}
                >
                    <path vectorEffect="non-scaling-stroke" d="M150.2 125.2c33.9.1 60.7 26.7 60.8 60.4.1 33.7-27.1 61.2-60.8 61.3-33.7.1-61.2-27.1-61.3-60.8-.5-33.9 26.8-60.9 61.3-60.9zM59.8 121.5C26 121.4-.1 94.8 0 60.6-.2 27.4 26.5.2 59.8 0h1.7c33.3.4 60.5 28.1 60.2 61.2-.3 34.1-27.4 60.5-61.9 60.3zM239.5 121.5c-34.4 0-61.4-26.7-61.5-60.7-.1-33.4 28-61 61.9-60.8 33.4.2 60.3 27.5 60.1 61v.2c-.1 33.9-26.5 60.3-60.5 60.3z"></path>
                </Hidden>
            )
        } else if (!hide) {
            return (
                <Shown
                    onClick={() => { setHide(!hide) }}
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 300 246.9"
                    xmlSpace="preserve"
                    className={hide ? 'hidden' : null}
                >
                    <path vectorEffect="non-scaling-stroke" d="M150.2 125.2c33.9.1 60.7 26.7 60.8 60.4.1 33.7-27.1 61.2-60.8 61.3-33.7.1-61.2-27.1-61.3-60.8-.5-33.9 26.8-60.9 61.3-60.9zM59.8 121.5C26 121.4-.1 94.8 0 60.6-.2 27.4 26.5.2 59.8 0h1.7c33.3.4 60.5 28.1 60.2 61.2-.3 34.1-27.4 60.5-61.9 60.3zM239.5 121.5c-34.4 0-61.4-26.7-61.5-60.7-.1-33.4 28-61 61.9-60.8 33.4.2 60.3 27.5 60.1 61v.2c-.1 33.9-26.5 60.3-60.5 60.3z"></path>
                </Shown>
            );
        }
    }
    // Access the status element
    useEffect(() => {
        const statusCurrent = statusRef.current;
        if (statusCurrent) {
            const observer = new MutationObserver(
                function (mutationsList, observer) {
                    if (mutationsList[0].target.textContent === 'Ready') {
                        ready();
                    }
                })
            if (observer) {
                observer.observe(statusCurrent, { characterData: true, childList: true, attributes: false, subtree: true })
            }
        }
    }, [statusRef, ready])

    // Access users' contacts
    // async function getContacts() {
    //     console.log("checking");
    //     if (supported) {
    //         const contacts = await navigator.contacts.select(props, opts);
    //         console.log(contacts);
    //     }
    // }

    var x = window.matchMedia("(max-width: 768px)");
    if (x.matches) {
        // mobile
        return (
            <MobileCaption style={{ top: "50% !important", translate: "transform(-50%, -50%) !important" }}>
                Use a <b>Computer</b> with<br /> a <b>webcam</b> to playtest <br />
                <i>Gear and Loading</i>
            </MobileCaption>
        )
    } else {
        // not mobile
        return (
            <>
                <CD />
                <Caption style={hide ? { pointerEvents: "none", opacity: 0, transition: "1s" } : { pointerEvents: "all", opacity: 1, transition: "0.2s" }}>
                    {/* Caption */}
                    <i>Gear and Loading</i> c/o <a href='https://nabla.ooo/'>Nabla</a><br />
                    This is a work in progress, follow it's development on <a href='https://github.com/nohr/gear'>Github</a>.
                    {/* Instructions */}
                    <p style={{ paddingTop: '10px' }}>☆ Instructions ☆
                        <br />Go to a well-lit area then take a few steps from your computer.
                        <br />Point, fist, or open your right hand to test detection.
                    </p>
                    {/* Feedback */}
                    <br /><div style={{ paddingBottom: '3px' }}>
                        {/* {supported && <><Button onClick={getContacts}>Send this to someone!</Button><p> or </p></>} */}
                        <a className='start' href='mailto:aite@nabla.ooo'>Send me feedback!</a></div>
                    <br />
                    {/* Options */}
                    <Options />
                    {/* Status area */}
                    <div className='statusarea'>
                        <p>Camera stream is in <b>{!snap.selfie ? "Laptop" : "External"}</b> mode</p>
                        <br />
                        {snap.start ?
                            <Status className={snap.load === "closed" ?
                                "closed" : snap.load === 'open' ?
                                    "open" : snap.load === 'point' ?
                                        "point" : null}>
                                {snap.load === 'closed' ? 'fist' : snap.load}
                            </Status> : <Status ref={statusRef}>Press Start</Status >}
                        {snap.location.x && snap.start && <>
                            <p>x: {`${snap.location.x}`} </p>
                            <p>y: {`${snap.location.y}`} </p>
                            <p>w: {`${snap.location.w}`} </p>
                            <p>h: {`${snap.location.h}`} </p>
                        </>}
                    </div>
                </Caption>
            </>
        )
    }
}

export default UI