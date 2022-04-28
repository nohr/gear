import React, { useEffect, useRef, useState } from 'react';
import { stat } from './state';
import { useSnapshot } from 'valtio';
import styled from 'styled-components';
// Sound Imports
import useSound from 'use-sound';
import selectFile from './sounds/select.mp3'
import readyFile from './sounds/open.mp3'
import ReactMarkdown from 'react-markdown';
import ReadMeMD from './README.md'


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
    transition: ${stat.transition};

  &:hover{
    color: ${props => props.theme.sub};
    text-shadow: 1px 0px 1.75px ${props => props.theme.sub} !important;
  }

  &.start{
    color:  ${props => props.theme.sub} !important;
    text-shadow: 1px 0px 1.75px ${props => props.theme.sub} !important;
    
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
    filter: drop-shadow(1px 0px 1.75px ${props => props.theme.baseColor} ) !important;
    height: 24px;
    cursor: pointer;
    position: absolute;
    transition: ${stat.transition};
    z-index: 1000;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    overflow: visible;

    &:hover{
        fill: ${props => props.theme.sub} !important;
        filter: drop-shadow(1px 0px 1.75px ${props => props.theme.sub} ) !important;
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
    transition: ${stat.transition};
    z-index: 1000;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    overflow: visible;

    &:hover{
    fill: transparent;
        filter: drop-shadow(1px 0px 1.75px ${props => props.theme.sub} ) !important;
        stroke: ${props => props.theme.sub} !important;
}
`

const Icon = styled.svg`
    cursor: pointer;
    fill: ${props => props.theme.baseColor};
    filter: drop-shadow(1px 0px 1.75px ${props => props.theme.baseColor} ) !important;
    height: 18px;
    width: auto;

    &:hover{
        fill: ${props => props.theme.sub} !important;
        filter: drop-shadow(1px 0px 1.75px ${props => props.theme.sub} ) !important;
        }
`

const Panel = styled.div`
background-color: ${props => props.theme.baseColorAlpha};
pointer-events: all;
position: absolute;
z-index: 1000;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
width: 600px;
text-align: left;
padding: 20px;
border-radius: 5px;
box-shadow: 1px 0px 1.75px ${props => props.theme.baseColorAlpha};

& ul{
    list-style: none;
    padding-left: 12px;
}

& .close{
    cursor: pointer;
    color: ${props => props.theme.sub};
    position: absolute;
    z-index: 5000;
    top: 0;
    right: 0;
    padding: 10px;
    font-style: bold;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;

    &:hover{
        color: ${props => props.theme.baseColor};
    }
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
    color:  ${props => props.theme.sub} !important;
    text-shadow: 1px 0px 1.75px ${props => props.theme.sub} !important;
    
    &:hover{
    color:  ${props => props.theme.baseColor} !important;
    text-shadow: 1px 0px 1.75px ${props => props.theme.baseColor} !important;
    }
  }
  
  .aboutfeedback{
      display: flex;
      justify-content: center;
      gap: 30px;
      padding-bottom: '3px'
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
    const [readme, setReadMe] = useState(null);
    const [panel, setPanel] = useState(false);
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
                >
                    <path vectorEffect="non-scaling-stroke" d="M150.2 125.2c33.9.1 60.7 26.7 60.8 60.4.1 33.7-27.1 61.2-60.8 61.3-33.7.1-61.2-27.1-61.3-60.8-.5-33.9 26.8-60.9 61.3-60.9zM59.8 121.5C26 121.4-.1 94.8 0 60.6-.2 27.4 26.5.2 59.8 0h1.7c33.3.4 60.5 28.1 60.2 61.2-.3 34.1-27.4 60.5-61.9 60.3zM239.5 121.5c-34.4 0-61.4-26.7-61.5-60.7-.1-33.4 28-61 61.9-60.8 33.4.2 60.3 27.5 60.1 61v.2c-.1 33.9-26.5 60.3-60.5 60.3z"></path>
                </Shown>
            );
        }
    }
    // ReadMeBtn and feedback
    function ReadMeBtn() {
        return (
            <Icon
                onClick={() => setPanel(!panel)}
                xmlns="http://www.w3.org/2000/svg"
                width="553"
                height="539.024"
                data-name="Layer 1"
                viewBox="0 0 553 539.024"
            >
                <path d="M502.821 199.998a17.868 17.868 0 01-17.867 17.867 17.85 17.85 0 01-12.629-5.234c-3.352-3.352-5.234-7.895-5.234-12.633s1.883-9.281 5.234-12.629a17.847 17.847 0 0112.629-5.234 17.926 17.926 0 0117.867 17.863zm45.973 320.1c-.012 5.016-2.012 9.82-5.559 13.367s-8.352 5.547-13.367 5.559H18.758A18.974 18.974 0 015.5 533.407 18.971 18.971 0 010 520.098c0-96.32 121.46-134.73 173.6-146.83h-.004a1.403 1.403 0 001.066-1.398v-20.387a159.12 159.12 0 01-26.547-52.918c-13.719-13.441-19.766-34.555-23.016-46.312-5.32-18.703-10.641-45.863 3.977-65.184l.672-.84c-8.813-42.413 56.059-96.639 83.015-106.145 38.745-13.663 93.235-12.884 129.896 5.658 29.48 14.91 83.539 66.693 76.549 100.372l.617.84c14.617 19.375 9.297 46.48 4.031 65.184-3.246 11.535-9.297 32.93-22.961 46.426a158.496 158.496 0 01-26.543 52.527v20.719c0 .652.434 1.227 1.062 1.402 52.082 12.152 173.38 50.621 173.38 146.89l-.002-.003zm-192.3-113.9a39.2 39.2 0 01-17.922-21.508 129.672 129.672 0 01-27.328 13.723 110.436 110.436 0 01-73.695 0 127.122 127.122 0 01-27.441-13.664 39.192 39.192 0 01-17.863 21.223 100.184 100.184 0 0082.152 41.047 100.191 100.191 0 0082.098-40.82zm16.801-129.811c1.961 0 8.961-3.023 17.527-33.602 6.719-23.742 3.863-32.367 1.625-35.391h-.004a8.676 8.676 0 00-8.117-2.801 3.653 3.653 0 01-3.195-1.344 3.6 3.6 0 01-.559-3.418v-.727c1.68-5.602-12.526-49.966-37.913-69.665 0 0-17.279-15.4-68.04-15.4-49.112 0-66.754 15.4-66.754 15.4-33.596 20.747-39.755 71.344-39.81 71.848a3.583 3.583 0 01-3.809 3.305h-1.625a7.737 7.737 0 00-6.664 2.91c-2.297 3.023-5.098 11.648 1.625 35.391 8.625 30.406 15.625 33.266 17.527 33.602a3.584 3.584 0 013.305 3.023c4.93 31.754 28.953 72.801 70.223 87.078v.004a75.891 75.891 0 0050.852 0c39.594-14.281 65.406-54.543 70.391-87.023a3.581 3.581 0 013.527-3.191h-.112zm132.21-151.539a63.713 63.713 0 0031.965-24.062 63.703 63.703 0 0011.32-38.375 64.459 64.459 0 00-19.449-44 64.472 64.472 0 00-44.5-18.273h-.395a63.62 63.62 0 00-33.848 9.891 63.566 63.566 0 00-23.383 26.398 17.826 17.826 0 00-1.621 14.152 17.81 17.81 0 0033.597 1.304 28.267 28.267 0 0125.422-16.128 29.118 29.118 0 0128.672 27.61 28.337 28.337 0 01-19.32 28 39.195 39.195 0 00-26.934 36.679v15.176a17.81 17.81 0 0026.394 14.586 17.81 17.81 0 009.164-14.586v-15.344c.113-2.02 2.578-2.914 2.914-3.027zm-188.83 152.661h-84.562a8.397 8.397 0 00-8.117 9.914 51.57 51.57 0 0027.75 36.363c14.414 7.133 31.332 7.133 45.746 0s24.676-20.578 27.75-36.363a8.405 8.405 0 00-1.906-7.012 8.411 8.411 0 00-6.66-2.902zm-73.527-58.293c0-4.68-1.859-9.168-5.168-12.477-3.309-3.305-7.797-5.164-12.473-5.164s-9.168 1.859-12.477 5.164a17.649 17.649 0 000 24.95c3.309 3.309 7.797 5.164 12.477 5.164s9.164-1.855 12.473-5.164a17.643 17.643 0 005.168-12.473zm81.645-17.867a17.656 17.656 0 00-12.352 5.273 17.635 17.635 0 00.106 24.839 17.639 17.639 0 0024.839.106 17.654 17.654 0 005.273-12.352 17.648 17.648 0 00-17.867-17.867h.001z"></path>
            </Icon>
        );
    }

    const ReadMe = () => {
        fetch(ReadMeMD).then(res => res.text()).then(text => setReadMe(text));
        return (
            <Panel>
                <div className='close'
                    onClick={() => setPanel(!panel)}
                >
                    close README.md
                </div>
                <ReactMarkdown>{readme}</ReactMarkdown>
            </Panel>
        )
    };

    if (stat.ready) {
        ready();
    }

    // Access the status element
    useEffect(() => {
        const statusCurrent = statusRef.current;
        if (statusCurrent) {
            const observer = new MutationObserver(
                function (mutationsList, observer) {
                    if (mutationsList[0].target.textContent === 'Ready' || stat.ready) {
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
                {panel ? <ReadMe /> : null}
                <Caption
                    className='caption'
                    style={hide ? { pointerEvents: "none", opacity: 0, transition: `${stat.transition}` }
                        : { pointerEvents: "all", opacity: 1, transition: "0.2s" }}
                >
                    {/* Caption */}
                    <i>Gear and Loading</i> c/o <a href='https://nabla.ooo/'>Nabla</a><br />
                    This is a work in progress, follow it's development on <a href='https://github.com/nohr/gear'>Github</a>.
                    {/* Instructions */}
                    <p style={{ paddingTop: '10px' }}>☆ Instructions ☆
                        <br />Go to a well-lit area then take a few steps from your computer.
                        <br />Point, fist, or open your right hand to test detection.
                    </p>
                    {/* ReadMeBtn and Feedback */}
                    <br /><div className='aboutfeedback'>
                        {/* {supported && <><Button onClick={getContacts}>Send this to someone!</Button><p> or </p></>} */}
                        <ReadMeBtn /><a href='mailto:aite@nabla.ooo'>How is it?</a></div>
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