import React, { useEffect, useRef, useState } from 'react';
import { stat } from './state';
import { useSnapshot } from 'valtio';
import styled from 'styled-components';
// Sound Imports
import useSound from 'use-sound';
import selectFile from './sounds/select.mp3'
import ReactMarkdown from 'react-markdown';
import ReadMeMD from './README.md'
import { commentBox } from 'commentbox.io';

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
  cursor: pointer;
  width: 100%;
  display: block;
  height: min-content;
    transition: ${stat.transition};
    color: ${props => props.theme.base};
    text-shadow: 1px 0px 1.75px ${props => props.theme.base};
    background-color: ${props => props.theme.baseAlpha};
    border-radius: 10px;
    padding: 5px 7px;

  &:hover{
    color: ${props => props.theme.sub};
    text-shadow: 1px 0px 1.75px ${props => props.theme.sub} !important;
  }

  &.start{
    color:  ${props => props.theme.sub} !important;
    text-shadow: 1px 0px 1.75px ${props => props.theme.sub} !important;
    
    &:hover{
    color:  ${props => props.theme.base} !important;
    text-shadow: 1px 0px 1.75px ${props => props.theme.base} !important;
    }
  }
`

const Option = styled.div`
display: flex;
justify-content: center;
gap: 40px;
`

export const Panel = styled.div`
background-color: transparent;
opacity: 1;
pointer-events: all;
position: absolute;
z-index: 1000;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
width: 600px;
height: 370px;
text-align: left;
padding: 3px 3px;
border-radius: 15px;
border: solid 1px ${props => props.theme.sub};
box-shadow: none;
/* box-shadow: 0 0 10px 10px ${props => props.theme.third}; */
transition: ${stat.transition};

    & *{
        color: ${props => props.theme.base};
        text-shadow: 1px 0px 1.75px ${props => props.theme.base};

    }
    & a:hover{
        color: ${props => props.theme.sub};
        text-shadow: 1px 0px 1.75px ${props => props.theme.sub};
    }
& .markdown{
    position: absolute;
    z-index: 100;
    height: 370px;
    overflow-y: scroll;
    padding: 0 17px;

    p{
        padding: 5px 0 ;
    }

    &:first-of-type(p){
        color: lavenderblush !important;
    }

    h1{
        padding-top: 20px;
    }

    h2{
        padding-top: 5px;
        padding-bottom: 5px;
    }

    & h1, & h2 {
    text-align: left;
    }
}
& ul{
    list-style: none;

    li{
        padding: 5px 0 ;
    }
}

& .close{
    cursor: pointer; 
    color: ${props => props.theme.sub};
    text-shadow: 1px 0px 1.75px ${props => props.theme.sub} !important;
    position: fixed;
    z-index: 5000;
    top: 0;
    right: 0;
    margin: 20px;
    font-style: bold;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;

    &:hover{
        color: ${props => props.theme.base};
        text-shadow: 1px 0px 1.75px ${props => props.theme.base} !important;
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
  width: fit-content;
  z-index: 600;
  top: 15px;
  padding: 20px;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  font-size: 13px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;

  a{
    color:  ${props => props.theme.base} !important;
    text-shadow: 1px 0px 1.75px ${props => props.theme.base} !important;
    
    &:hover{
        color: ${props => props.theme.sub}!important;
        text-shadow: 1px 0px 1.75px ${props => props.theme.sub} !important;
    }
  }

    a.start{
        text-decoration: none !important;
    color:  ${props => props.theme.sub} !important;
    text-shadow: 1px 0px 1.75px ${props => props.theme.sub} !important;
    
    &:hover{
    color:  ${props => props.theme.base} !important;
    text-shadow: 1px 0px 1.75px ${props => props.theme.base} !important;
    }
  }
  
  .aboutfeedback{
      display: flex;
      justify-content: center;
      gap: 30px;
      padding-bottom: '3px'
  }
`
const Backdrop = styled.div`
    cursor: alias;
    position: absolute;
    z-index: 500;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: transparent;
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
const ButtonCaption = styled.p`
        /* position: absolute;
        left: 50%;
        transform: translateX(-25%); */
    `

const ButtonGroup = styled.div`
        width: 50% !important;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    `
function UI() {
    const statusRef = useRef(null);
    const snap = useSnapshot(stat);
    const [caption, setCaption] = useState(false);
    const [readMeText, setReadMeText] = useState(null);
    const [readme, setReadMe] = useState(false);
    const [feedback, setFeedback] = useState(false);
    const [select] = useSound(selectFile);
    var elem = document.documentElement;
    // const props = ['name', 'email', 'tel', 'address', 'icon'];
    // const opts = { multiple: true };
    // const supported = ('contacts' in navigator && 'ContactsManager' in window);

    useEffect(() => {
        // const a = document.querySelectorAll('#a');
        // a.forEach((link) => {
        //     link.addEventListener('click', () => select());
        // })

        function Shortcuts(e) {
            stat.triggered++
            console.log(stat.triggered);
            if (e.key === 'f') {
                if (!stat.fullscreen) {
                    openFullscreen();
                } else if (stat.fullscreen === true) {
                    closeFullscreen();
                }
            } else if (e.key === 'l') {
                if (!stat.selfie) {
                    externalMode();
                } else if (stat.selfie === true) {
                    laptopMode();
                }
            } else if (e.key === 'Enter') {
                select();
                // debugger
                if (caption === false) {
                    show();
                    console.log("show");
                } else if (caption === true) {
                    hide();
                    console.log("hide");
                } else {
                    return;
                }
            } else if (e.key === ' ') {
                if (stat.start === false) {
                    start();
                } else if (stat.start === true) {
                    stop();
                }
            } else if (e.key === 'Escape') {
                stat.fullscreen = false;
            } else {
                return;
            }
        }

        document.addEventListener('keyup', (e) => Shortcuts(e))
    }, [])

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
        console.log(document);
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
        stat.stage = 1;
        setFeedback(false)
        setReadMe(false)
        select();
    }
    function stop() {
        stat.start = false;
        stat.load = 'Press space to resume.';
        // stat.started = false;
        stat.ready = false;
        select();
        // clear axis
        for (const axis in snap.location) {
            if (stat.location[axis]) {
                stat.location[axis] = null;
            }
        }
    }
    function externalMode() {
        stat.selfie = true;
        if (stat.start) {
            stop()
        }
        stat.selfie = true;
        select();
    }
    function laptopMode() {
        stat.selfie = false;
        if (stat.start) {
            stop()
        }
        stat.selfie = false;
        select();
    }
    function hide() {
        setCaption(false);
        stat.caption = false;
        select();
    }
    function show() {
        setCaption(true);
        stat.caption = true;
        select();
    }
    function Options() {
        // const [status, setStatus] = useState('');
        // let option = '';


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
                {!snap.selfie ? <Link id='a' onClick={externalMode}>Externa<u>l</u></Link> : <Link id='a' onClick={laptopMode}><u>L</u>aptop</Link>}
                {snap.fullscreen ? <Link id='a' onClick={closeFullscreen}>Windowed (f)</Link> : <Link id='a' onClick={openFullscreen}><u>F</u>ullscreen</Link>}
                {/* {snap.popup ? null : <Link id='a' onClick={PopupCamera}>Popup Camera</Link>} */}
                <ButtonGroup>
                    {snap.start ? <Link id='a' className='start' onClick={stop}><b>Stop</b></Link> : <Link id='a' className='start' onClick={start}><b>Start</b></Link>}
                    <ButtonCaption>(space)</ButtonCaption>
                </ButtonGroup>
            </Option>
        )
    }

    // Hide button
    function CD() {
        if (caption) {
            return (
                <StrokeHide
                    onClick={() => {
                        hide();
                        console.log("gg");
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 300 246.9"
                    xmlSpace="preserve"
                    id='a'
                >
                    <path vectorEffect="non-scaling-stroke" d="M150.2 125.2c33.9.1 60.7 26.7 60.8 60.4.1 33.7-27.1 61.2-60.8 61.3-33.7.1-61.2-27.1-61.3-60.8-.5-33.9 26.8-60.9 61.3-60.9zM59.8 121.5C26 121.4-.1 94.8 0 60.6-.2 27.4 26.5.2 59.8 0h1.7c33.3.4 60.5 28.1 60.2 61.2-.3 34.1-27.4 60.5-61.9 60.3zM239.5 121.5c-34.4 0-61.4-26.7-61.5-60.7-.1-33.4 28-61 61.9-60.8 33.4.2 60.3 27.5 60.1 61v.2c-.1 33.9-26.5 60.3-60.5 60.3z"></path>
                </StrokeHide>
            )
        } else if (caption === false) {
            return (
                <Hide
                    onClick={() => {
                        show();
                        console.log("hhh");
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 300 246.9"
                    xmlSpace="preserve"
                    id='a'
                >
                    <path vectorEffect="non-scaling-stroke" d="M150.2 125.2c33.9.1 60.7 26.7 60.8 60.4.1 33.7-27.1 61.2-60.8 61.3-33.7.1-61.2-27.1-61.3-60.8-.5-33.9 26.8-60.9 61.3-60.9zM59.8 121.5C26 121.4-.1 94.8 0 60.6-.2 27.4 26.5.2 59.8 0h1.7c33.3.4 60.5 28.1 60.2 61.2-.3 34.1-27.4 60.5-61.9 60.3zM239.5 121.5c-34.4 0-61.4-26.7-61.5-60.7-.1-33.4 28-61 61.9-60.8 33.4.2 60.3 27.5 60.1 61v.2c-.1 33.9-26.5 60.3-60.5 60.3z"></path>
                </Hide>
            )
        }
    }
    // ReadMeBtn and feedback
    function ReadMeBtn() {
        if (!readme) {
            return (
                <Icon
                    onClick={() => setReadMe(!readme)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="553"
                        height="539.024"
                        data-name="Layer 1"
                        viewBox="0 0 553 539.024"
                        id='a'
                    >
                        <path d="M502.821 199.998a17.868 17.868 0 01-17.867 17.867 17.85 17.85 0 01-12.629-5.234c-3.352-3.352-5.234-7.895-5.234-12.633s1.883-9.281 5.234-12.629a17.847 17.847 0 0112.629-5.234 17.926 17.926 0 0117.867 17.863zm45.973 320.1c-.012 5.016-2.012 9.82-5.559 13.367s-8.352 5.547-13.367 5.559H18.758A18.974 18.974 0 015.5 533.407 18.971 18.971 0 010 520.098c0-96.32 121.46-134.73 173.6-146.83h-.004a1.403 1.403 0 001.066-1.398v-20.387a159.12 159.12 0 01-26.547-52.918c-13.719-13.441-19.766-34.555-23.016-46.312-5.32-18.703-10.641-45.863 3.977-65.184l.672-.84c-8.813-42.413 56.059-96.639 83.015-106.145 38.745-13.663 93.235-12.884 129.896 5.658 29.48 14.91 83.539 66.693 76.549 100.372l.617.84c14.617 19.375 9.297 46.48 4.031 65.184-3.246 11.535-9.297 32.93-22.961 46.426a158.496 158.496 0 01-26.543 52.527v20.719c0 .652.434 1.227 1.062 1.402 52.082 12.152 173.38 50.621 173.38 146.89l-.002-.003zm-192.3-113.9a39.2 39.2 0 01-17.922-21.508 129.672 129.672 0 01-27.328 13.723 110.436 110.436 0 01-73.695 0 127.122 127.122 0 01-27.441-13.664 39.192 39.192 0 01-17.863 21.223 100.184 100.184 0 0082.152 41.047 100.191 100.191 0 0082.098-40.82zm16.801-129.811c1.961 0 8.961-3.023 17.527-33.602 6.719-23.742 3.863-32.367 1.625-35.391h-.004a8.676 8.676 0 00-8.117-2.801 3.653 3.653 0 01-3.195-1.344 3.6 3.6 0 01-.559-3.418v-.727c1.68-5.602-12.526-49.966-37.913-69.665 0 0-17.279-15.4-68.04-15.4-49.112 0-66.754 15.4-66.754 15.4-33.596 20.747-39.755 71.344-39.81 71.848a3.583 3.583 0 01-3.809 3.305h-1.625a7.737 7.737 0 00-6.664 2.91c-2.297 3.023-5.098 11.648 1.625 35.391 8.625 30.406 15.625 33.266 17.527 33.602a3.584 3.584 0 013.305 3.023c4.93 31.754 28.953 72.801 70.223 87.078v.004a75.891 75.891 0 0050.852 0c39.594-14.281 65.406-54.543 70.391-87.023a3.581 3.581 0 013.527-3.191h-.112zm132.21-151.539a63.713 63.713 0 0031.965-24.062 63.703 63.703 0 0011.32-38.375 64.459 64.459 0 00-19.449-44 64.472 64.472 0 00-44.5-18.273h-.395a63.62 63.62 0 00-33.848 9.891 63.566 63.566 0 00-23.383 26.398 17.826 17.826 0 00-1.621 14.152 17.81 17.81 0 0033.597 1.304 28.267 28.267 0 0125.422-16.128 29.118 29.118 0 0128.672 27.61 28.337 28.337 0 01-19.32 28 39.195 39.195 0 00-26.934 36.679v15.176a17.81 17.81 0 0026.394 14.586 17.81 17.81 0 009.164-14.586v-15.344c.113-2.02 2.578-2.914 2.914-3.027zm-188.83 152.661h-84.562a8.397 8.397 0 00-8.117 9.914 51.57 51.57 0 0027.75 36.363c14.414 7.133 31.332 7.133 45.746 0s24.676-20.578 27.75-36.363a8.405 8.405 0 00-1.906-7.012 8.411 8.411 0 00-6.66-2.902zm-73.527-58.293c0-4.68-1.859-9.168-5.168-12.477-3.309-3.305-7.797-5.164-12.473-5.164s-9.168 1.859-12.477 5.164a17.649 17.649 0 000 24.95c3.309 3.309 7.797 5.164 12.477 5.164s9.164-1.855 12.473-5.164a17.643 17.643 0 005.168-12.473zm81.645-17.867a17.656 17.656 0 00-12.352 5.273 17.635 17.635 0 00.106 24.839 17.639 17.639 0 0024.839.106 17.654 17.654 0 005.273-12.352 17.648 17.648 0 00-17.867-17.867h.001z"></path>
                    </svg>
                    <p>README</p>
                </Icon>
            )
        } else if (readme === true) {
            return (
                <ActiveIcon
                    onClick={() => setReadMe(!readme)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="553"
                        height="539.024"
                        data-name="Layer 1"
                        viewBox="0 0 553 539.024"
                    >
                        <path d="M502.821 199.998a17.868 17.868 0 01-17.867 17.867 17.85 17.85 0 01-12.629-5.234c-3.352-3.352-5.234-7.895-5.234-12.633s1.883-9.281 5.234-12.629a17.847 17.847 0 0112.629-5.234 17.926 17.926 0 0117.867 17.863zm45.973 320.1c-.012 5.016-2.012 9.82-5.559 13.367s-8.352 5.547-13.367 5.559H18.758A18.974 18.974 0 015.5 533.407 18.971 18.971 0 010 520.098c0-96.32 121.46-134.73 173.6-146.83h-.004a1.403 1.403 0 001.066-1.398v-20.387a159.12 159.12 0 01-26.547-52.918c-13.719-13.441-19.766-34.555-23.016-46.312-5.32-18.703-10.641-45.863 3.977-65.184l.672-.84c-8.813-42.413 56.059-96.639 83.015-106.145 38.745-13.663 93.235-12.884 129.896 5.658 29.48 14.91 83.539 66.693 76.549 100.372l.617.84c14.617 19.375 9.297 46.48 4.031 65.184-3.246 11.535-9.297 32.93-22.961 46.426a158.496 158.496 0 01-26.543 52.527v20.719c0 .652.434 1.227 1.062 1.402 52.082 12.152 173.38 50.621 173.38 146.89l-.002-.003zm-192.3-113.9a39.2 39.2 0 01-17.922-21.508 129.672 129.672 0 01-27.328 13.723 110.436 110.436 0 01-73.695 0 127.122 127.122 0 01-27.441-13.664 39.192 39.192 0 01-17.863 21.223 100.184 100.184 0 0082.152 41.047 100.191 100.191 0 0082.098-40.82zm16.801-129.811c1.961 0 8.961-3.023 17.527-33.602 6.719-23.742 3.863-32.367 1.625-35.391h-.004a8.676 8.676 0 00-8.117-2.801 3.653 3.653 0 01-3.195-1.344 3.6 3.6 0 01-.559-3.418v-.727c1.68-5.602-12.526-49.966-37.913-69.665 0 0-17.279-15.4-68.04-15.4-49.112 0-66.754 15.4-66.754 15.4-33.596 20.747-39.755 71.344-39.81 71.848a3.583 3.583 0 01-3.809 3.305h-1.625a7.737 7.737 0 00-6.664 2.91c-2.297 3.023-5.098 11.648 1.625 35.391 8.625 30.406 15.625 33.266 17.527 33.602a3.584 3.584 0 013.305 3.023c4.93 31.754 28.953 72.801 70.223 87.078v.004a75.891 75.891 0 0050.852 0c39.594-14.281 65.406-54.543 70.391-87.023a3.581 3.581 0 013.527-3.191h-.112zm132.21-151.539a63.713 63.713 0 0031.965-24.062 63.703 63.703 0 0011.32-38.375 64.459 64.459 0 00-19.449-44 64.472 64.472 0 00-44.5-18.273h-.395a63.62 63.62 0 00-33.848 9.891 63.566 63.566 0 00-23.383 26.398 17.826 17.826 0 00-1.621 14.152 17.81 17.81 0 0033.597 1.304 28.267 28.267 0 0125.422-16.128 29.118 29.118 0 0128.672 27.61 28.337 28.337 0 01-19.32 28 39.195 39.195 0 00-26.934 36.679v15.176a17.81 17.81 0 0026.394 14.586 17.81 17.81 0 009.164-14.586v-15.344c.113-2.02 2.578-2.914 2.914-3.027zm-188.83 152.661h-84.562a8.397 8.397 0 00-8.117 9.914 51.57 51.57 0 0027.75 36.363c14.414 7.133 31.332 7.133 45.746 0s24.676-20.578 27.75-36.363a8.405 8.405 0 00-1.906-7.012 8.411 8.411 0 00-6.66-2.902zm-73.527-58.293c0-4.68-1.859-9.168-5.168-12.477-3.309-3.305-7.797-5.164-12.473-5.164s-9.168 1.859-12.477 5.164a17.649 17.649 0 000 24.95c3.309 3.309 7.797 5.164 12.477 5.164s9.164-1.855 12.473-5.164a17.643 17.643 0 005.168-12.473zm81.645-17.867a17.656 17.656 0 00-12.352 5.273 17.635 17.635 0 00.106 24.839 17.639 17.639 0 0024.839.106 17.654 17.654 0 005.273-12.352 17.648 17.648 0 00-17.867-17.867h.001z"></path>
                    </svg>
                    <p>Close</p>
                </ActiveIcon>
            )
        }
    }

    function FeedbackBtn() {
        if (!feedback) {
            return (
                <Icon
                    onClick={() => setFeedback(!feedback)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="514.322"
                        height="539"
                        data-name="Layer 1"
                        viewBox="0 0 514.322 539"
                    >
                        <path d="M371.258 113.211a6.954 6.954 0 00-.544-9.458 7.059 7.059 0 00-9.526-.223L235.02 210.023l-66.407-25.576a16.145 16.145 0 01-8.82-8.096 15.98 15.98 0 01-.768-11.909 16.098 16.098 0 017.708-9.151L442.696 1.721a13.686 13.686 0 0114.081.476c4.238 2.747 6.597 7.608 6.114 12.616l-24.403 250.762c-.471 5.18-3.37 9.834-7.824 12.562s-9.943 3.211-14.807 1.301l-80.906-31.079-45.32 42.243c-3.161 2.812-7.284 4.316-11.526 4.201s-8.28-1.838-11.279-4.819a16.451 16.451 0 01-4.864-11.207v-29.869l109.295-135.696zM502.07 303.252a36.23 36.23 0 00-26.04-8.878 36.151 36.151 0 00-24.758 11.96l-87.545 99.45c-7.755 8.671-18.872 13.636-30.544 13.64h-81.57c-6.029-.418-10.712-5.402-10.712-11.414s4.682-10.996 10.712-11.414h71.939a34.857 34.857 0 0025.465-9.607c6.821-6.511 10.673-15.504 10.673-24.904s-3.852-18.397-10.673-24.908a34.856 34.856 0 00-25.465-9.607h-92.524a145.704 145.704 0 00-82.592-7.574c-27.684 5.533-53.14 18.984-73.235 38.706L0 432.35 130.98 539l29.714-29.535h170.665c24.797.015 48.385-10.636 64.686-29.205l109.35-126.51a35.669 35.669 0 008.851-25.929 35.72 35.72 0 00-12.17-24.567h-.005z"></path>
                    </svg>
                    <p>Feedback</p>
                </Icon>
            );
        } else if (feedback) {
            return (
                <ActiveIcon
                    onClick={() => setFeedback(!feedback)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="514.322"
                        height="539"
                        data-name="Layer 1"
                        viewBox="0 0 514.322 539"
                    >
                        <path d="M371.258 113.211a6.954 6.954 0 00-.544-9.458 7.059 7.059 0 00-9.526-.223L235.02 210.023l-66.407-25.576a16.145 16.145 0 01-8.82-8.096 15.98 15.98 0 01-.768-11.909 16.098 16.098 0 017.708-9.151L442.696 1.721a13.686 13.686 0 0114.081.476c4.238 2.747 6.597 7.608 6.114 12.616l-24.403 250.762c-.471 5.18-3.37 9.834-7.824 12.562s-9.943 3.211-14.807 1.301l-80.906-31.079-45.32 42.243c-3.161 2.812-7.284 4.316-11.526 4.201s-8.28-1.838-11.279-4.819a16.451 16.451 0 01-4.864-11.207v-29.869l109.295-135.696zM502.07 303.252a36.23 36.23 0 00-26.04-8.878 36.151 36.151 0 00-24.758 11.96l-87.545 99.45c-7.755 8.671-18.872 13.636-30.544 13.64h-81.57c-6.029-.418-10.712-5.402-10.712-11.414s4.682-10.996 10.712-11.414h71.939a34.857 34.857 0 0025.465-9.607c6.821-6.511 10.673-15.504 10.673-24.904s-3.852-18.397-10.673-24.908a34.856 34.856 0 00-25.465-9.607h-92.524a145.704 145.704 0 00-82.592-7.574c-27.684 5.533-53.14 18.984-73.235 38.706L0 432.35 130.98 539l29.714-29.535h170.665c24.797.015 48.385-10.636 64.686-29.205l109.35-126.51a35.669 35.669 0 008.851-25.929 35.72 35.72 0 00-12.17-24.567h-.005z"></path>
                    </svg>
                    <p>Close</p>
                </ActiveIcon>);
        }

    }

    const handleClick = (e) => {
        if (e.target.classList.contains('backdrop')) {
            setReadMe(false)
            setFeedback(false);
        }
    }

    function ReadMe() {
        useEffect(() => {
            setFeedback(false);
        }, [feedback])

        fetch(ReadMeMD).then(res => res.text()).then(text => setReadMeText(text));
        return (
            <>
                <Panel>
                    <div className='markdown'>
                        <ReactMarkdown>{readMeText}</ReactMarkdown>
                        <br />
                    </div>
                    <Gear />
                </Panel>
                <Backdrop onClick={(e) => handleClick(e)} className='backdrop' />
            </>
        );
    };

    function Feedback() {
        useEffect(() => {
            setReadMe(false);
            // commentBox('5724094653792256-proj');

            // return () => {
            //     commentBox('5724094653792256-proj').removeCommentBox();
            // }
        }, [readme])

        return (
            <>
                <Panel>
                    <div className='commentbox'>
                        email aite@nabla.ooo
                    </div>
                    <Gear />
                </Panel>
                <Backdrop onClick={(e) => handleClick(e)} className='backdrop' />
            </>
        );
    };

    // Access the status element
    // useEffect(() => {
    // const statusCurrent = statusRef.current;
    // if (statusCurrent) {
    //     const observer = new MutationObserver(
    //         function (mutationsList, observer) {
    //             if (mutationsList[0].target.textContent === 'Ready' || stat.ready) {
    //                 ready();
    //             }
    //         })
    //     if (observer) {
    //         observer.observe(statusCurrent, { characterData: true, childList: true, attributes: false, subtree: true })
    //     }
    // }
    //     if (stat.load === 'Ready' && stat.ready && !stat.started) {
    //         ready();
    //     }
    // }, [stat.load])

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
        stat.mobile = true;
        return (
            <MobileCaption style={{ top: "50% !important", translate: "transform(-50%, -50%) !important" }}>
                Use a <b>computer</b> with
                <br /> a <b>webcam</b> to playtest <br />
                <i>Gear and Loading</i>
            </MobileCaption>
        )
    } else {
        // not mobile
        return (
            <>
                <CD />
                {readme ? <ReadMe /> : null}
                {feedback ? <Feedback /> : null}
                <Caption
                    className='caption'
                    style={!stat.caption ? { pointerEvents: "none", opacity: 0, transition: `${stat.transition}` }
                        : { pointerEvents: "all", opacity: 1, transition: "0.2s" }}
                >
                    {/* Caption */}
                    <p>
                        <i>Gear and Loading</i> c/o <a id='a' href='https://nabla.ooo/'>Nabla</a><br />
                        This is a work in progress, follow it's development on <a id='a' href='https://github.com/nohr/gear'>Github</a>.
                    </p>
                    {/* Instructions */}
                    <p style={{ paddingTop: '10px' }}>&#9733; Instructions &#9733;
                        <br />Go to a well-lit area then take a few steps from your computer.
                        <br />Point, close, and open your right hand to test detection.
                    </p>
                    {/* ReadMeBtn and Feedback */}
                    <br /><div className='aboutfeedback'>
                        {/* {supported && <><Button onClick={getContacts}>Send this to someone!</Button><p> or </p></>} */}
                        <ReadMeBtn /><FeedbackBtn /></div>
                    <br />
                    {/* Options */}
                    <Options />
                    {/* Status area */}
                    <div className='statusarea'>
                        <p>Camera stream is in <b>{!snap.selfie ? "Laptop" : "External"}</b> mode</p>
                        <br />
                        <Status
                            className={snap.load === "closed" ?
                                "closed" : snap.load === 'open' ?
                                    "open" : snap.load === 'point' ?
                                        "point" : null}>
                            {snap.load}
                        </Status>
                        {snap.location.x && snap.start &&
                            <>
                                <p>x: {`${snap.location.x}`} </p><p>y: {`${snap.location.y}`} </p>
                                {/* <p>w: {`${snap.location.w}`} </p>
                            <p>h: {`${snap.location.h}`} </p> */}
                            </>}
                    </div>
                </Caption>
            </>
        )
    }
}

export default UI

// SVG and styles
const Overlay = styled.svg`
    pointer-events: none;
    position: fixed;
    z-index: 3;
    overflow: hidden;
    height: auto;
    bottom: 79px;
    left: 50%;
    transform: translateX(-50%) scale(2);
    opacity: 0.3;
    fill: ${props => props.theme.sub};
    filter: drop-shadow(1px 0px 1.75px ${props => props.theme.sub} ) !important;
`
function Gear() {
    return (
        <Overlay
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 658.2 326"
            xmlSpace="preserve"
        >
            <path d="M430.5 551c-2.8-1.8-5.3-3.7-8.2-5.2-2.1-1.1-3.9-2.6-5.8-3.9-3.3-2.1-6.5-4.4-9.9-6.3-1.8-1-3.4-2.5-5.2-3.7-1.4-1-2.8-1.8-4.2-2.8-2.5-1.8-5.1-3.3-7.6-5.2-2.1-1.6-4.3-3-6.5-4.5-1.6-1.1-3.2-2.4-4.8-3.6-1.4-1-2.9-1.9-4.3-2.9-2-1.4-4.1-2.8-6.1-4.2-2-1.4-4-2.8-6.1-4.1-1.7-1.1-3.3-2.3-5.1-3.4-3.8-2.5-7.6-5.1-11.4-7.6-3-2-5.9-3.9-8.9-5.8-1.6-1-3.3-2.2-5-2.9-1.3-.6-2.3-1.6-3.4-2.4-2.1-1.5-4-3.4-6.1-5-2.2-1.7-4.2-3.7-6.7-4.9-1.5-.7-3.1-1.5-4.6-2.2-1.3-.6-2.6-.9-3.8-1.3-1.4-.5-2.8-.9-4.3-.9-1.6 0-3.1-.3-4.5-.8-.3-.1-.7-.1-1.1-.1-1 0-2-.2-3.1-.4-2.2-.5-4.5-1.1-6.8-1-.5 0-1.1-.3-1.7-.4-.8-.2-1.6-.4-2.4-.5-.8-.1-1.7-.1-2.5 0-2.4.2-4.6-.7-6.9-1.2-1.9-.4-3.7-1.6-5.8-1.2-1.5-.9-3.3-.1-4.8-.7-1.6-.6-3.4.1-5-.3s-3.4-.1-4.9-1.1c-.3-.2-.7-.2-1.1-.2-1.4.1-2.7-.4-4.1-.8-.6-.2-1.2-.1-1.8-.2-4.3-.2-8.6-.7-13-.5-.8 0-1.7-.1-2.3-.5-1-.6-1.9-.3-2.8-.4-1-.1-1.9.1-2.8-.5-1.4-.8-3-.5-4.5-.9-.8-.2-1.8-.1-2.6-.6-.9-.5-1.7-.4-2.6-.4h-6.2c-1.1 0-2-.3-2.8-1.1-.9-.9-1.9-1.3-3.2-1.3-1.2.1-2.3-.1-3.5 0-3.3.3-6.5-.7-9.8-.5-2.4-.9-4.8-.3-7.2-.5-1-.1-2-.4-3-.4s-1.8-.7-2.7-.8c-2.3-.2-4.3-1.4-6.5-1.7-1.6-.2-3.2-.1-4.7-.4-2.7-.6-5.4-.3-8.1-.4-.2 0-.3.1-.5 0-1.3-.9-2.9-.8-4.3-1.3-1.2-.4-2.3-.9-3.3-1.5-1.3-.7-2.8-.5-4.2-.4-.9 1.2-2.5.9-3.7 1.2-1.2.3-2.1 1.4-3.5 1.1-1.1 1.1-2.7.7-3.9 1.8-1.1.9-1.8 2.1-2.5 3.2-3.2 5-6.6 9.9-9.9 14.9-3.2 4.7-6.4 9.4-9.4 14.2-1.2 1.9-2.8 3.6-3.7 5.6-1 2-2.2 3.8-3.4 5.5-1.7 2.2-2.8 4.8-4.6 6.9-2.1 2.6-3.4 5.8-5.8 8.3-.8 2.1-2.2 3.9-3.5 5.7-2 2.7-3.6 5.7-5.7 8.3-1.3 1.6-2.2 3.6-3.5 5.2-1 1.4-1.7 2.9-2.8 4.2-.6.6-.8 1.5-1.3 2.2-3.2 4.5-6.1 9.2-9.3 13.7-1.3 1.8-2.5 3.8-3.8 5.6-1.3 1.8-2.6 3.7-3.8 5.6-1.8 2.9-3.9 5.6-5.7 8.5-2.1 3.2-4.2 6.4-6.4 9.6-1.4 2-3.1 3.8-4.3 5.9-.9 1.6-2 3-3.1 4.5-1.4 2-2.8 3.9-4.2 5.9l-1.8 2.7c-.9 1.6-2.4 2.7-3.2 4.5-.7 1.6-2.3 2.7-2.9 4.4-2.8 2.8-4.6 6.3-7 9.4-2.6 3.4-5.2 6.7-7.4 10.3-.4.7-1.1 1.2-1.8 2.1v-1.9-63.6c0-1.5.4-2.9.8-4.3.1-.4.1-.9.1-1.3 0-1.8.1-3.6 0-5.3-.3-3.4.7-6.6.5-10 .9-2.7.2-5.6.5-8.4.9-9.4.3-18.8.4-28.3.1-9.5 0-19 0-28.5v-28.2-28.5c0-1.5.7-2.7 1.2-3.9.9-2 2.3-3.7 3.4-5.5.5-.8 1-1.6 1.6-2.4 1.2-1.4 2.4-2.7 3.6-4.1 4.5-5.4 9.8-9.9 14.5-15.1 2-2.2 3.6-4.8 5.3-7.3l.3-.6c1.4-1.6 2.8-3.2 4.3-4.7 2.6-2.8 5.4-5.4 7.8-8.4 1.6-1.9 3.4-3.4 4.9-5.4 1.8-2.4 4.1-4.3 6.1-6.5 5.8-6.7 12.4-12.6 18.5-18.9.7-.7 1.6-1.3 2.4-2 .8-.7 1.6-1.3 2.4-2 1.6-1.4 3.3-2.8 5.1-4 1.8-1.3 3.7-2.5 5.6-3.8 1.9-1.2 3.8-2.2 5.9-3.1 2.9-1.3 5.7-2.7 8.9-3.2.5-.1.9-.4 1.4-.6.3-.1.7-.3 1-.4.9-.2 1.7.3 2.6-.4.6-.4 1.6.2 2.3-.5.2-.2.9 0 1.4 0h8.1c1.2 0 2.4.1 3.5.4 1 .3 2.3-.3 3.3.5.2.2.6 0 .9 0 .9 0 1.7.1 2.6.4 2.3.7 4.7 1.2 7.1 1.9 1.3.4 2.6.7 3.9 1.2 3.7 1.4 7.4 3 11 4.6 3.1 1.4 6.3 2.6 9.5 3.8 3.1 1.2 6.3 2.3 9.4 3.5 1 .4 1.9.4 3-.1 2-.9 3.4-2.4 4.8-4 1.2-1.4 2.2-3.1 3.3-4.6 1.4-2 2.7-4 4.2-5.9 1-1.3 2.1-2.4 3.3-3.5.4-.4 1.2-.6 1.8-.6 1.1 0 2-.2 3.1-.5.8-.2 1.7-.1 2.6-.4 1.3-.5 2.8-.4 4.2-.6 1.4-.2 2.9 0 4.3-.8.1-.1.3 0 .5 0 3.8.1 7.6-.8 11.4-.5 1.3.1 2.4.8 3.7.5 1.2-.3 2.3.5 3.5.5.2 0 .5.1.6.3.8 1.7 2.5 2.8 3.4 4.6.6 1.3 1.9 2.3 2.9 3.4 1.2 1.5 2.5 2.9 3.6 4.5 1 1.5 2.3 2.8 3.2 4.5.4.8 1.2 1.2 2.2 1.2 2.1.1 3.8-1 5.6-1.7 3.9-1.6 7.6-3.6 11.6-4.9 1.3-.4 2.5-1.1 3.7-1.6 1.8-.7 3.6-1.3 5.4-2 1.1-.4 2.1-.9 3.1-1.4 2-.8 4.1-1.6 6.1-2.5 1.4-.6 2-1.5 2-3.1-.1-9.1 0-18.2-.1-27.3 0-1.2.3-2 1.2-2.8 3.6-3.3 7.3-6.6 10.6-10.1.3-.4.8-.8 1.2-.5 1.2.9 2.6.2 3.9.7 1.1.5 2.6.1 3.9.2.8.1 1.6.1 2.3.5 1.2.5 2.3.3 3.5.4.9.1 1.9.3 2.8.5.9.2 1.9-.2 2.9.4.8.4 2 .3 2.9 0 .7-.2 1.5-.5 1.9-1.5 1-2.4 2.4-4.7 3.2-7.2.2-.7 1.1-1.2 1-2.1 1.1-1.4 1.4-3.3 2.3-4.8 1.1-1.7 1.6-3.7 2.7-5.4.9-1.5 1.5-3.2 2.2-4.9.7-1.5 1.6-3 2-4.7.2-.6 1-1.1.9-1.9 1-1 .3-2-.2-2.8-1.2-1.9-2.7-3.7-4.1-5.5-1.7-2.3-3.5-4.5-5-7-.6-.9-1.6-1.4-1.9-2.4-.3-1.1-1.1-1.7-1.8-2.5-1.3-1.7-2.5-3.4-3.8-5.1-.3-.4-.5-.9-.8-1.3-.9-.8-.8-1.8-.4-2.7.4-.9.8-1.7.7-2.7 0-.2.1-.4.3-.6.9-1.2.6-2.7 1-4 .2-.7.2-1.7.6-2.3.7-1 .2-2.1.7-3.2.4-.9.5-2 .7-3 .3-1.1.3-2.3 1-3.3.6-.9.7-2 1.1-3 2.3-5.8 3.1-6.5 5.9-10.5 1.2-1.7 2.5-3.1 4.2-4.2.9-.6 1.4-1.5 2.4-2 .2-.1.4-.6.4-.9 0-1.1.4-2.3-.8-3.1.1-1.1-.7-1.9-1-2.8-1.3-3.2-2.9-6.2-3.7-9.6-.1-.3-.4-.6-.4-1-.4-2.5-1.4-6-2.6-8.2-1.2-2.4-2.6-4.6-4.6-6.4-.9-.8-1.7-1.8-2.6-2.6-1-.8-1.2-1.9-.7-2.8.3-.6.3-1.1.3-1.7 0-2.2.1-4.5 0-6.7 0-1-.3-2-.4-3-.2-.9.4-2-.4-2.8-.2-.2 0-.7 0-1.1v-5.6c0-.9.4-1.9.4-2.8.1-1-.2-2.1.1-3 .5-1.5.4-3 .4-4.5 0-1.4.1-2.8.7-4.1.1-.3.2-.6.2-.8.1-1.9.1-3.7.4-5.6.5-2.6.1-5.3.6-7.9.5-2.7.3-5.4.4-8.2.1-2.8.3-5.6-.1-8.3-.4-3-.3-5.9-.4-8.8-.1-3-.3-6 0-9 .7-6.4.2-12.8.4-19.3 0-.6.3-1.3.5-1.9.4-1.3.6-2.7 1-4 .5-1.3.8-2.5.8-3.8 0-1.1 1.2-1.3 1.9-1.5 1.4-.4 2.9-.5 4.4-.6 2.2-.1 4.3.4 6.5.5.6 0 1.2.2 1.7.5 2.4 1.3 5.1 1.9 7.4 3.3 3 1.7 6 3.5 8.4 6 1.6 1.7 3.3 3.4 4.6 5.5 1 1.7 1.5 3.5 2.5 5.2.7 1.3 1.1 2.8 1.7 4.1.7 1.7 1.8 3.3 2.2 5.1.4 2 1.9 3.7 1.6 5.8 0 .1 0 .3.1.4 1.1 1.3.8 2.8.8 4.3V67c0 .8.1 1.6 0 2.3-.1.7-.5 1.3-.8 2-.1.1-.1.3-.1.4.2 2.1-.8 4.2-.5 6.3.2 1-.2 1.9-.5 2.8-.2.9.3 1.8-.4 2.6-.2.3-.1.9-.1 1.3 0 4.9-.3 9.7.1 14.6.3 3.7.2 7.3.4 10.9.1 1.2-.6 2.3-.5 3.5.1 1.2.1 2.3 0 3.5-.2 1.6.6 2.8 1.3 4.1.5.9.9 1.9 1.5 2.8.6.9.9 1.8.9 2.9 0 .3.2.5.4.8.4.8.6 1.6.6 2.6-.1 2.5.8 4.9.4 7.4-.9 5.2-.3 10.5-.4 15.8-.1 5.3 0 10.6 0 16v32c0 1.4-.5 2.5-.9 3.8-.3 1.2-.7 2.3-1.2 3.4-.7 1.7-1.7 3.2-2.6 4.7-1.3 2.1-3 3.8-4.3 5.9-1.5 2.5-3.3 4.8-4.9 7.2-2 3-4 6-5.9 9.1-1.1 1.8-2.4 3.6-3.4 5.5-.9 1.9-1.4 3.6-.2 5.6.4.6.7 1.4 1.2 2.1.9 1.2 1.6 2.6 2.5 3.8 2.2 3.3 4.3 6.6 6.6 9.8.8 1.1.8 2.1.3 3.1-1.2 2.8-2.3 5.7-3.6 8.5-.9 2.1-1.9 4.2-2.8 6.3-.3.6-.7 1.1-.8 1.7-.2 1.6-1.4 1.9-2.6 2-1.7.3-3.2 1.3-4.9 1-1.1.9-2.5.7-3.7 1-1.2.4-2.5.9-3.7 1.1-1.8.2-3.3 1.1-5.1 1.2-.7 0-1.4.3-2.1.5-.4.1-.8.3-1.2.3-1.4.1-2.4 1.1-2.6 2.5v.9c.1 1.6-.3 3.1-.8 4.5-.1.1-.1.3-.1.4-.2 1.9-.3 3.9-.5 5.8 0 .7-.1 1.3-.4 1.9-.5 1-.6 2.1-.5 3.3.1.8.1 1.6-.4 2.4-.3.4-.4 1.1-.5 1.6-.1.5 0 1.1 0 1.6-.1 1.4-.4 2.8-.4 4.2-.1 1.3-.6 2.6-.8 3.8-.3 1.4-.1 2.9-.1 4.4 0 .3.2.6.4.7 2.4 1.4 4.3 3.5 6.7 5 1.6 1 3.1 2.3 4.5 3.6.9.7 1.2 2.2.5 3.3-.6 1-.6 1.9-.7 3-.2 1.5-.6 3-1.1 4.4-.3 1-.4 2.1-1 3.1-.5.9-.3 2.2-.7 3.2-.3 1-.9 2-.9 3.1-1.2 1.3-.7 3.2-1.6 4.7-.3.4-.2 1.1-.4 1.7-.2.8-.4 1.7-.8 2.4-.5.8-.2 1.6-.5 2.4-.4 1-.6 2.1-1.1 3-.4 1 .1 2.1-.7 3-.7.8-.2 2-.5 2.8-.8 1.5-.6 3.3-1.2 4.8-.1.3-.2.8-.1 1.1.3 1.4-.3 2.7-.6 4-.1.7-.4 1.4-.4 2.1v6.7c0 3.6.2 3.8 2.2 7.4 1.8 3.1 3.2 6.5 4.8 9.8 1.3 2.7 2.5 5.7 5.8 6.8.1 0 .2.3.3.3.8.2 1.8.3 2.5.7.9.6 1.5 1.5 2.3 2.2 2.3 2.1 4.4 4.4 6.9 6.3 1.7 1.3 3.1 2.9 4.7 4.3 2.4 2.2 4.7 4.6 7.2 6.7 1.6 1.3 2.9 2.9 4.5 4.1 1.7 1.3 3 3 4.7 4.2 1.6 1.3 3 2.8 4.5 4.1 3.2 2.7 6.2 5.6 9.3 8.3 2.7 2.3 5.3 4.7 8 7 2.3 2.1 4.6 4.1 7 6.1 2.3 1.8 4.3 3.8 6.7 5.5 1.6 1.1 2.9 2.6 4.4 3.9.4.3.9.6 1.3.9 2 1.6 4 3.2 5.8 4.9 1.7 1.6 3.2 3.3 4.9 4.9 2 1.8 3.3 4.1 4.8 6.4.7 1.1 1.3 2.4 1.9 3.6 1.3 2.5 2.2 5.1 3.1 7.7.1.3.1.6.1.9.2 1.2.1 2.6.5 3.7.3.7.4 1.4.4 2.2 0 .9-.2 1.9.8 2.4.5 1.6.9 3.3.4 5 0 .1-.2.1-.2.2 0 2.2-.3 4.2-1 6.3-.3.8.1 2-.3 2.7-.4.8.2 1.8-.7 2.3.3 1.5-.8 2.6-1.3 3.9-.5 1.3-1.1 2.5-1.7 3.7-.7 1.4-1.6 2.7-2.1 4.2.4.9-.3 1.8-1 2.8zm-99.1-263.9c1.3-.2 2.5-.3 3.6-.6s2.3-.5 3.3-.9c1.3-.5 2.8-.2 4-1 .9-.6 1.9-.2 2.7-.8.5-.4 1.4 0 2.1-.5.6-.4 1.4-.4 2.1-.5.7-.2 1.5-.2 2.1-.5.6-.3 1.3-.3 1.9-.5 1.2-.2 2.4-.6 3.4-1.3 1.2-.8 1.3-2.3 2.1-3.3.3-.4.2-1.2.5-1.9.8-1.9 1.8-3.7 2.4-5.7.2-.9.8-1.9 1.3-2.7.3-.5.5-.9.5-1.4.1-2.2.2-2.3-1.3-4.1-2.1-2.5-3.5-5.6-5.6-8.1-1.1-1.2-1.5-3.1-2.6-4.2s-1.2-2.2-1.1-3.5c0-.8-.1-1.7 0-2.5.1-1 .3-2.1.8-2.9.6-1 .7-2.3 1.9-2.9 1.3-2.7 3-5.3 4.7-7.8 1-1.4 1.9-2.9 2.8-4.4 1.8-2.6 3.6-5.1 5.4-7.7 1.2-1.8 2.5-3.5 3.7-5.4 1.2-2 2.7-3.9 3.4-6.2.3-1 1.4-4.7 1.4-5.4v-21.1c0-6.9-.1-13.9 0-20.8.1-7-.4-13.9.4-20.9.2-1.5-.1-3.1-.3-4.7-.2-1.1-.3-2.4-.6-3.5s-.3-2.5-1.3-3.4c.4-1.1-1.4-1.5-.9-2.6-.9-.7-1-1.8-1.6-2.5-.9-.9-.9-1.8-.4-2.9.1-.2.2-.4.2-.6-.3-2.6.5-5.1.5-7.7-.1-4.1.3-8.2-.5-12.3.2-5-.5-10.1.4-15.1.3-1.6.1-3.4 0-5.1 0-1.1.1-2.1.5-3 .3-.8.5-1.5.5-2.4 0-.4-.2-.9 0-1.1.7-.7.1-1.8.5-2.3.6-.8.3-1.6.4-2.4.1-.3.3-.5.3-.8.1-.4.3-1 .1-1.3-.5-.7-.3-1.4-.4-2.1-.1-.7-.3-1.4-.5-2.1-.2-.9-.7-1.8-.5-2.8-.9-.6-.8-1.7-1.1-2.5-.9-2.2-1.8-4.3-2.8-6.5-.9-2-1.7-3.9-2.6-5.9-1.1-2.5-2.6-5.3-4.2-6.8-1.8-1.8-3.7-3.3-5.9-4.7-1.2-.7-2.4-1.3-3.6-2-1.1-.7-2.4-1.5-3.6-1.7-1-.2-1.4-1-2.3-1.1-1.8-.2-3.5-1.3-5.4-.9h-.2c-1.1-.2-2.6-.1-3.6.4-.4.2-.9.1-.8.8-1.1.5-.8 1.7-1.1 2.5-.5 1.3-1 2.6-1.1 3.9-.2 1.6-.2 3.3-.4 4.9-.3 2 0 4-.1 6-.1 1.9-.4 3.9-.4 5.8-.1 4.1-.1 8.2 0 12.3.1 4.1-.3 8.2.4 12.3.4 2.5-.1 5.1.1 7.6s-.5 4.9-.5 7.4c0 2.2.2 4.4-.5 6.5-.2.5-.5 1-.4 1.4.3 2.9-.6 5.7-.5 8.6 0 .9 0 1.7-.3 2.6-.5 1.4-.6 3.1-.5 4.6.2 4.9-.4 9.7.4 14.6.4 2.7.1 5.5.1 8.3 0 1 .4 1.8.8 2.6 2.2 1 3.2 3.2 4.6 4.8 1.3 1.5 2 3.5 2.9 5.2.6 1.1.3 2.6 1.4 3.6.1.1 0 .3 0 .5 0 2.3 1.3 4.3 1.5 6.6 1.9 4.2 3.7 8.3 5.6 12.5.3.7.9 1.3.8 2.2 1 .9.3 1.3-.4 1.6-1.7.8-3.3 1.7-4.6 3-2.2 2.1-4.6 4.1-6.1 6.9-.7 1.3-1.1 2.7-2.2 3.7-.2.1.1.6-.1.9-1.4 2.6-2.1 5.5-3 8.2-.7 2.1-.9 4.2-1.6 6.3-.3.8-.1 1.9-.5 2.5-.7.9-.1 1.9-.6 2.8-.5.9-.5 2.1-.7 3.2-.1 1 .2 2.1.9 2.9 2.5 3 4.6 6.3 6.9 9.4 1.7 2.3 3.5 4.6 5 7.1 1.5 2.4 3.3 4.7 5.1 6.9.7.9.8 1.6.2 2.6-.9 1.4-1.1 3.3-2.3 4.6-.1 1.7-1.2 2.9-1.9 4.3-.6 1.4-1.1 3-1.9 4.3-1.2 2.1-2.2 4.2-3.1 6.4-1.1 2.5-2.2 5.1-3.4 7.6L334 273c-.7 1.4-1.5 2.8-2 4.3-.1.4-.6.8-.9.8-.8.1-1.8.2-2.5 0-1.8-.6-3.6-.8-5.4-.9-2.1-.1-4.2-.6-6.3-.4-.1 0-.3 0-.4-.1-1.5-.6-3.1-.9-4.8-.8-.7 0-1.6.3-2-.1-.9-.6-1.7-.5-2.5-.2-.9.3-1.7.7-2.4 1.4-2.2 2.4-4.5 4.6-6.9 6.9-.7.7-1 1.4-1 2.4V317c-1.1.1-1.9.8-2.8 1.1-2.4.8-4.8 1.8-7.2 2.7-.7.3-1.3.9-1.9.8-1.1-.2-1.4.8-2.2 1-3.5 1-6.8 2.6-10.1 4-2.1.9-4.3 1.5-6.2 2.9-1.7.1-2.9 1.2-4.4 1.7-2.4.9-4.6 1.9-7.2 1.5-.4-.1-.8 0-1.2 0-.8 0-1.5.1-1.8-1-.1-.3-.4-.6-.7-.9-1.3-1.6-2.5-3.1-3.8-4.7-.4-.5-.7-1.1-1.2-1.6-1.7-1.7-2.6-4-4.6-5.5v-.2c-1.1-1.4-2-3-3.4-4.1-.5-.4-1.1-.8-1.7-.9-1.8-.3-3.6-.3-5.4-.5-3-.3-6 .5-9.1.5-.9 0-1.7 0-2.6.4-1.1.4-2.3.4-3.5.5-1 .1-1.9 0-2.8.5-.8.5-1.7.4-2.6.5-1.1.1-2.2.3-3.3.5-.1 0-.3.1-.4.2-1.2 1.2-2.6 2.3-3.6 3.6l-6 8.4c-1.9 2.6-4.5 4.4-6.8 6.6-.4.4-1.2.4-1.8.6-1.4.3-2.6-.5-3.8-.9-1.9-.7-4-1.2-5.8-2.2-2.3-1.1-4.9-1.5-7.2-2.8-.7-.4-1.8-.2-2.3-1-.1-.1-.3 0-.4 0-.8.1-1.4-.4-2-.7-1.4-.6-2.8-1.2-4.2-1.7-1.3-.4-2.6-.9-3.7-1.6-1.5-1-3.2-1.4-4.8-1.9-1.3-.5-2.6-1.2-4.1-1.3-.7-.1-1.2-.7-2-.7s-1.5-.6-2.4-.4c-.3.1-.8 0-1.1-.2-1-.8-2.1-.7-3.2-.7-.7 0-1.3-.1-1.9-.4-1-.5-2.1-.6-3.3-.5-1.2.1-2.3.1-3.5 0-.5 0-1.2-.6-1.4-.4-.6.6-1.3.4-1.9.4-2.4.1-4.8-.4-7 .9h-.2c-1.9-.4-3.4.7-5.2 1-1.6.3-3.2 1.2-4.8 1.8-1.6.6-3.1 1.5-4.6 2.3-1.3.6-2.5 1.6-3.7 2.2-3 1.5-5.5 3.6-8.1 5.6-2.7 2.1-5.4 4.4-7.8 6.8-4.9 4.9-10 9.5-14.5 14.8-1.9 2.3-4.3 4.3-6.2 6.7-1.6 2.1-3.8 3.7-5.4 5.9-1.4 1.8-3.1 3.3-4.6 5-2.4 2.9-5.1 5.5-7.6 8.2-.8.8-1.4 1.7-2 2.6-1.1 1.9-2.3 3.7-3.8 5.4-2.5 2.9-5.2 5.6-7.8 8.3-3.2 3.5-6.9 6.5-9.8 10.3-2 2.5-4 5-5.4 8-.2.5-.5 1.1-.9 1.5-.4.4-.5.8-.5 1.4-.2 8 .2 16.1-.4 24.1-.4 5.1-.1 10.3-.1 15.5 0 5.1-.1 10.2 0 15.3.1 5.1-.5 10.2.4 15.3v34.2c0 1.4 0 2.8-.4 4.2-.5 1.9-.5 4-.5 6-.1 2.6 0 5.2 0 7.9 0 .5.2 1 0 1.4-.6.9-.3 1.9-.4 2.8-.1.9-.4 1.9-.4 2.8-.1 1.7.1 3.4 0 5.1-.1 1.6.2 3.1-.3 4.7s-.1 3.4-.1 5v12.7c0 1.3.4 2.6-.4 3.8-.1.2-.1.7 0 .9.7 1.3.4 2.7.4 4V613.6c1.3.4 1.8-.5 2.3-1.2.5-.7.9-1.5 1.4-2.2 1.6-2.2 3.2-4.4 4.7-6.6 1.3-1.9 2.6-3.9 3.9-5.8 1.5-2.1 3.4-4 4.7-6.2 2-3.3 4.5-6.3 6.5-9.6l1.8-2.7c1.4-2 3-3.8 4.3-5.9 1.4-2.1 3-4.1 4.2-6.3.2-.4.4-.8.7-1.1 2.2-2.1 3.4-5 5.2-7.4 1.6-2.1 3.1-4.2 4.4-6.5 1.2-2 2.6-3.9 3.9-5.8 1.1-1.6 2-3.2 3.2-4.7 1.2-1.4 2.2-3.1 3.2-4.7 1-1.5 1.9-3.1 2.9-4.6 1.8-2.7 3.7-5.4 5.5-8.1 2.6-3.9 5.1-7.7 7.7-11.6 1-1.5 1.9-2.9 3-4.3s2-3.1 3-4.6c1.5-2.2 3-4.4 4.4-6.7.9-1.6 2.1-3 3.1-4.5s1.9-3 2.9-4.6c1-1.5 2.1-3 3.1-4.5l2.4-3.6c2.2-3.4 4.5-6.8 6.7-10.2 1.1-1.7 2-3.4 3.4-4.8 1.3-3.2 3.7-5.7 5.4-8.6 1.9-3.2 4.3-6.2 6.2-9.5.2-.3.5-.6.9-.7 1.7-.6 3.4-1.2 5-1.8 1-.4 2.3-.4 3.3-1 1.1-.7 2.4-.3 3.6-.9.7-.4 1.5-.4 2.3-.5 1.9-.2 3.6.6 5.3 1.2 1 .4 2 .8 3 1.1.8.2 1.8.1 2.5.5s1.3.4 1.9.4c1.7.1 3.4-.3 5.2.4.8.3 1.8 0 2.8.1.9.1 1.9.4 2.8.4 1.3-.1 2.5.4 3.7.5 1.4 0 2.3 1.3 3.8 1 .8.6 1.6.9 2.7.9.9 0 1.9.3 2.8.4 1.7.1 3.5-.3 5.1.5 3-.3 6 .5 9.1.5h6c1.2 0 2.4-.3 3.4.1.9.4 1.5 1.5 2.3 2.2h5.4c1.6 0 3.1 0 4.7.4.8.2 1.8.3 2.5.6 1 .3 1.9.1 2.8.5 1.5.6 3.1.9 4.8.8.4 0 .9-.2 1.1 0 .9.9 2.1 0 2.8.5 1 .7 1.9.3 2.9.4 2.3.2 4.7-.2 7 .4 1.5.4 3.1.1 4.7.5 1.7.4 3.6.4 5.3.5.2 0 .4-.1.5 0 1.2 1.1 2.9.8 4.3 1.3s3.1.6 4.6.5c2.9-.2 5.7.7 8.6.5.3 0 .5.1.8.3 3 1.3 6 2.2 9.3 2 1 0 2-.1 3 .1 1.5.4 3 .8 4.5.8.5 0 1.2-.2 1.3 0 .6.9 1.6.2 2.3.7.7.4 1.7.3 2.6.4l2.4.3c.2 0 .5 0 .7.1 1.6.6 3.3.9 5 .9.5 0 1-.2 1.4 0 2.3 1.1 5 .8 7.2 2.3 1.4-.1 2.4.8 3.6 1.4 1.2.6 2.3 1.4 3.5 2.1 4 2.2 7 5.6 10.7 8.3 1.1.8 2.1 1.6 3.2 2.3 2.4 1.5 4.8 2.9 7.2 4.4 1.5 1 2.9 2.2 4.5 3.1 4 2.1 7.5 5 11.3 7.2 1.8 1.1 3.5 2.3 5.3 3.5 2.9 1.9 5.9 3.7 8.7 5.9 3 2.3 6.1 4.4 9.1 6.6 3.8 2.6 7.5 5.5 11.5 8 1.2.8 2.3 1.9 3.6 2.6 1.4.7 2.5 1.7 3.8 2.6 5 3.4 10 6.8 15.1 10 4.8 3 9.4 6.3 14.2 9.4 1 .6 2 1.4 3.1.9.7-1.3 1.2-2.4 1.8-3.6.9-1.7 1.9-3.4 2.6-5.2.4-.9.2-2.1.5-3 .4-1 .4-2 .5-3.1.1-1 .6-2 .4-3.1-.1-1.1.1-2 .6-3 .2-.4.4-1.2.2-1.5-1.1-1.1-.9-2.7-1.5-4-.2-.4-.3-.8-.3-1.3 0-1.3-.2-2.5-.4-3.8-.2-1.3-.5-2.5-.9-3.8-.4-1.4-.9-2.7-1.5-4-.6-1.3-.9-2.7-1.8-3.9-.5-.6-.7-1.2-1.1-1.8-1.1-1.6-2-3.3-3.3-4.6-2.5-2.6-5.2-5.1-8-7.5-1-.9-1.9-2-3.1-2.6-2.1-1.2-3.8-3-5.8-4.5s-3.8-3.2-5.7-4.8c-2.2-1.9-4.5-3.7-6.7-5.7-2.6-2.4-5.2-4.8-8-7-1.6-1.3-3-2.8-4.5-4.1-2.8-2.5-5.6-5.1-8.5-7.5-1.7-1.5-3.2-3.2-5-4.6-1.7-1.3-3.1-2.9-4.7-4.2-1.9-1.6-3.5-3.5-5.5-5.1-2.1-1.7-3.9-3.8-6-5.6-3.5-3-6.7-6.3-10-9.4l-.3-.3c-.4-.4-.8-.6-1.4-.6-.5 0-1.1-.3-1.6-.5-2.1-1.1-3.9-2.6-5.3-4.4-1.2-1.5-2.1-3.3-2.7-5.1-.5-1.4-1.7-2.4-1.4-4-1.3-1.3-1.9-3.1-2.8-4.6-.8-1.4-2.2-2.6-1.8-4.6-.9-.8-.2-1.9-.5-2.8-.3-.9-.5-1.9-.4-2.8.1-1.7.1-3.4.4-5.1.3-2 .9-4 .6-6-.1-.3.1-.7.2-1.1.7-1.8.8-3.7 1.1-5.5.1-.7.1-1.3.5-1.9.3-.5.6-1 .5-1.7-.2-.8.2-1.4.5-2.1.1-.3.3-.6.5-1 .5-1.6.2-3.4 1.4-4.7-.4-1.4.9-2.4 1-3.8.1-1.9 1.6-3.5 1.3-5.4l.2-.2c.9-.5.7-1.4.8-2.2.1-.8.3-1.7.7-2.5.8-1.5.5-3.3 1.6-4.7-.3-1.8 1.2-3.3 1-5.2-.1-.5.9-1.3.1-1.7-.7-.3-.3-1.2-1.2-1.5-1-.3-1.8-1.3-2.6-2-.6-.5-1.3-1-1.9-1.5-.6-.5-1.3-1-1.9-1.5-1.5-1.1-2.9-2.3-4.4-3.4-.6-.5-.9-1-.4-1.8.2-.3.3-.7.2-1-.2-1.4.3-2.7.5-4 .2-.8.4-1.5.4-2.4 0-1.3-.2-2.7.8-3.8.1-.1.1-.3.1-.4-.2-1.7.4-3.3.4-4.9 0-1.4.4-2.7.6-4 .1-.7.3-1.4.4-2.1 0-1.3-.2-2.7.8-3.9.2-.2.1-.7.2-1.1.2-1.9.1-3.8.5-5.6 0-1.8.6-4 .4-6.3z"></path>
            <path d="M621.2 412.5c-1.6 2.2-3.1 4.3-4.7 6.3-.3.5-.7.9-1 1.4-1.2 1.7-2.4 3.5-3.6 5.2-1.5 2.2-3.3 4.3-4.7 6.6-.1.2-.8.4-1 .3-1.7-1-3.6-.8-5.4-.9-1.1-.1-2.2-.6-3.3-.9-1.1-.2-2.2-.1-3.3-.2-1.5-.2-2.9-1-4.4-1.2-.9-.1-1.7-.8-2.5-1.2-1.4-.6-2.8-1.1-4.4-1.1-2 0-4 .2-5.9.9-1.5.6-2.8 1.5-4.1 2.3-2 1.3-3.8 2.7-5.7 4.2-1.6 1.3-3.3 2.5-4.9 3.8-1 .8-1.3 1.6-1.3 2.7V463.9c0 .5-.2 1.3.1 1.6.5.6 0 .9-.2 1-1.2.6-2.3 1.2-3.5 1.5-2 .4-3.8 1.4-5.7 1.9-1 .3-1.9.5-2.8.9-.9.4-1.8.7-2.9 1-1.2.3-2.5.7-3.6 1.4-1.2.8-2.7.5-3.9 1.3-.1.1-.8-.3-.9-.5-.3-.9-1.1-1.5-1.7-2.1-2.1-2.1-4-4.3-5.7-6.7 0-.1-.1-.1-.2-.2-2.1-2.2-4.1-4.5-6.2-6.7-.4-.4-.9-.9-1.2-1.3-1-1.4-2.1-1.9-3.7-1.3-1.3.5-2.5.8-3.9.7-2.1-.1-4.2.8-6.3.4-2 1-4.2.9-6.3 1-1.2.1-2.2 1-3.6.9-.3 0-.6.6-.8 1-3.1 6.3-6.3 12.5-9.4 18.8-.2.4-.3 1-.5 1.4-.4.7-.9 1.7-1.5 1.9-1.1.3-2.3.1-3.4-.1-1.4-.3-2.7-.8-4.1-.8-1.2 0-2.5-.4-3.7-.4-1.2 0-2.3-.3-3.4-.8-.3-.1-.7-.2-1.1-.2-.9 0-2.1.3-2.7-.1-.8-.6-1.8 0-2.5-.8-.3-.3-1.2 0-1.9 0 .2-1.7-1.2-3.1-1-4.9-1.2-.6-.7-1.9-1-2.8-.3-.9-1.1-1.8-1.2-2.7-.1-1.1-.5-2.1-.9-3.1-.3-.9-.3-2-.9-2.9-.4-.6-.2-1.4-.5-2.1-.2-.7-.2-1.5-.9-2 .1-1.4-1-2.4-1.1-3.7 0-.7-.3-1.1-1-1.3-2.4-.8-4.6-1.9-6.9-2.9-3.1-1.4-5.9-3.2-9.2-4-1.1-1.1-2.9-.9-4.1-1.8-.5-.4-1.2-.4-1.9-.5-.6-.1-1.1-.2-1.7-.4-.9-.3-2-.1-3 .3-2.9 1.1-5.3 3-7.9 4.4-2.5 1.4-4.8 3.2-7.3 4.6-.3.2-.7.3-1 .3h-4.6c-.9 0-1.7-.1-2.4-.9-.6-.6-1.5-.9-2.1-1.5-1.8-1.4-3.5-2.8-5.2-4.1-1.6-1.3-3.3-2.5-4.9-3.7-.7-.6-1.4-1.2-2-1.8-.2-.2-.3-.7-.2-1 .3-.9.3-2 .8-2.9.3-.5.3-1.3.5-1.9.8-1.5 1.3-3 1.4-4.7 1-.6.9-1.5.8-2.4v-.2c1-.6.8-1.7 1.1-2.6.3-.9.4-1.9.9-2.6.5-.9.1-2.2 1.3-2.7-.2-1 .3-1.8.8-2.7.5-1 0-2.1-.6-2.6-1.1-.9-1.1-2.4-2.2-3.3-.9-.8-1.4-2-2.1-3-.5-.7-1.1-1.4-1.3-2.2-.3-1-1.2-1.4-1.6-2.1-.5-.7-.8-1.5-1.3-2.2-1.7-2.5-3.5-5-5-7.7-.3-.6-.7-1.2-1.6-.4-.3.3-1 .1-1.6.1-2 0-4 0-5.9.8-1 .4-2.4.1-3.7.1-1.6 0-3 .5-4.5.8-.8.2-1.7.2-2.5.1-1.9-.2-3.7.6-5.6.5h-1.1c0-.9-.2-1.7-.7-2.5-.8-1.2-1.1-2.8-1.6-4.2-.8-2.1-1.7-4.2-2.3-6.4-1.2-1.1-1.2-2.7-1.8-4.1-.6-1.3-1.2-2.6-1.6-4-.4-1.5-.4-1.9.7-2.7 2.4-1.7 4.4-3.9 6.2-6.2 1-1.3 2.1-2.5 3.7-3.4 1-.6 1.8-1.5 2.7-2.3 1-.8 2-1.5 3.1-2.1.4-.2.9-.5 1.3-.8.4-.3.2-.5.1-1-.3-1.8-.5-3.7-.5-5.6 0-3.2-.8-6.3-.5-9.5 0-.5-.2-1.1-.4-1.7-.6-1.4-.5-3-.4-4.4.1-1.1-.5-1.8-1.2-2-1.8-.5-3.2-1.7-4.7-2.6-1.6-.9-3.1-1.7-4.7-2.7-3-1.8-5.9-3.6-8.9-5.3-1.4-.8-2.8-1.5-4.3-2.3.2-1.5.5-2.9.6-4.4.1-1.5-.3-3 .1-4.4.6-2 .3-3.9.4-5.8 0-1.4.4-2.8.7-4.1 0-.2.3-.4.2-.6-.5-2.2 1.2-2.8 2.6-3.7 2.4-1.4 5-2.2 7.5-3.1 2.9-.9 5.8-1.7 8.7-2.4.8-.2 1.5-.8 2.4-1 2-.4 3.8-1.2 5.5-2.3.3-.2.9-.5.9-.6-.4-1.4 1.3-2 1-3.3.9-.9.9-2.1 1.4-3.1.4-.8.6-1.6.9-2.4.7-1.7 1-3.6 1.9-5.2.5-1 .5-2.1 1-3.1s.9-2.1 1.4-3.1c.4-.7.4-1.3-.1-2.1-.6-.9-1-1.9-1.5-2.8-.5-.9-1.3-1.7-1.5-2.9-.1-.5-.6-.8-.8-1.3-.4-.9-1.2-1.5-1.5-2.6-.2-.9-1-1.7-1.4-2.7-.6-1.7-1.7-3.2-2.6-4.7-.6-1.1-1.5-2.2-1.9-3.4-.2-.6-.4-1.2-.9-1.7-.9-1.2-.9-2 .1-3.1 1-1.2 2.1-2.4 3.1-3.6 2-2.4 3.9-4.8 5.9-7.3.3-1.5 1.9-2 2.5-3.3.6-1.3 1.7-2.2 2.6-3.4 1.3.5 2.6 1 3.9 1.4 1.2.4 2.6.5 3.8 1 1.2.5 2.5.5 3.7 1.2.8.4 1.9.5 2.8 1 .9.5 2.2.2 3.2.6 1 .4 1.9.6 2.9.9 1.1.4 2.3.8 3.4 1.2.5.2.9.2 1.4-.2 2.1-1.5 4.1-3.2 6.2-4.7 2.2-1.5 3.9-3.5 6.3-4.7.8-.4 1.6-1.1 2.3-1.7.9-.8 1.7-1.6 2.9-2 .8-.3 1.2-1.1 1.2-2.2-.1-9 0-18 0-27.2 1.9-.6 3.7-1.4 5.6-2 1.7-.6 3.3-1.3 5-2 3.5-1.5 7.1-2.6 10.5-4.3.5-.2 1.1-.4 1.3.6.1.5.8.9 1.2 1.3l10.8 10.8c2 2 3.7 4.2 5 6.7.5.9.7.9 1.8.6 1.8-.4 3.5-1.1 5.3-1.2.5 0 .9-.3 1.4-.4.9-.2 1.7-.4 2.6-.5.8-.1 1.7 0 2.5 0h7.4c.8 0 1.2-.3 1.6-.9.7-.9.9-2.1 1.7-3 .7-.8 1.1-2 1.7-3 .5-.9 1.1-1.8 1.7-2.8l6-10.2c.6-1 1.3-1.4 2.5-1.4 7.4.1 14.8 0 22.4 0 .4 2.1 1.6 4.1 2 6.3.3 1.5 1 2.8 1.5 4.2.3.8.6 1.6.8 2.4.1.3 0 .6.2.8.9 1.3.9 2.9 1.2 4.4.5 2.5.9 5 2.3 7.1.6.9 1.1 2 2.4 2 2 1.3 4.3 1.5 6.4 2.3 2.2.9 4.4 1.6 6.4 2.9 1.6 1.1 3.4 1.9 5.1 2.8 1 .5 2.1.7 3.1-.3s2.4-1.4 3.6-2.1c1.8-.9 3.5-2 5.2-2.9 1.8-.9 3.5-1.9 5.2-3 1.7-1.1 3.6-2 5.5-3 .4-.2.9-.2 1.2-.5 1.4-1.6 2.6-.9 3.8.1 1.8 1.5 3.9 2.7 5.7 4.2 1 .8 2.2 1.4 3.2 2.2 2.3 1.5 4.3 3.3 6.6 4.7.3.2.4.9.3 1.2-.6 1.4-.4 3-1.2 4.4-.2.4-.2.9-.2 1.3 0 1 0 1.9-.6 2.7-.1.2-.3.4-.3.6-.2 1.5-.3 3-.5 4.4 0 .4-.1.8-.2 1.1-.6.9-.8 1.9-.7 3 0 .2.1.3 0 .5-.8 1.5-.9 3.2-1.1 4.9-.2 1.1-.5 2.3-.7 3.4-.4 1.8.8 3 1.7 4.1 1.8 2.2 3.6 4.6 5.3 6.9 1.6 2.2 3.5 4.2 4.8 6.6.8 1.5 2 1.8 3.4 1.8h24.9c1 2.3 1.9 4.7 3.1 7 1.4 2.7 2.4 5.7 3.9 8.4.9 1.5 1.4 3.3 2.1 4.9.2.5.6 1 .8 1.3l-18.4 18.4v18.3c0 1 .5 2.3 1.1 3.3.8 1.3 1.4 2.7 2.5 3.8 1.6 1.8 3.7 2.9 5.7 4.1 3.6 2 7.6 3 11.1 5.1.9.5 1.8 1 2.6 1.5.6.4.6 1 .6 1.6v23c-1.7 1.5-3.8 1.2-5.6 1.7-1.5.4-3.1.9-4.7 1-.9.1-1.7.9-2.9.9-.9 0-1.9.2-2.8.4-.6.1-1.2.3-1.9.5-.4.1-.8.4-1.2.4-.9-.1-1.7.3-2.5.6-.4.2-.8.3-1.2.4-1.1.2-2.2.2-3.3.5-.8.2-1.6.8-1.6 1.6 0 2.5-1.6 4.3-2.7 6.3-1.3 2.6-2.4 5.3-3.4 8.1-.3.9-.9 1.7-1.1 2.8-.3 1.3-.5 2.6-.8 3.8-.4 1.4-.2 2.7-.4 4-.2 1.6.5 2.9 1.3 4.1 1.8 2.7 3.5 5.5 5.2 8.2.9 1.5 1.9 2.9 2.8 4.4 1 1.5 2.2 3.1 3.3 4.7zm-218.6 3.3c-.3.8-.6 1.4-.8 2.1-.6 1.7-1 3.4-1.6 5.1-.6 1.8-1.5 3.6-2 5.4-.3.9-.9 1.7-1 2.6-.4 2.3-1.3 4.4-2.1 6.5-.4.9-.6 2 .1 2.8.7.8 1.7 1.5 2.6 2.1 2.2 1.6 4.5 3.2 6.5 5.1.8.7 1.6 1.4 2.4 1.9.5.3 1.2.4 1.9.5.8.1 1.6-.1 2.3 0 .7.1 1.2-.2 1.7-.5 2.3-1.4 4.5-2.9 6.8-4.3 2.4-1.5 4.7-3 7.3-4.1 1.2-.5 2.3-.8 3.6-.9 1.1 0 2.1.5 3 .4 1.5-.1 2.7.5 4 1 1.2.5 2.3 1 3.6 1.4 2 .6 4 1.6 5.9 2.5 2 .9 3.9 2.1 6 2.9 1.9.7 3.7 1.5 5.5 2.4.4.2.9.4 1 .8.6 1.8 1.4 3.5 1.8 5.3.4 1.9 1.9 3.6 1.5 5.7 0 .1.3.3.4.5.2.3.4.6.5.9.6 3 1.8 5.7 2.6 8.6.2.7.4 1.4.7 2 .2.4.3.9.7 1.1.6.3 1.2.4 1.9.5.7.1 1.4 0 2.1 0 .6.1 1.3.3 1.9.4.9.2 1.9.4 2.8.5 1 .1 1.9.1 2.8.4 1.3.4 2.8.4 4.2.5.3 0 .6.1.8.3.5.4.8.1 1.1-.3.4-.5 1.1-1.1 1.1-1.6 0-.9.8-1.3.9-1.9.2-.7.3-1.6.8-2 .8-.6.5-1.5 1.1-2.2.5-.5.6-1.3 1-1.9 1.1-1.9 2-4 2.8-6 .3-.7 1.2-1.3 1.2-2 0-1 1-1.2 1-1.9 0-.9.7-1.4.9-2.2.2-.8.7-1.1 1.5-1 1.4.2 2.7-.2 4-.5.5-.1 1-.4 1.4-.4 2.6 0 5.2-.6 7.7-.9 1.9-.2 3.8-.9 5.8-.6.3 0 .6-.1.8-.2 1.5-.6 3-.7 4.5-.8 1.6-.1 2.5.6 3.4 1.8.9 1.2 1.7 2.4 2.7 3.5 1.2 1.4 2.6 2.7 3.8 4.2 1.6 2 3.5 3.8 5.2 5.7.5.5 1 1 1.4 1.7.7 1.3 1.8 1.4 3.3.8 1.4-.6 2.9-.9 4.3-1.5 1.6-.7 3.3-1.2 5-1.8 2-.7 4-1.6 6.1-1.9.7-.1 1.1-.4 1.1-1.2v-1.4-25.1c1.6-1.3 3.1-2.8 4.9-3.8 3-1.7 5.4-4.1 8.1-6 2.6-1.9 5.5-2.9 8.4-3.7 1.8-.4 3.9-.4 5.7 0 1.6.3 3.1 1 4.6 1.7 2.3 1.1 4.8 2 7.5 1.9.4 0 .8-.1 1.1 0 2.2 1.2 4.5.9 6.8.9.5 0 .9-.2 1.2-.6 1.1-1.7 2.2-3.4 3.4-5.1 1.4-2 2.9-3.9 4.3-5.9.8-1.1 1.5-2.1 2.3-3.2.5-.7.6-2 .1-2.5-1.5-1.5-2.3-3.4-3.4-5.1-2-3-3.8-6.2-5.8-9.2-.9-1.4-1.4-2.8-1.7-4.4-.5-2.5-.7-2.6.1-4.7.4-1 .4-1.9.4-2.8 0-.6.2-1.1.3-1.7.5-2 1.4-3.9 2.2-5.8.8-1.6 1.1-3.4 2-5 .8-1.3 1.5-2.6 2.1-4 .7-1.3 1.1-2.8 1.6-4.2.5-1.8.7-2.3 3.2-2.7 1.7-.2 3.2-1.2 4.9-.9.3 0 .6-.3 1-.4.3-.1.5-.4.7-.4 1.7.1 3.2-.5 4.7-.9 1-.3 2-.3 3-.5s1.9-1 3.1-.9c1.1.1 1.9-.6 3.1-.5.8.1 1.6-.5 2.4-.9.7-.4 1.3-.9 1.3-1.9V336c0-.8-.2-1.2-1-1.5-2.3-1-4.5-2.1-6.8-3.2-1 .4-1.2-.7-1.9-.9-3.8-1.2-7-3.3-9.7-6.2-2.1-2.2-2.8-3.3-3.8-6.8-.1-.2-.2-.4-.3-.5-.6-.4-.6-1-.6-1.6v-18.9l16.7-16.7 1-1c.5-.5.5-1.1 0-1.6-.8-.7-1.1-1.8-1.4-2.6-.8-2-1.7-3.9-2.5-5.9-.5-1.1-1.4-2-1.3-3.4 0-.2-.3-.5-.5-.7-.3-.4-.8-.8-.8-1.3-.1-1.6-1.2-2.5-2.2-3.5h-24.5c-1.1 0-1.1 0-2.1-1.1-.8-.9-1.8-1.6-2.3-2.8-.4-1.1-1.3-2-2.1-2.8-1.1-1.3-1.8-2.9-3-4.1-.9-.9-1.8-1.9-2.4-2.9-1.3-2.1-2.9-4-4.3-6.1-.2-.3-.5-1-.3-1.2 1-1.1.9-2.5.9-3.8 0-.2.1-.4.2-.6 1.1-1.5.7-3.2 1.1-4.8.3-1 .1-2.1.7-3.2.4-.7.1-1.8.3-2.7.1-.8.9-1.4.9-2.4 0-1.5.3-3 .4-4.4 0-.2.1-.4.2-.6.7-1 .6-2.1.7-3.2.1-1.2-.4-2-1.4-2.3-1.4-.5-2.3-1.5-3.4-2.3-2.4-1.9-5.1-3.4-7.5-5.5-.8-.7-1.9-1-3.1-.3-3.3 2-6.7 4-10.1 5.7-1.9 1-3.6 2.3-5.6 3.2-1.9.8-3.7 2-5.4 3.1-1 .6-1.8.3-2.7.1-.3-.1-.6-.3-1-.5-1.2-.7-2.4-1.6-3.8-2.1-2.5-1-4.5-2.9-7.2-3.3-1.5-1.4-3.5-1.3-5.3-1.8-1.3-.4-2.4-1.3-3.7-1.6-1.9-1.9-4-3.6-4.2-6.6 0-.2-.1-.4-.2-.6-.7-1-.7-2.1-.7-3.2 0-.9.2-1.9-.7-2.5-.1-.1-.2-.4-.2-.6-.1-2.2-1.1-4.2-1.7-6.2-.5-1.8-1.5-3.6-2-5.4-.3-1-1-1.5-1.9-1.5h-16.9c-.7 0-1.2.2-1.6.9-1.5 2.5-2.9 5.1-4.5 7.6-.7 1.1-1.4 2.2-2 3.3-.7 1.4-1.6 2.7-2.3 4.1-1 1.7-2 3.5-3 5.3h-11.3c-.8 0-1.7-.1-2.5 0-.7.1-1.3.7-1.9.9-.8.2-1.6.1-2.5.2-.7.1-1.6 0-2.2.4-1.7 1-3.7.6-5.4 1.4-.9-1.4-1.3-2.9-2.1-4.3-.5-.9-1.6-1.3-1.9-2.4-.2-.8-.9-1.5-1.6-2.1-3.6-3.5-7.3-7-10.9-10.5l-.2-.2c-.5-.6-1-.6-1.8-.2-1.2.6-2.5 1.1-3.8 1.5-2.9 1.1-5.9 2.1-8.8 3.3-1.2.5-2.3 1.1-3.5 1.7V217c-.8.8-1.5 1.9-2.5 2.4-2.4 1.3-4.3 3.1-6.4 4.7-2.4 1.8-4.9 3.3-7.1 5.4-1.6 1.5-3.7 2.4-5.3 4-.2.2-.7.4-1 .3-1.6-.7-3.4-.6-5-1.4-1.1-.6-2.4-.4-3.4-1.3-3.2-.3-6.1-1.7-9.2-2.5-1.1-.3-2.2-.5-3.2-1.2-.6-.5-1.7-.4-2.5-.5-1.4-.2-1.3 1.3-1.9 1.9-1.3 1.2-2.5 2.4-3.4 3.9-1.8 3-4.3 5.4-6.4 8.2-.7 1-.8 1.9-.1 3 .6 1 1.3 1.9 1.8 3 1.6 3.2 3.4 6.3 5.1 9.5.4.8.6 1.8 1.2 2.5 1.6 2.2 2.4 4.7 3.7 7 .2.4.3 1.4 0 1.6-.8.6-.5 1.5-.8 2.2-1.4 3.2-2.5 6.5-3.8 9.8-.7 1.7-1.5 3.4-2.1 5.1-.6 1.8-1.6 3.4-1.9 5.2-.1.3-.4.7-.7.9-1.4.7-2.8 1.3-4.3 1.9-.9.3-1.8.7-2.6 1.1-.9.4-2.2-.1-2.8 1.2-.1.1-.6.1-.9.1-.4 0-.9-.1-1.1.1-2 1.5-4.5 1.2-6.8 2.1-2.4 1-5 1.7-7.4 2.9-.5.2-.7.6-.9 1.1-.3.9-.4 1.9-.4 2.8 0 2.1.3 4.2-.4 6.3-.2.6-.4 1.3-.4 1.9-.1 1.8 0 3.5 0 5.3 0 .8.2 1.2 1 1.5 1.8.8 3.6 1.8 5.3 2.9 2.5 1.5 5.1 2.9 7.6 4.5 1.4.9 2.8 1.8 4.2 2.6 1.6.9 3.3 1.8 5.1 2.7-.3 1.1.4 2.2.3 3.4-.1 3.2.9 6.3.5 9.5-.1.5-.1 1.2.2 1.5.6.7-.1 1.7.4 2.2.6.7.4 1.4.4 2.2.1 1.2 0 2.5 0 3.7.1 1.3.3 2.5.5 3.7.2 1.4.2 1.4-1 1.8-.2.1-.4.3-.5.3-2.7 1.1-5 2.8-7 4.8l-9 9c0 1.6.1 1.5.8 3.1.9 2.1 1.8 4.2 2.5 6.4 1 2.9 2.4 5.6 3.3 8.6.1.3.6 1 1.1.6 1.1-.8 2.2-.3 3.3-.4.6-.1 1.4.2 1.8-.1.9-.7 1.9 0 2.6-.4.9-.5 1.7-.3 2.6-.4 2-.2 4-.3 6.1-.5h.2c1-.9 2.2-.3 3.3-.5 1.2-.2 2.3-.3 3.5-.5.6-.1 1 .2 1.3.7 2.1 3.1 4 6.4 6.3 9.4 1.5 2.1 2.8 4.3 4.3 6.4 2.3 3.5 4.2 6.7 6.2 9.6zM131.5 137.7c2.4-.3 4.5.8 6.7.4 1.4.7 3 .2 4.4.5 2.5.5 5 .4 7.5.4.6 0 1.3.3 1.9.4.6.1 1.4-.3 1.9.4 1.5 0 3.1.1 4.6 0 .4 0 .9-.4 1.3-.8 1.6-1.4 3.1-2.8 4.7-4.2.6-.5 1.3-1 1.9-1.5 2.3-2 4.4-4.1 6.9-5.8 1.3-1 2.3-2.3 3.8-3 .7-.4 1.3-1.1 1.8-1.8s.7-1.5.7-2.5V96.5c2.9-1.1 5.7-2.5 8.7-3.5 2.1-.7 4-1.8 6-2.7 1.2-.5 2.3-1.1 3.5-1.6.9-.4 1.5-.1 2.2.9.1.2.2.4.4.5 1.6 1.8 3.2 3.6 4.9 5.4 1.3 1.4 2.5 2.9 3.6 4.5.3.5.9.9 1.3 1.3 1.9 1.9 3.7 3.9 5.2 6.2.3.5.8.6 1.4.6h16c1.2 0 2.3-.1 3.4.7.7.5 1.6.6 2.5.7 2.1.1 4.1 1.1 6.3 1 2.2-.1 4.5 0 6.7 0 .2 0 .5-.1.7 0 1.3.6 2.1-.1 2.9-1 5.4-5.4 10.8-10.8 16.2-16.3 1.9 1 3.9 1.7 5.7 2.9 1.2.8 2.5 1.2 3.7 1.7 1.2.5 2.1 1.8 3.5 1.6.6 1.1 2 .8 2.8 1.7.6.7 2 .4 2.6 1.4.1.1.3 0 .4.1 1.2.4 1.1.5 1.3 1.7.2 1.5-.2 3-.6 4.4-.2.7-.4 1.4-.4 2.1 0 1.1.3 2.3-.1 3.2-.3.9 0 2-.8 2.7-.1.1 0 .3 0 .5.3 2.6-.6 5.1-.4 7.7.1 1.4-.2 2.8-.7 3.9-.6 1.3-.1 2.2.5 3 1 1.3 2.1 2.5 3.2 3.8 1.1 1.2 2.1 2.5 2.9 3.9l.3.3c1.5 1.7 3.1 3.3 4.6 5.1.9 1 1.7 2.1 2.5 3.1l.3.6c1 1 1.9 2.4 3.2 3 1 .5 2.4.2 3.6.2h19.2c.9 0 1.6.2 2.2 1 .5.7 1.2 1.3 1.6 2.1 1 1.9 2 3.8 2.6 5.9.5 1.8 1.6 3.5 1.1 5.6.7 1.6.3 3.3.5 4.9.2 1.6-.6 2.6-1.8 3.3-.4.2-.8.5-1.1.8-1.7 1.7-3.6 3.1-5.5 4.6-1.5 1.2-2.8 2.5-4.2 3.7-.7.6-1.3 1.2-2.1 1.7-1.3.9-2.2 2.2-2 4 .1 1.4 0 2.8 0 4.2 0 1.5-.4 2.9-.8 4.3-.1.4-.1.7-.1 1.1 0 .8.1 1.7 0 2.5-.1 1.3.3 2.5-.3 3.8-.5 1 .1 2.3-.5 3.5-.4.9-.2 2.1-.1 3.2.2 1.7-.6 3.2-.5 4.9.1 1.7.1 3.4 0 5.1-.1.9-.1 1.9-.5 2.6-.9 1.7.1 2.6 1.1 3.6l10.3 10.3 6.2 6.2c-1.3 2.5-2.5 4.9-3.7 7.2-.9 1.7-1.9 3.4-2.7 5.1-1.2 2.5-2.6 4.9-3.7 7.5-.7 1.7-1.8 2.2-3.5 1.6-1.3-.4-2.7-.5-4-.9-1.8-.5-3.9 0-5.5-1.2-.2-.1-.4-.1-.6-.1-1.4.1-2.7-.4-4.1-.8-1.1-.4-2.5-.5-3.7-.6-1.1 0-2.2-.1-3-.6-1.1-.6-1.8-.2-2.5.5-.9.8-1.8 1.6-2.7 2.3-1.9 1.5-3.6 3.3-5.4 4.8-1.5 1.2-2.8 2.7-4.5 3.6-.3.1-.4.4-.7.6-1.7 1.6-3.5 3.2-5.2 4.7-.3.2-.6.3-.9.5-1 .8-1.7 1.7-1.7 3.2.1 8.6 0 17.1 0 25.8-1.2.4-2.5.6-3.6 1.3-.7.5-1.8-.2-2.3.8-.4.9-1.4.2-2.1.6-.6.4-1.5.5-2.2.9-1 .5-2.2.8-3.2 1.1-1 .4-2 1.1-3.2 1.2-.9.1-1.8.5-2.7.8-.2.1-.6-.1-.7-.3-1.7-2.1-3.3-4.2-4.9-6.3-1.7-2.3-3.6-4.5-5.3-6.8-1.4-2-3-3.8-4.6-5.7-.4-.5-.8-.8-1.6-.7-.6.1-1.4.3-1.9-.4-.1-.2-.7-.2-.9 0-.7.8-1.6.4-2.4.4-1.9 0-3.9-.1-5.8 0-2.4.2-4.8-.6-7.2-.5-.3 0-.5-.3-.8-.3-1.1-.2-2.1-.8-3.2-.6-.4.1-.8.1-1.1-.1-1.6-.9-3.3-.9-5-.8-1 0-1.9-.3-2.8-.4-1.6-.1-3.3.2-4.9.4-.4.1-.8.6-1.2 1l-14.1 14.1c-.4.4-.9.8-1.3 1.3-.5.6-1.1.9-1.8.7-1-.2-2-.3-2.9-.8-1.3-.6-2.7-.9-4-1.5-2.5-1-4.5-1.9-6.2-3.6-1.5-1.5-3.2-2.9-5-4.1-.6-.4-1-.9-1.5-1.3.6-1.7 1.1-3.2 1-4.9-.1-1.3 0-2.6 0-3.9 0-1.2.7-2.3.5-3.5-.1-1.1-.4-2.3.4-3.3v-.2c-.2-1.7.3-3.4.4-5.1.1-1.7 0-3.4 0-5.1 0-.8-.2-1.2-.9-1.6-.4-.2-.7-.8-1.1-1.2-.4-.4-.9-.7-1.3-1.1-.5-.5-.8-1.1-1.3-1.5-1.8-1.9-3.7-3.7-4.7-6.1-1.8-1.3-2.5-3.5-3.8-5.2-.6-.7-.9-1.6-1.5-2.4-.8-1-1.9-1.5-3.3-1.5h-25.6c0-.4.2-.9 0-1.1-1.4-1.3-1.4-3.3-2.2-4.9-1.1-2.1-1.3-4.6-2.5-6.6-1.3-2.2-1.7-4.7-2.9-6.9-.4-.8-.4-1.6.4-2.2.8-.7 1.6-1.3 2.4-2 .8-.6 1.3-1.4 2.2-1.9 1-.5 1.6-1.5 2.6-2.1 1.5-1 2.7-2.4 4.1-3.5.7-.6 1.4-1.1 2.1-1.6 2.2-1.5 3.8-3.8 6.3-4.9.3-.1.5-.6.5-.9.2-4 .3-8 .5-12.1-.6-1.9-.4-3.9-.5-5.8 0-1.2 0-2.3.4-3.5.3-1-.2-2.2.5-3.3.2-.3 0-.9 0-1.4 0-.4.1-.8.3-1 .5-.5.4-1.2.7-1.6 1.5-2.1.7-4.4.8-6.6 0-.7-.4-1.5-1.2-2-1.6-1-3-2.3-3.9-3.9-.2-.3-.6-.5-.9-.7-.5-.4-1-.9-1.4-1.3-.3-.3-.5-.8-.8-1-.4-.3-.9-.5-1.2-.9-.4-.4-.6-1-1-1.4-.3-.4-.7-.8-1.1-1.1-.4-.4-.9-.8-1.4-1.1-.3-.3-.7-.6-1-.9l-1.2-1.5c-.4-.4-1-.7-1.4-1-.4-.3-.6-.6-.6-1.2-.1-4 .2-5.5 2.7-10 .9-1.7 2.1-3.1 3-4.8 1-1.8 1.9-3.6 1.8-5.7.1-.8.2-1.2.2-1.6zm181.7 89.8c.3-.4.6-.6.6-.9 0-2.2.7-4.3.5-6.5-.1-2-.4-4.1.8-5.9.1-.2 0-.6 0-.9v-3.9c0-1.3 0-2.6.4-4 .3-1.2.3-2.5.5-3.7.4-3.1.4-6.2.5-9.3.1-1.6-.1-3.3.5-4.9.2-.5.5-1 .4-1.4-.3-1.5.7-2.4 1.7-3 1.6-1.1 3.1-2.2 4.5-3.6.5-.5.9-1.1 1.5-1.5 3-1.8 5.3-4.4 7.9-6.6.5-.4.8-.9.7-1.6-.1-1.1-.3-2.2-.4-3.3-.3-2.2-1-4.2-1.7-6.3-.5-1.4-1.5-2.5-2-3.8-.5-1.4-1.4-1.8-2.7-1.7h-20.6c-1.4 0-2.5-.2-3.4-1.4-.6-.9-1.4-1.8-2.1-2.6-.7-.8-1.5-1.6-2.2-2.6-1.9-2.9-4.9-4.8-6.5-8-2.6-2.3-4.4-5.4-6.9-7.8-.7-.6-.9-1.4-.6-2 1-1.9.9-3.9.9-5.9 0-.5-.1-1.1.1-1.6.7-1.7.9-3.4.8-5.2-.1-2 .8-4 .5-6.1v-.2c.9-.8 0-2.1.5-2.8.7-1 .3-1.9.4-2.9.1-1.1 0-1.1-1.4-1.6-.5-.2-.9-.4-1.4-.6-3.9-1.9-7.8-3.9-11.7-5.8-1.3-.7-1.4-.7-2.3.3-2.8 3-5.8 5.6-8.4 8.8-2.1 2.6-4.8 4.8-7.1 7.3-.4.4-.6 0-.8-.1-1.6-.2-3.2-.7-4.9-.6-2 .1-4 0-6 0-.7 0-1.4 0-2.2-.4-.8-.4-1.9-.5-2.8-.5-1 0-2-.1-2.8-.5-1.7-1-3.4-.9-5.2-.9-.5 0-1 .1-1.5-.3-.4-.2-1.1-.1-1.7 0-.4 0-.8.3-1.3.3h-12.5c-.2-.4-.3-.7-.5-1-.5-.6-1.1-1.1-1.6-1.7-1.9-2.4-3.9-4.8-6.1-7-.8-.8-1.4-1.7-2.1-2.6-.9-1.1-1.8-2.2-2.8-3.2-.6-.7-1.3-1.3-1.9-2-.9-1.2-.9-1.2-2.4-.7-2.2.6-4.2 1.8-6.3 2.6-1.4.5-2.8 1.1-4.2 1.7-2.4 1.1-3.3 1.3-3.3 4.4.1 6.6 0 13.1.1 19.7 0 1.8 0 3.3-2 4.1-.6.2-1 .9-1.5 1.4-.5.5-.9 1.1-1.5 1.4-1.5.9-2.8 2-4 3.2-1.3 1.3-2.6 2.5-4.1 3.6-2 1.5-3.9 3-5.7 4.8-1 1-2.1 1.8-3.4 2.5-.4.2-.7.8-1 .8-2.1.1-4.2 0-6.2 0-.7-1-2.1.1-2.9-.9-1.2 0-2.3.1-3.5 0-2-.1-4.1 0-6-.5-1.9-.6-3.8-.1-5.6-.4-.7-.1-1.3.2-1.3.9-.1 2.2-1.5 3.7-2.5 5.5-1.5 2.7-3.4 5.1-4.2 8.2-.4 1.5-.2 2.3.8 3.4 5.4 5.3 10.7 10.7 16 16v7.6c0 .4 0 .9-.2 1.3-.6 1.2-.9 2.4-1.4 3.6-.6 1.3-.7 2.5-.7 3.9V212.9c0 .8-.2 1.4-.8 2-1.3 1.1-2.5 2.5-3.9 3.4-1.1.7-1.8 1.8-2.9 2.5-1.5 1-2.9 2-4.2 3.3-.6.6-1.2 1.1-1.9 1.5-2 1.4-3.9 3.1-5.7 4.7-1.3 1.1-1.2 1.3-.5 2.9.5 1.1 1 2.2 1.4 3.4 1 2.8 1.9 5.7 3.3 8.4.3.5.5 1 .5 1.7 0 1.3.3 1.5 1.6 1.6h24.7c.6 0 1.2-.1 1.7.5.9 1.2 2.2 2.2 2.9 3.4 1.3 2.4 3 4.6 4.6 6.9 1.8 2.7 3.8 5.2 6.1 7.4 1.2 1.1 2.5 2.2 3.7 3.2v2.1c-.1 1.9.3 3.9-.4 5.8-.4 1.2-.4 2.5-.5 3.7-.2 2 .3 4.1-.5 6.1-.3.7-.4 1.6-.5 2.3-.1 2.2 0 4.5 0 6.7 0 .3.2.8.4 1 1.7.9 2.8 2.6 4.2 3.8 1.1.9 2.3 2.1 3.6 2.4 1.6.4 3.1 1.1 4.6 1.7 1.4.5 2.5.4 3.5-.6 2.9-3.1 6.1-5.8 8.7-9.1 1.8-2.3 4.1-4.2 6.2-6.2.2-.2.5-.4.7-.4 2-.2 4.1.5 6.1-.5 1.6.9 3.4.3 5.1.5 1 .1 1.9-.1 2.8.5.9.5 1.8.6 2.8.5.3 0 .8-.1.9 0 .6.9 1.7.2 2.5.8.7.5 1.8 0 2.8.5.7.4 1.8.1 2.7.1.4 0 .7.2 1.1.2 1.4.3 2.8.3 4.2 0 .7-.2 1.5-.1 2.2-.2.7-.1 1.5-.6 2.1-.4 1.5.5 3 .4 4.5.4.5 0 .8.2 1.2.5 2 1.7 3 4 4.8 5.9 1.5 1.6 2.6 3.6 4.1 5.2 1.9 2.2 3.5 4.5 5.2 6.9.5.6.6 1.1 1.7.5 1.5-.8 3.2-1.1 4.8-1.7 1.2-.5 2.5-1.1 3.8-1.4 1.4-.3 2.5-1.2 3.9-1.2.7 0 1.1-.5 1-1.2v-1.4-23.1c0-1 .2-1.9 1.1-2.3.8-.4 1.3-1 1.9-1.5.7-.6 1.5-1 2.1-1.7 2.1-2.1 4.4-3.9 6.6-5.7 1.9-1.6 3.7-3.4 5.6-5.1.3-.3.6-.7 1-1 1.7-1.1 3.4-2.2 4.6-3.8 1.1-1.3 2.4-1.5 3.9-1.3.6.1 1.2.1 1.6.5.5.5 1.1.5 1.7.4 1-.2 1.9.2 2.8.5 1.5.5 3 .6 4.5.8 1 .1 2.1.3 3 .6.6.2 1.1.4 1.7.4 1.4-.1 2.6.5 3.8.8.8.2 1.7.2 2.5.1.4-.1 1-.5 1.1-.8.3-2.1 2.1-3.4 2.5-5.5 1-.4.6-1.4 1.1-2.1.5-.7 1-1.4 1.3-2.2.8-1.8 1.6-3.5 2.8-5.1.4-.6.3-1.5-.3-2l-1-1c-4.8-5.3-10-10.6-15.4-15.9z"></path>
            <path d="M416.6 205.9c-2.1 1.9-4.1 4-6.4 5.8-2.4 2-4.9 4-7.1 6.2-.7.7-1.5 1.2-2.3 1.8-.5.4-.9.2-1.4 0-2.7-1.4-5.5-2.8-8.2-4.1-1.3-.6-2.4-1.6-3.9-1.7-.3 0-.6-.6-.7-1-.1-.4 0-.9 0-1.4v-78.9c0-.7-.2-1.4.3-2.2.3-.4.2-1.2.1-1.8-.8-2.5-.3-5.1-.4-7.7-.1-2.7 0-5.4 0-8.1 0-.8.2-1.2 1.1-1.7 2.8-1.6 5.7-3.2 8.4-4.9 1.2-.8 2.5-1.7 4-2 .5-.1 1-.5.9-1.1-.1-.7.3-1.4-.5-1.9-.2-1.8-.3-3.6-1.4-5.2.3-1-.3-1.9-.5-2.8-.3-1.6-1.2-3-.9-4.7 0-.2-.2-.4-.3-.5-.1-.2-.5-.3-.5-.5.1-1.6-.6-3-1-4.4-.5-1.6-.5-3.2-1.2-4.8-.5-1.3-.6-2.8-1.1-4.2-.2-.4 0-1 .4-1.5 1.3-1.7 2.4-3.6 3.3-5.6 1-2.3 2.6-4.2 3.6-6.4.4-.8 1-1.6 1.5-2.4 1.2-2.2 2.8-4.1 4.3-6.1 1.3-1.8 2.4-3.7 3.2-5.8.2-.6.3-1.1.4-1.7.8-4 .4-8 .4-12.1.1-4 .1-8 0-12-.1-1.6.6-2.5 2-3.1 1.7-.9 3.5-1.6 5.1-2.7.6-.4 1.8-.2 2.6 0 2.3.5 4.6 1.3 6.7 2.2 3 1.3 5.7 3 8.4 4.9 2.1 1.5 4 3.2 5.8 5 2 1.9 3.2 4.2 4.2 6.8.8 2.2 1.2 4.4 1.8 6.6.5 1.8.3 3.6.4 5.4.1 1.8.1 3.7 0 5.5-.1 1-.3 2-.8 2.9-.7 1.5-1.5 3.1-1.8 4.8-.2 1.1-1.2 1.6-1.2 2.8 0 .8-.7 1.7-1.2 2.5-.5.9-1 1.7-1.5 2.6-.3.4-.6.8-.8 1.3-1.1 2.5-2.7 4.8-3.9 7.2-.7 1.3-1.4 2.6-2 4-.6 1.5-1.6 2.9-2.3 4.4-.6 1.4-1.5 2.8-1.6 4.4-.1 1.8.6 3.2 1.8 4.4.9.9 1.2 1.5.7 2.9-.6 1.6-.2 3.5.4 5 .2.6.4 1.1.4 1.7-.1.9 0 1.9.6 2.5.8.9-.1 2.1.8 2.9-.3 1.5 1.3 2.5.9 4 .9.8.7 1.9 1 2.8.3 1 .3 2 .4 3.1 0 .6.3 1.1.4 1.7.1.6-.2 1.2.5 1.7 0 1.5.1 3-.5 4.4-.1.2-.4.3-.6.4l-18.6 9.3c-2 1-2.1 1-2.1 3.2-.1 22.7-.1 45.3-.1 67.9zm-26.4-43.4v47c0 .5-.1 1.1 0 1.6.1.4.4 1 .7 1 2.4.4 4.2 2.1 6.4 2.9.8.3 1.5 1.1 2.4.8.8-.2 1.5-.9 2.2-1.4l.3-.3c1.2-1.1 2.4-2.3 3.7-3.3 2.1-1.6 3.9-3.6 5.9-5.3 1.1-.9 1.4-1.9 1.4-3.4-.1-21.9 0-43.8 0-65.7V135c0-.9.3-1.2 1.2-1.6 3-1.4 6-3 9-4.6 3.4-1.7 6.8-3.4 10.1-5.1.4-.2.9-.6 1-1 .1-.9.3-2 0-2.7-.5-1-.4-1.9-.4-2.9.1-1.1-.7-1.7-.9-2.6-.1-.2-.1-.5 0-.7.2-.7-.2-1.1-.5-1.7-.2-.4-.3-.8-.5-1.2-.6-1.3.1-3-1.3-4.1-.1-.1-.1-.4 0-.7.2-.9-.4-1.5-.6-2.3-.1-.3-.3-.5-.3-.8.2-2.4-.8-4.6-.5-7 .1-1-.2-1.9-.9-2.7-1.8-2.3-1.7-5-1.2-7.6.3-1.8 1.3-3.3 2.1-4.9 1-2 2.7-3.6 2.8-6 .7-.6.9-1.5 1.4-2.2.5-.7.7-1.7 1.2-2.3 1.4-1.5 1.9-3.4 2.8-5.1 1.7-3 3.3-6.2 4.6-9.4.5-1.1 1.6-2.2 1.1-3.7l.2-.2c.9-1 .7-2.2.7-3.4v-4.9c0-.9 0-1.7-.4-2.6-.4-.8-.6-1.8-.5-2.8 0-.4 0-1-.1-1.1-1.2-.5-.4-1.9-1.1-2.6-.7-.7-.7-1.7-1-2.6-.1-.2-.1-.4-.3-.6-.9-1.1-1.8-2.2-2.8-3.2-1.6-1.7-3.5-3-5.3-4.4-1.5-1.2-3.5-1.5-4.8-2.9-1.7-.2-3-1.3-4.6-1.8-1.3-.4-2.6-1.4-3.8-1.3-1.3.1-2.6 1.1-3.9 1.7-.8.4-1.4.8-1.4 1.8-.1 3.1.2 6.2-.4 9.3-.2 1.3-.4 2.9.4 4.2-.3 3.1.7 6.4-.8 9.4-.1.2-.1.4-.1.7.1 3.1-1.6 5.6-3.1 7.9-1.5 2.2-3.2 4.4-4.7 6.6-2 3.1-3.7 6.5-5.6 9.7-.7 1.2-1.4 2.5-2.2 3.7-.6.8-.8 1.5-.2 2.4.3.5.4 1.1.6 1.6.4 1.6.2 3.4 1.3 4.8.1.2.1.4.1.6 0 .9-.2 1.9.5 2.6.9.8.1 1.9.7 2.8.3.6 0 1.6.4 2.1 1.1 1.4.3 3.4 1.7 4.6-.1 1.7.5 3.2 1 4.7.4 1.4.2 3 1.2 4.4.6.9.2 1.6-1 2.2-.6.3-1.3.6-1.9 1-3.4 2.4-7.2 4.3-10.8 6.4-.7.4-1 .8-1 1.5v1.4c-.2 15.7-.2 31.2-.2 46.7z"></path>
            <path d="M513 81c.6 1 1.4 1.9 1.6 2.9.2 1.4 1.3 2.4 1.5 3.8.2 1.2 1.2 2.3 1.8 3.4 1.5 3.1 2.4 7.9 1.8 11.2-.3 1.5-1 3-1.7 4.4-.4.8-.7 1.6-1.1 2.3-.4.8-1 1.5-1.1 2.3-.1 1.1-1.3 1.8-1.2 3-1.5 1.4-1.7 3.7-3.2 5.2-.3.3-.5.7-.8 1.1-1.2 1.2-2.1 2.4-3 3.9-.3.5-.7.8-1.1 1.1-1.8 1.3-3.5 2.6-5.3 3.9-1.3.9-2.7 1.7-4.1 2.3-1.6.7-3.2 1.7-4.6 2.8-3.7 2.6-7.5 5.1-11.1 7.9-1.6 1.3-3.4 2.5-4.9 3.9-.2.2-.3.5-.5.5-2-.1-1.6 1.3-1.6 2.5v5.3c0 .9-.3 1.2-1.2 1.5-2.4.9-4.8 1.7-7.2 2.7-2.4 1.1-5 1.8-7.5 2.7-.8.3-1.3 1.2-2.4 1.1-.8-.1-1.7.5-2.6.8l-2.4.9c-2.3.9-4.6 1.9-7 2.8-1.8.7-3.6 1.4-5.4 2-1.3.5-2.7.8-4.1 1.3-2.1.8-4.1 1.6-6.2 2.4-1.4.5-2.8 1.1-4.3 1.6-1.2-1.6-1.6-3.5-1.6-5.4-.1-8.3 0-16.7 0-25 0-.7.3-1.1.9-1.6 2.6-2.2 5.9-2.8 9-4.1 2.3-.9 4.6-1.7 6.5-3.2 1.8-1.4 2.6-3.5 3.5-5.5.9-2.2 1.3-4.7 2.4-6.9l1.5-3.3c1.5-3.1 2.9-6.2 4-9.4.4-1 .8-2.2 2.4-2.3.7 0 1.4-.7 2.1-1 1.7-.8 3.4-1.9 5.2-2.4 1.8-.5 3.2-2 5.2-2.1 1.2-1 2.7-1.2 4-2 1.1-.7 2.3-1.2 3.5-1.6.9-.3 1.7-.7 2.6-1 1.8-.8 3.6-1.8 5.5-2.5 1.8-.6 3.4-1.9 5.3-2.2.5-.1 1-.6 1.5-.9 1.9-1.1 4-1.9 6.1-2.7 2-.7 3.8-2 5.9-2.6 1.9-.5 3.6-1.9 5.4-2.5 2.1-.7 3.9-2.1 6.1-2.5.7.1 1.3-.4 1.9-.8zm-41.8 65.2c.9-1.1 2.2-1.6 3.2-2.4 2.2-1.7 4.4-3.5 6.7-5.2 1.5-1.1 3.2-2.1 4.6-3.3 1-.9 2.2-1.5 3.3-2.2 1.9-1.4 3.9-2.7 6.1-3.8 3.5-1.7 6.7-3.9 9.5-6.7 2-1.9 3.6-4.2 5-6.5 1-1.7 2.2-3.2 2.8-5.1.8-2.4 1.9-4.6 3.1-6.8.5-.9.9-2 1.1-3 .2-1.3.1-2.6 0-3.9 0-.3 0-.7-.2-.8-.6-.5-.7-1.1-.7-1.8 0-.8-1.3-1-.9-1.9-.9-2-1.8-4-2.8-6-.5-1.1-.8-1.1-1.9-.6-1.6.7-3.3 1.4-4.9 2.1-.8.4-1.7.9-2.5 1.2-1.6.5-3.1 1.2-4.5 1.9-2.6 1.3-5.4 1.9-7.7 3.7-1.3 0-2.1 1-3.2 1.3-1.1.3-2.1.9-3.2 1.3-.8.3-1.4.9-2.1 1-2 .5-3.8 1.6-5.7 2.4-2.3 1-4.6 1.9-6.8 3.1-2.1 1.1-4.4 1.9-6.7 2.9-1.3.6-2.5 1.4-3.9 1.8-1.2.3-2 1.3-3.1 1.4-1.6 0-2.2 1.2-2.6 2.4-.9 2.6-2 5-3.1 7.5-.3.8-.5 1.7-1 2.3-.7.7-.3 2-1.4 2.4.1 1.8-.9 3.2-1.4 4.7-.5 1.4-.9 3-1.6 4.2-1.2 2.1-3 3.9-5.1 5.3-1.9 1.3-4 1.9-6.1 2.7-2.3.9-4.5 1.7-6.7 2.8-.6.3-.9.7-.9 1.4v22.7c0 1.3.5 1.6 1.9 1.2 2.1-.6 4.1-1.6 6.3-2.2 2-.6 4.1-1.4 6-2.2 4-1.8 8.3-3.1 12.3-4.9 2.4-1 5-1.8 7.4-2.7 3.4-1.3 6.8-2.7 10.2-3.8.9-.3 1.3-.6 1.3-1.5-.1-2.3-.1-4.4-.1-6.4zM594.7 326.9v12c0 1.8-.1 3.5-.8 5.2-.1.3-.1.7-.1 1.1 0 1.2.1 2.4-.7 3.4-.3.4-.1 1.2-.2 1.7s-.4 1-.4 1.4c0 .7-.2 1.3-.5 1.9-.7 1.8-1.3 3.6-1.9 5.5-.7 2.2-1.7 4.3-2.5 6.4-.7 1.7-1.5 3.4-2.1 5.1-.3.7-1.4 1.1-1 2.2-1.2.7-1 2.2-1.7 3.2-.7.9-.9 2.2-1.5 3.3-1.1 2-2.5 3.9-3.6 5.9-1.4 2.5-3.4 4.5-4.8 7-.6 1.1-1.8 2-2.6 3.1-2.8 3.6-6.1 6.8-9.5 9.9-1.6 1.5-3.6 2.6-5.2 4-2.6 2.3-5.6 4-8.4 6-1.7 1.2-3.5 2.2-5.4 3.1-.9.4-1.6 1.1-2.4 1.4-1 .3-1.7 1-2.5 1.2-1.8.5-3.2 1.7-4.9 2.1-1.4.4-2.6 1.2-3.9 1.7-.7.3-1.4.4-2 .7-2.6.9-5.1 1.8-7.7 2.6-1 .3-2.1.2-3.2.8-.8.5-2.1.1-3.1.3-1.9.3-3.7.7-5.5 1.1-.4.1-.7.2-1.1.2-1.3-.1-2.5.2-3.6.7-.4.2-.9.2-1.3.2H490c-.6 0-1.1-.2-1.7-.4-1-.3-2.1-.7-3.3-.6-.9.1-1.9.2-2.8-.4-.8-.4-1.8 0-2.8-.5-1.1-.5-2.5-.4-3.7-.5-.4 0-.7-.2-1-.3-1.1-.3-2-.8-3.2-.7-.5 0-.9-.3-1.4-.4-2.4-.6-4.6-1.5-7-2.2-2.9-.9-5.6-2.1-8.2-3.6-2.3-1.3-4.6-2.7-7-3.7-1.8-.8-3.6-1.8-5.4-2.7-1.7-.8-3.2-2-4.8-2.9-1.6-.9-3-2.2-4.8-3-1-.5-1.9-1.5-2.8-2.2-.9-.8-1.8-1.5-2.8-2.3-.8-.6-1.2-1.8-2.4-2-.4-1.1-1.4-1.8-2.1-2.6-.7-.8-1.6-1.5-2.3-2.3-.8-.9-1.5-1.8-2.3-2.7-.7-.8-1.3-1.6-2-2.4-.2-.3-.7-.5-.7-.8-.3-1.8-2-2.5-2.7-4-.6-1.2-1.7-2.2-2.4-3.4-.7-1.2-1.4-2.3-2-3.6-.6-1.4-1.7-2.7-2.5-4-.8-1.3-1.5-2.6-2-4-.4-1.1-1.1-2.2-1.6-3.3-.6-1.2-1.1-2.5-1.6-3.7-.4-1.1-.9-2.1-1.4-3.1-.6-1.6-1.3-3.2-1.8-4.8-.7-2-1.4-3.9-1.8-5.9-.1-.6-.2-1-.6-1.4-.2-.1-.3-.4-.3-.6 0-1-.1-2-.4-3.1-.4-1.3-.4-2.8-.5-4.2-.1-1.4 0-2.8 0-4.2-.1-1.2-.3-2.3-.4-3.5-1.4-.7-.8-2.3-1.3-3.4s-.1-2.6-.1-3.9c0-1.3-.3-2.7.1-3.9.5-1.6.3-3.1.4-4.7 0-.4 0-.8.2-1.1.9-1 .6-2.2.7-3.4.1-1.4.1-2.9.5-4.2.3-.8.3-1.6.4-2.4.1-.9.4-1.7.4-2.6.1-.8 0-1.7 0-2.5v-.2c1.2-1.9 1.1-4 1.4-6.1 1.1-1 .5-2.7 1.7-3.7.3-.3.1-1.2.4-1.7.3-.6.2-1.4.9-2 .5-.4.1-1.3.8-1.8.3-.2.3-.9.5-1.4.8-1.5 1.7-3 2.6-4.5 1-1.6 1.8-3.3 3.2-4.7.4-2.3 1.9-4.1 2.8-6.2.5-1.2 1.3-2.3 2.2-3.2.7-.7.5-1.8 1.4-2.5.7-.5 1-1.4 1.5-2.1 1.3-2 2.6-4.1 4.3-5.9 1.7-1.7 3.4-3.3 5.1-5.1 2.2-2.4 5-3.9 7.6-5.7 1.6-1.1 3.3-2 4.9-3.2 2.4-1.7 5-3.2 7.5-4.8 3.3-2 6.7-3.6 9.9-5.6.9-.6 2-.8 3-1.2 2.9-1.3 5.7-2.7 8.7-3.5 1.9-.5 4-.8 5.8-1.6 2.4-1.2 5.1-.9 7.4-2.2 1.6.1 3-.4 4.5-.8s3.2-.1 4.8-.1c.7 0 1.5-.3 2.2.4.2.2.8.2 1.1 0 1.2-.8 2.5-.4 3.8-.4 2.2.1 4.4-.4 6.5-.4 2.9-.1 5.6.7 8.2 2 .9.5 1.7.7 2.7.7 1.1 0 2.3 0 3.3.5 1.3.6 2.7.4 4.1.8 2.8.8 5.5 1.6 8.2 2.6 3.6 1.4 7 3.3 10.5 4.8 2 .9 4 2 5.9 3 2 1 3.7 2.6 5.7 3.7 1.7.9 3.2 2.3 4.9 3.2 1.1.6 2.1 1.7 3.1 2.6 2.7 2.5 5.9 4.5 8.3 7.3.8 1 1.6 1.9 2.5 2.9l2.4 2.7c1.3 1.6 2.7 3.2 3.9 4.9 1 1.4 2 2.8 3 4.3 1.4 2 2.6 4.2 4 6.2 1.8 2.8 3 5.8 4.6 8.7.9 1.8 1.5 3.7 2.4 5.5 1 2 1.6 4.1 2.6 6.1.5 1 .4 2.1 1 3.1.5.9.7 2 1 3.1.2.6.3 1.3.5 1.9.3.9.5 1.8.5 2.8-.1.9 0 1.7.4 2.6.4.7-.3 1.8.5 2.6.3.3 0 1 0 1.6-.8 4.8-.8 9.3-.8 13.7zm-3.7-6.6V311c0-.5 0-1.1-.1-1.6-.4-1.3-.9-2.6-.8-4.1 0-.4-.2-.9-.2-1.3 0-1.3-.9-2.3-1.1-3.5-.1-.6-.4-1.2-.6-1.8-.2-.7-.3-1.4-.7-2-.9-1.4-.8-3.2-2-4.5.1-1.5-1.2-2.6-1.5-4-.4-1.4-1.2-2.7-2-4-1.4-2.4-2.6-4.9-3.9-7.4-1.8-3.4-4.1-6.5-6.3-9.6-2.2-3.1-4.7-6-7.3-8.8-2.8-2.9-5.8-5.6-8.8-8.4l-.2-.2c-2.8-1.8-5.1-4.2-8-5.7-.7-.4-1.5-.6-2-1.2-1.5-1.6-3.6-2.2-5.3-3.4-1.5-1-3.3-1.8-5-2.5-1.8-.8-3.3-2.1-5.3-2.3-1.2-1.4-3.2-1.1-4.6-2.2-.5-.4-1.5-.3-2-.7-.7-.6-1.7.1-2.3-.7-.3-.3-1.1.1-1.7-.4-.7-.5-1.6-.7-2.5-.6-.4.1-1 .1-1.3-.1-1.6-1-3.4-.8-5.2-.8-1 0-1.8-.3-2.4-.8-.8-.7-2-.6-2.6-1.5-1.4.3-2.6-.6-4-.5-.6 0-1.2-.1-1.8 0-.6.1-1.1.4-1.7.4-2.4.2-4.8-.4-7.2.4-.5.2-1.2-.4-1.9-.4-2.2.1-4.4-.3-6.5.4-1.5.5-3.2.5-4.7 1-1.8.7-3.9.5-5.5 1.8-1.5-.3-2.5 1.3-4 .9-1.1.8-2.8.2-3.8 1.4-2.9.7-5.4 2.2-8.1 3.3-1.6.6-3.1 1.5-4.6 2.3-1.6.7-3 1.8-4.5 2.6-2.8 1.6-5.6 3.1-8.1 5.1-1.2.9-2.5 1.7-3.8 2.5l-5.1 3.3c-3.1 2-5.5 4.7-8.1 7.2-.4.4-1 .8-1.3 1.3-1.5 2.4-3.3 4.6-4.8 7-1.5 2.4-3.3 4.6-4.4 7.2-1.6 3.9-3.9 7.5-6.2 11.1-1.8 2.8-2.8 6-4.5 8.8-.1 1.8-1.1 3.4-1.5 5.2-.4 1.8-1 3.5-.9 5.4 0 .7-.2 1.4-.4 2.1-.3 1.3-.8 2.6-.6 4 .1.7.1 1.5-.4 2.1-.3.4-.5 1-.5 1.4.2 2-.5 3.9-.5 5.8 0 .8.1 1.6-.4 2.4-.4.7-.5 1.7-.5 2.6-.1 1.9-.4 3.9.1 5.8.5 2 1 4 1.7 6 .4 1 .7 2.1.5 3.3-.1 1.1.1 2.2 0 3.2-.2 2.6.5 4.9 1.4 7.3.6 1.7.7 3.7 1.9 5.2 0 1.6 1.1 2.9 1.3 4.3.3 1.7 1.4 2.9 1.8 4.3.4 1.3 1.1 2.3 1.5 3.6.9 2.6 2.2 5 3.5 7.3 1 1.8 2.2 3.4 3 5.3.2.5.6 1 .9 1.5 2 3 4 5.9 6.3 8.7 1.5 1.9 2.9 4 4.5 5.7 4.9 5.2 5.4 6 12.9 11.2 1.6 1.1 3.3 2.1 5 3.1 1.3.8 2.5 1.7 3.9 2.4 3.7 1.9 7.4 3.7 11.1 5.6 2.2 1.1 4.3 2.2 6.6 3 1.3.4 2.7 1.1 4 1.5 1.4.4 2.6 1.5 4.2 1.1 1.3.9 3.1.3 4.3 1.4.1.1.5.1.7 0 1.1-.2 2 .4 3 .6.4.1.8.3 1.2.4 2 .2 4 .3 6.1.5.2 0 .4-.1.4 0 .7 1 2.2-.1 2.9.9 1.1 0 2.2-.1 3.2 0 .7 0 1.5-.4 2.2.3.1.1.3.2.4.1 1.6-.9 3.3-.3 4.9-.5.3 0 .6 0 .9-.1 1-.5 2-.9 3.1-.8 1.2 0 2.3-.7 3.5-.5.3.1.6-.1.9-.2 1.1-.2 2.3-.8 3.4-.7 2.1.2 3.8-1.2 5.8-1.1 5.1-1.8 10.2-3.5 15.2-5.8 4-1.9 7.9-4.1 11.8-6.1.1-.1.3-.1.4-.2 2.1-2.1 4.8-3.4 7.2-5.2 3.7-2.9 7.3-5.9 10.8-9.1.9-.8 1.4-2 2.3-2.7 2.7-2.3 4.4-5.3 6.5-8 2.2-2.9 3.9-6.1 5.7-9.2.8-1.4 1.7-2.8 2.3-4.4.6-1.6 2.1-2.8 2.1-4.7 0-.3.2-.7.5-.9.4-.5.6-1 .8-1.5.7-1.9 1.8-3.7 2.3-5.8 1-.5.7-1.6 1-2.4l.9-2.4c.3-.9.1-1.9.8-2.7.8-.8.3-1.9.6-2.8.1-.2.3-.3.4-.5.3-.6.3-1.3.5-1.9.6-1.7.1-3.7 1.2-5.3.1-.2.1-.4.1-.6-.2-3.3.4-6.7.4-10 0-1.9-.5-3.9-.4-5.8-.3-2-.4-4.2-.4-6.4zM162.9 201.8c0-1.4-.1-2.8 0-4.2.1-2.1.3-4.2.5-6.3.1-.6.4-1.2.6-1.8.1-.2.3-.4.3-.6.1-3.3 1.5-6.1 2.5-9.1 1.4-4.4 3.6-8.6 5.9-12.6 1.9-3.3 3.9-6.7 6.4-9.6 1.4-1.6 2.8-3.2 4.3-4.6 1.8-1.7 3.8-3.4 5.8-4.9 1.3-.9 2.7-1.7 4-2.6 2.1-1.3 4.4-2.5 6.6-3.5 2.4-1.1 4.9-2 7.3-3 1.5-.6 2.9-1.4 4.5-1.4.8-.9 2-.9 3-1.1 1.8-.4 3.6-1.2 5.5-1.2 1 0 2-.3 3-.6.6-.1 1.1-.3 1.7-.3 2.9 0 5.7-.1 8.6 0 1.5.1 3.1.2 4.5.9 2-.4 3.7.8 5.6 1 1.6.2 3.1.9 4.7 1.4 4.1 1.3 7.9 3.2 11.7 5.3 3.2 1.7 6.3 3.5 9.2 5.8.9.7 2 1.2 2.9 1.9 2.5 1.7 4.7 3.8 6.8 6 2.3 2.5 4.3 5.2 5.7 8.3 1.2 2.6 2.4 5.2 3.5 7.8.4 1 .6 2 1.1 3 .8 1.5 1.6 2.9 2.5 4.3.7 1 1.4 2 1.3 3.4 0 .3.3.7.4 1 .4 1.8.7 3.6 1 5.4.1.9 0 1.8.5 2.6.5.9.4 1.9.5 2.8 0 .7.1 1.3.4 1.9.8 1.9.6 4.4.1 6.8-.3 1.2-.4 2.5-.5 3.7-.1 1 0 1.9-.5 2.8-.7 1.4-.6 3-.9 4.5-.2.9-.3 1.7-.5 2.6-.5 1.8-.8 3.7-1.8 5.3-.2.3-.3.6-.5 1-1.5 2.8-2.5 5.7-3.7 8.6-.8 1.8-1.9 3.6-3.1 5.2-1.7 2.4-3.4 4.8-5.5 7-1.5 1.6-2.8 3.4-4.5 4.8-1.4 1.2-2.7 2.6-4.3 3.5-.9.5-1.6 1.3-2.4 2-1.3 1-2.7 1.9-3.9 2.9-1.9 1.7-4.2 2.6-6.1 4.2-1.1-.4-1.5 1-2.6 1-.8 0-1.5.8-2.3 1.1-1.8.5-3.5 1.3-5.3 1.6-.8.2-1.6.3-2.3.5-.1 0-.2.3-.3.3-1.9 0-3.6.7-5.4 1-1.5.3-2.9.6-4.4.5-.2 0-.3-.1-.5 0-2.5 1.6-5.3.7-8 .9-.5 0-.9-.4-1.4-.4-2.1-.3-4-1.1-5.9-1.9-.2-.1-.5-.1-.6-.2-1-1.1-2.3-1.1-3.7-1.2-2.4-.3-4.8-.4-7-1.5-.1-.1-.2-.3-.4-.3-2.4 0-4.3-1.4-6.4-2.3-2.1-.9-4.1-2.1-6.1-3.3-2.4-1.4-4.4-3.4-6.8-4.7-1.1-.6-2-1.8-3.1-2.6-1.6-1.1-3.1-2.4-4.4-3.9-1.2-1.4-2.6-2.6-3.5-4.3-.1-.2-.3-.3-.5-.5-2.2-2.2-3.6-5-5.2-7.6-.7-1-1.2-2.1-1.8-3.2-.4-.7-.6-1.5-.8-2.2-.4-1.3-1-2.5-1.5-3.8-.5-1.4-1.2-3.8-1.7-4.8-.7-1.5.2-3.3-1.2-4.6-.1-.1-.2-.4-.2-.6.1-1.1 0-2.2-.8-3.1-.1-.1-.1-.4-.1-.6-.2-1.6-.4-3.1-.4-4.7-.1-1.7-.1-3.3-.1-4.9zm66.5-64.2H225c-.4 0-.9 0-1.3.1-1.3.4-2.5.9-3.8.8-1 0-1.8.8-2.8.5-.1 0-.2.1-.4.2-.9.3-2 .5-2.8 1-1 .7-2.2.3-3 1.1-.2.2-.7.1-1.1.2-3.3 1.4-6.5 2.9-9.8 4.2-2.3.9-4.3 2.4-6.3 3.7-3.9 2.5-8 5.5-10.8 9.2-1.3 1.8-2.9 3.3-3.9 5.3-.9 1.6-2.2 2.9-3 4.6-.8 1.7-1.9 3.2-2.4 5-.3 1.1-1.4 1.9-1.7 3-1.2 3.4-2.6 6.8-3.6 10.3-.2.7 0 1.6-.4 2.1-.8 1.1-.6 2.3-.7 3.4-.1.9-.1 2-.5 2.8-.3.6-.4 1.1-.4 1.7 0 3.4-.1 6.8 0 10.2.1 1.9 1 3.6 1.1 5.6 1 1.1.4 2.7 1.2 3.9-.5 1.9 1.4 3.3.9 5.2 1.3 1.9 1.6 4.3 2.6 6.3 1.4 3 3.2 5.8 4.9 8.6 1.8 3 4.3 5.4 6.6 7.9 1.2 1.3 2.7 2.2 3.9 3.5 2.2 2.3 5 3.9 7.5 5.8 1.9 1.4 4.1 2.5 6.1 3.7 1.9 1.1 3.8 2 5.8 2.7 1.7.6 3.6 1 5.4 1.5 1 .3 1.9.4 2.8.4 1.3.1 2.7.2 4 .5.6.1 1.1.7 1.7 1 .5.3 1.1.5 1.5.8 1 .8 2.2.4 3.4.8 2.5 1 5.1.9 7.7 0 .9-.3 1.7-.5 2.6-.4 1.4.1 2.6-.7 4-.5.6.1 1.2-.4 1.8-.6.3-.1.5-.2.8-.3.9-.1 1.9.2 2.6-.5.8-.9 1.9-.1 2.7-.7.8-.5 1.7-1 2.5-1.1 1.5-.1 2.6-.9 3.8-1.5 1.3-.6 2.6-1.2 3.8-2 1.6-1.2 3.4-2 4.8-3.5 2.6-1 4.3-3.2 6.5-4.8 2-1.5 3.7-3.5 5.4-5.3 1.7-1.8 3.8-3.3 4.8-5.6.3-.8 1-1.4 1.5-2.1l1.5-2.4c.2-.4.7-.7.8-1.1.1-1.5 1.8-2.4 1.5-4 1-.5.8-1.7 1.3-2.5s.5-1.8 1.1-2.5c1.2-1.6 1.6-3.5 2.6-5.2.4-.6.6-1.6.5-2.3-.2-1.1.4-2 .6-3 .1-.4.4-.9.4-1.4-.1-2.1.9-4 1-6.1.7-.4.4-1.1.4-1.7 0-1.8.1-3.6 0-5.3-.1-1.4-.3-2.8-.6-4.1-.3-1.3-.9-2.6-.8-4.1 0-.4 0-.8-.2-1.1-.9-1-.7-2.2-.7-3.4 0-.4-.1-.9-.2-1.3-.9-2.4-2.3-4.4-3.5-6.7-.4-.8-1-1.4-1-2.4 0-.3-.3-.6-.5-.9-.2-.3-.4-.6-.4-1-.1-1.6-1.2-2.9-1.8-4.3-.4-.9-.9-1.8-1.4-2.7-.4-.8-1-1.6-1.3-2.5-.3-1.1-1-1.8-1.7-2.5-.2-.2-.2-.5-.4-.8-.5-.7-1-1.5-1.6-2.1-1.1-1.1-2.3-2.2-3.5-3.2-2.1-1.8-4.4-3.1-6.6-4.7-1-.7-1.9-1.5-3.1-2.1-1-.5-1.8-1.2-2.7-1.8-2.9-2-6.3-3.2-9.3-4.9-.9-.5-2-.5-2.8-1-.9-.6-2.3-.1-3-1.3-.1-.1-.6 0-.9 0-.4 0-.8 0-1.1-.2-.8-.5-1.8-.6-2.7-.8-1-.2-1.9-.4-2.8-.4-.3 0-.6 0-.9-.1-1.7-.8-3.6-.9-5.4-.9-.8.1-1.6.1-2.4.1z"></path>
        </Overlay>
    );
}
const Hide = styled.svg`
    fill: ${props => props.theme.base} !important;
    stroke: none !important;
    filter: drop-shadow(1px 0px 1.75px ${props => props.theme.base} ) !important;
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
        filter: drop-shadow(1px 0px 1.75px ${props => props.theme.sub}) !important;
}
`
const StrokeHide = styled(Hide)`
    fill: transparent !important;
    stroke: ${props => props.theme.base} !important;

    &:hover{
        fill: transparent !important;
        stroke: ${props => props.theme.sub} !important;
    }
`
const Icon = styled.div`
    background: transparent;
    cursor: pointer;
    width: 90px !important;


    & svg{
    fill: ${props => props.theme.base} !important;
    filter: drop-shadow(1px 0px 1.75px ${props => props.theme.base} ) !important;
    height: 18px !important;
    width: auto;
    transition: ${stat.transition};
    }

    & p{
        color: ${props => props.theme.base} !important;
        text-shadow: 1px 0px 1.75px ${props => props.theme.base} !important;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;

    }

     &:hover > svg{
        fill: ${props => props.theme.sub} !important;
        filter: drop-shadow(1px 0px 1.75px ${props => props.theme.sub}) !important;
        }
    &:hover > p{
        color: ${props => props.theme.sub} !important;
        text-shadow: 1px 0px 1.75px ${props => props.theme.sub} !important;
    }
`
const ActiveIcon = styled(Icon)`
    
  & svg{
    fill: ${props => props.theme.sub} !important;
    filter: drop-shadow(1px 0px 1.75px ${props => props.theme.sub} ) !important;
}
  & p{
    color: ${props => props.theme.sub} !important;
    text-shadow: 1px 0px 1.75px ${props => props.theme.sub} !important;
}

    &:hover > svg{
        fill: ${props => props.theme.base} !important;
        filter: drop-shadow(1px 0px 1.75px ${props => props.theme.base}) !important;
    }

     &:hover > p{
    color: ${props => props.theme.base} !important;
    text-shadow: 1px 0px 1.75px ${props => props.theme.base} !important;
    }
`