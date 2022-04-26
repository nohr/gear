import React from 'react'
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
`

const Options = styled.div`
display: flex;
justify-content: center;

`

function UI() {
    const snap = useSnapshot(stat)

    var elem = document.documentElement;

    /* View in fullscreen */
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

    /* Close fullscreen */
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

    return (
        <div className='caption'>
            Gear and Loading c/o <a href='https://nabla.ooo/'>Nabla</a> |
            This is a work in progress. Follow the development on <a href='https://github.com/nohr/gear-and-loading'>Github</a>. | <a href='mailto:aite@nabla.ooo'>Email</a>
            <p style={{ paddingTop: '5px' }}>➤ Make point, fist, or open handsigns to test detection.<br />This demo works best in a well-lit area.</p>
            <div className='statusbar'>
                <p>Camera feed is in <span style={{ fontWeight: "bolder" }}>{!stat.selfie ? "Laptop" : "External"}</span> mode.</p>
                {snap.load === "closed" || "open" || "point" ?
                    <p style={snap.load === "closed" ?
                        { color: "#acddff" } : snap.load === 'open' ?
                            { color: "#3cf5aa" } : snap.load === 'point' ?
                                { color: "#08afff" } : null}>
                        {snap.load}
                    </p> : <p>{snap.load}</p>}
                {snap.location.x && <>
                    <p>x: {`${snap.location.x}`} </p>
                    <p>y: {`${snap.location.y}`} </p>
                    <p>w: {`${snap.location.w}`} </p>
                    <p>h: {`${snap.location.h}`} </p>
                </>}
            </div>
            <br />
            <Options>
                {snap.fullscreen ? <Link onClick={closeFullscreen}>Exit</Link> : <Link onClick={openFullscreen}>Fullscreen</Link>}
            </Options>
        </div>
    )
}

export default UI