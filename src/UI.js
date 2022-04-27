import React, { useEffect, useRef, useState } from 'react'
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
    const statusRef = useRef(null);

    var elem = document.documentElement;
    const [status, setStatus] = useState('');
    let statusCurrent;
    let option = '';

    // Access the status element
    // useEffect(() => {
    //     statusCurrent = statusRef.current;
    // }, [])


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
    function PopupCamera() {
        // TODO: Render camera feed popup that shows up in fullscreen
        console.log(window);
    }
    // TODO: update status bar
    // onMouseOver={() => toolTip(n)} onMouseOut={() => toolTip(0)} to enable
    function toolTip(n) {
        console.log("switch");
        if (!stat.start) {
            if (n === 0) {
                option = 'Press Start';
                setStatus(status);
            } else if (n === 1) {
                option = 'Flips the camera view.';
                setStatus(status);
            } else if (n === 2) {
                option = 'Opens the app in fullscreen.';
                setStatus(status);
            } else if (n === 3) {
                option = 'Pop out the camera feed';
                setStatus(status);
            } else if (n === 4) {
                option = 'Start the game.';
                setStatus(status);
            }
            stat.load = status;
        }
    }
    return (
        <Option>
            {!snap.selfie ? <Link onClick={externalMode}>External</Link> : <Link onClick={laptopMode}>Laptop</Link>}
            {snap.fullscreen ? <Link onClick={closeFullscreen}>Exit</Link> : <Link onClick={openFullscreen}>Fullscreen</Link>}
            {/* {snap.popup ? null : <Link onClick={PopupCamera}>Popup Camera</Link>} */}
            {snap.start ? <Link className='start' onClick={stop}><b>Stop</b></Link> : <Link className='start' onClick={start}><b>Start</b></Link>}
        </Option>
    )
}

const Button = styled.div`
cursor: pointer;
position: absolute;
transition: 1s;
z-index: 1000;
top: 5px;
left: 50%;
transform: translateX(-50%);

&:hover{
    color: ${props => props.theme.hover};
    text-shadow: 1px 0px 1.75px ${props => props.theme.hover} !important;
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
  top: 10px;
  padding: 20px;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;

    a.start{
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
    const snap = useSnapshot(stat)
    const [hide, setHide] = useState(false)
    const props = ['name', 'email', 'tel', 'address', 'icon'];
    const opts = { multiple: true };
    const supported = ('contacts' in navigator && 'ContactsManager' in window);

    async function getContacts() {
        console.log("checking");
        if (supported) {
            const contacts = await navigator.contacts.select(props, opts);
            console.log(contacts);
        }
    }

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
                <Button onClick={() => { setHide(!hide) }}>{hide ? '★' : '☆'}</Button>
                <Caption style={hide ? { pointerEvents: "none", opacity: 0, transition: "1s" } : { pointerEvents: "all", opacity: 1, transition: "0.2s" }}>
                    <i>Gear and Loading</i> c/o <a href='https://nabla.ooo/'>Nabla</a><br />
                    This is a work in progress, follow it's development on <a href='https://github.com/nohr/gear'>Github</a><br />
                    {supported && <><Button onClick={getContacts}>Send this to someone!</Button><p> or </p></>}<a className='start' href='mailto:aite@nabla.ooo'>Email me feedback!</a>
                    <p style={{ paddingTop: '5px' }}>☆ Make point, fist, or open handsigns to test detection ☆<br />Be advised: <i>This demo works best in a well-lit area</i>.</p>
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
                </Caption>
            </>
        )
    }
}

export default UI