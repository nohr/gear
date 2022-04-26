import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

// Instantiate and export the arm
export function Arm() {
    const group = useRef();
    const { nodes, materials } = useGLTF("/models/arm.glb");
    console.log(nodes["DEF-upper_armL"].rotation
    );

    const shoulderBone = nodes["DEF-upper_armL"];

    // Update the arms movements every frame
    useFrame((state, delta) => {
    })
    return (
        <group ref={group} dispose={null}>
            <group
                position={[0.09, -2.17, 0.3]}
            // rotation={[-Math.PI, -1.34, -Math.PI]}
            >
                <group
                    position={[-0.79, 0.89, -1.55]}
                    rotation={[0.4, -0.74, -0.52]}>
                    <primitive object={nodes.root} />
                    <primitive object={nodes["MCH-hand_ikparentL"]} />
                    <primitive object={nodes["MCH-upper_arm_ik_targetparentL"]} />
                    <skinnedMesh
                        geometry={nodes.hand_anatomy_mechanical005.geometry}
                        material={nodes.hand_anatomy_mechanical005.material}
                        skeleton={nodes.hand_anatomy_mechanical005.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.hand_anatomy_mechanical007.geometry}
                        material={nodes.hand_anatomy_mechanical007.material}
                        skeleton={nodes.hand_anatomy_mechanical007.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.hand_anatomy_mechanical064.geometry}
                        material={nodes.hand_anatomy_mechanical064.material}
                        skeleton={nodes.hand_anatomy_mechanical064.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.hand_anatomy_mechanical066.geometry}
                        material={nodes.hand_anatomy_mechanical066.material}
                        skeleton={nodes.hand_anatomy_mechanical066.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.hand_anatomy_mechanical071.geometry}
                        material={nodes.hand_anatomy_mechanical071.material}
                        skeleton={nodes.hand_anatomy_mechanical071.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.hand_anatomy_mechanical082.geometry}
                        material={nodes.hand_anatomy_mechanical082.material}
                        skeleton={nodes.hand_anatomy_mechanical082.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.hand_anatomy_mechanical083.geometry}
                        material={nodes.hand_anatomy_mechanical083.material}
                        skeleton={nodes.hand_anatomy_mechanical083.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.hand_anatomy_mechanical086.geometry}
                        material={nodes.hand_anatomy_mechanical086.material}
                        skeleton={nodes.hand_anatomy_mechanical086.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.hand_anatomy_mechanical206.geometry}
                        material={nodes.hand_anatomy_mechanical206.material}
                        skeleton={nodes.hand_anatomy_mechanical206.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.hand_anatomy_mechanical207.geometry}
                        material={nodes.hand_anatomy_mechanical207.material}
                        skeleton={nodes.hand_anatomy_mechanical207.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.Cylinder079.geometry}
                        material={nodes.Cylinder079.material}
                        skeleton={nodes.Cylinder079.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.Cylinder079_1.geometry}
                        material={nodes.Cylinder079_1.material}
                        skeleton={nodes.Cylinder079_1.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.Cylinder045.geometry}
                        material={nodes.Cylinder045.material}
                        skeleton={nodes.Cylinder045.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.Cylinder045_1.geometry}
                        material={nodes.Cylinder045_1.material}
                        skeleton={nodes.Cylinder045_1.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.Cylinder044.geometry}
                        material={nodes.Cylinder044.material}
                        skeleton={nodes.Cylinder044.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.Cylinder044_1.geometry}
                        material={nodes.Cylinder044_1.material}
                        skeleton={nodes.Cylinder044_1.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.Cylinder044_2.geometry}
                        material={nodes.Cylinder044_2.material}
                        skeleton={nodes.Cylinder044_2.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes["1020"].geometry}
                        material={nodes["1020"].material}
                        skeleton={nodes["1020"].skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes["1020_1"].geometry}
                        material={nodes["1020_1"].material}
                        skeleton={nodes["1020_1"].skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.hand_anatomy_mechanical209.geometry}
                        material={nodes.hand_anatomy_mechanical209.material}
                        skeleton={nodes.hand_anatomy_mechanical209.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.Mesh078.geometry}
                        material={nodes.Mesh078.material}
                        skeleton={nodes.Mesh078.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.Mesh078_1.geometry}
                        material={nodes.Mesh078_1.material}
                        skeleton={nodes.Mesh078_1.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.Mesh078_2.geometry}
                        material={nodes.Mesh078_2.material}
                        skeleton={nodes.Mesh078_2.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.Mesh078_3.geometry}
                        material={nodes.Mesh078_3.material}
                        skeleton={nodes.Mesh078_3.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.hand_anatomy_mechanical120.geometry}
                        material={nodes.hand_anatomy_mechanical120.material}
                        skeleton={nodes.hand_anatomy_mechanical120.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.hand_anatomy_mechanical156.geometry}
                        material={nodes.hand_anatomy_mechanical156.material}
                        skeleton={nodes.hand_anatomy_mechanical156.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.hand_anatomy_mechanical178.geometry}
                        material={nodes.hand_anatomy_mechanical178.material}
                        skeleton={nodes.hand_anatomy_mechanical178.skeleton}
                    />
                    <skinnedMesh
                        geometry={nodes.hand_anatomy_mechanical188.geometry}
                        material={nodes.hand_anatomy_mechanical188.material}
                        skeleton={nodes.hand_anatomy_mechanical188.skeleton}
                    />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("/models/arm.glb");