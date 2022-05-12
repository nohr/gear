# 🦾 Gear & Loading

It's a motoion-based, role-playing game that emphasizes slowness in completing a menial task.

## How does it work?

### Computer Vision

- [MediaPipe Holistic](https://google.github.io/mediapipe/solutions/holistic.html) tracks the body and hands and returns coordinates to be solved by Kalidokit.

- [Kalidokit](https://github.com/yeemachine/kalidokit) solves kinematics which lets us virtually embody the prosthetic.

- [Handtrack.js](https://github.com/victordibia/handtrack.js) also tracks hands but guesses hand signs to trigger prosthetic animations as well.

### Virtual Reality

- [VRM Add-on for Blender](https://github.com/saturday06/VRM_Addon_for_Blender) exports a VRM file.

- [three-vrm](https://github.com/pixiv/three-vrm) lets us load the VRM file into the three.js canvas.

- Poimandres' [react-three-fiber](https://github.com/pmndrs/react-three-fiber) renders [three.js](https://threejs.org/) to enable 3D in the app. It's ecosystem, including [drei](https://github.com/pmndrs/drei), [postprocessing](https://github.com/pmndrs/react-postprocessing), and [cannon](https://github.com/pmndrs/use-cannon), provides useful three.js helpers, works as a post processing wrapper, and works as a physics renderer respectively.

#### Etc.

- [ithappy](https://www.cgtrader.com/ithappy) created the mechanical prosthetic model that we attach to a human rig in Blender.

- README and feedback icons were created by [Gregor Cresnar](https://thenounproject.com/grega.cresnar/) and edited further by me.

## Installation

```zsh
# Clone and open repository
$ git clone https://github.com/nohr/gear
$ cd gear

# Install dependencies and run locally
$ npm i
$ npm run start
```
