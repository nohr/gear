import React from 'react'
// import { Html, useProgress } from '@react-three/drei';
import { stat } from './state';
import { useSnapshot } from 'valtio';

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

function UI() {
    const snap = useSnapshot(stat)

    return (
        <>
            <div className='caption'>
                Gear and Loading c/o <a href='https://nabla.ooo/'>nabla</a> |
                this is a work in progress. follow the development on <a href='https://github.com/nohr/gear-and-loading'>github</a> | <a href='mailto:aite@nabla.ooo'>contact me</a>
                <p style={{ paddingTop: '5px' }}>this demo works best in an area with ample lighting.</p>


                <div className='statusbar'>
                    {snap.load === "closed" || snap.load === "point" ? snap.load === "closed" ? <p style={{ color: "#3afdc3" }}>{snap.load}</p> : <p style={{ color: "#fc153a" }}>{snap.load}</p> : <p>{snap.load}</p>}
                    {snap.location.x && <>
                        <p>x: {`${snap.location.x}`} </p>
                        <p>y: {`${snap.location.y}`} </p>
                        <p>w: {`${snap.location.w}`} </p>
                        <p>h: {`${snap.location.h}`} </p>
                    </>}
                </div>

            </div>

        </>
    )
}

export default UI