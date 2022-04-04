import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Arm(props) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF("/arm.glb");
    // const { actions } = useAnimations(animations, group);
    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <group name="Empty" position={[0, -0.54, 0]}>
                    <group
                        name="rig"
                        position={[-1.83, 0.89, -0.54]}
                        rotation={[0.29, -0.05, -0.79]}
                    >
                        <primitive object={nodes.root} />
                        <primitive object={nodes["MCH-hand_ikparentL"]} />
                        <primitive object={nodes["MCH-upper_arm_ik_targetparentL"]} />
                        <skinnedMesh
                            name="hand_anatomy_mechanical005"
                            geometry={nodes.hand_anatomy_mechanical005.geometry}
                            material={nodes.hand_anatomy_mechanical005.material}
                            skeleton={nodes.hand_anatomy_mechanical005.skeleton}
                        />
                        <skinnedMesh
                            name="hand_anatomy_mechanical007"
                            geometry={nodes.hand_anatomy_mechanical007.geometry}
                            material={nodes.hand_anatomy_mechanical007.material}
                            skeleton={nodes.hand_anatomy_mechanical007.skeleton}
                        />
                        <skinnedMesh
                            name="hand_anatomy_mechanical064"
                            geometry={nodes.hand_anatomy_mechanical064.geometry}
                            material={nodes.hand_anatomy_mechanical064.material}
                            skeleton={nodes.hand_anatomy_mechanical064.skeleton}
                        />
                        <skinnedMesh
                            name="hand_anatomy_mechanical066"
                            geometry={nodes.hand_anatomy_mechanical066.geometry}
                            material={nodes.hand_anatomy_mechanical066.material}
                            skeleton={nodes.hand_anatomy_mechanical066.skeleton}
                        />
                        <skinnedMesh
                            name="hand_anatomy_mechanical071"
                            geometry={nodes.hand_anatomy_mechanical071.geometry}
                            material={nodes.hand_anatomy_mechanical071.material}
                            skeleton={nodes.hand_anatomy_mechanical071.skeleton}
                        />
                        <skinnedMesh
                            name="hand_anatomy_mechanical082"
                            geometry={nodes.hand_anatomy_mechanical082.geometry}
                            material={nodes.hand_anatomy_mechanical082.material}
                            skeleton={nodes.hand_anatomy_mechanical082.skeleton}
                        />
                        <skinnedMesh
                            name="hand_anatomy_mechanical083"
                            geometry={nodes.hand_anatomy_mechanical083.geometry}
                            material={nodes.hand_anatomy_mechanical083.material}
                            skeleton={nodes.hand_anatomy_mechanical083.skeleton}
                        />
                        <skinnedMesh
                            name="hand_anatomy_mechanical086"
                            geometry={nodes.hand_anatomy_mechanical086.geometry}
                            material={nodes.hand_anatomy_mechanical086.material}
                            skeleton={nodes.hand_anatomy_mechanical086.skeleton}
                        />
                        <skinnedMesh
                            name="hand_anatomy_mechanical206"
                            geometry={nodes.hand_anatomy_mechanical206.geometry}
                            material={nodes.hand_anatomy_mechanical206.material}
                            skeleton={nodes.hand_anatomy_mechanical206.skeleton}
                        />
                        <skinnedMesh
                            name="hand_anatomy_mechanical207"
                            geometry={nodes.hand_anatomy_mechanical207.geometry}
                            material={nodes.hand_anatomy_mechanical207.material}
                            skeleton={nodes.hand_anatomy_mechanical207.skeleton}
                        />
                        <group name="hand_anatomy_mechanical010">
                            <skinnedMesh
                                name="Cylinder079"
                                geometry={nodes.Cylinder079.geometry}
                                material={nodes.Cylinder079.material}
                                skeleton={nodes.Cylinder079.skeleton}
                            />
                            <skinnedMesh
                                name="Cylinder079_1"
                                geometry={nodes.Cylinder079_1.geometry}
                                material={nodes.Cylinder079_1.material}
                                skeleton={nodes.Cylinder079_1.skeleton}
                            />
                        </group>
                        <group name="hand_anatomy_mechanical048">
                            <skinnedMesh
                                name="Cylinder045"
                                geometry={nodes.Cylinder045.geometry}
                                material={nodes.Cylinder045.material}
                                skeleton={nodes.Cylinder045.skeleton}
                            />
                            <skinnedMesh
                                name="Cylinder045_1"
                                geometry={nodes.Cylinder045_1.geometry}
                                material={nodes.Cylinder045_1.material}
                                skeleton={nodes.Cylinder045_1.skeleton}
                            />
                        </group>
                        <group name="hand_anatomy_mechanical049">
                            <skinnedMesh
                                name="Cylinder044"
                                geometry={nodes.Cylinder044.geometry}
                                material={nodes.Cylinder044.material}
                                skeleton={nodes.Cylinder044.skeleton}
                            />
                            <skinnedMesh
                                name="Cylinder044_1"
                                geometry={nodes.Cylinder044_1.geometry}
                                material={nodes.Cylinder044_1.material}
                                skeleton={nodes.Cylinder044_1.skeleton}
                            />
                            <skinnedMesh
                                name="Cylinder044_2"
                                geometry={nodes.Cylinder044_2.geometry}
                                material={nodes.Cylinder044_2.material}
                                skeleton={nodes.Cylinder044_2.skeleton}
                            />
                        </group>
                        <group name="hand_anatomy_mechanical072">
                            <skinnedMesh
                                name="1020"
                                geometry={nodes["1020"].geometry}
                                material={nodes["1020"].material}
                                skeleton={nodes["1020"].skeleton}
                            />
                            <skinnedMesh
                                name="1020_1"
                                geometry={nodes["1020_1"].geometry}
                                material={nodes["1020_1"].material}
                                skeleton={nodes["1020_1"].skeleton}
                            />
                        </group>
                        <skinnedMesh
                            name="hand_anatomy_mechanical209"
                            geometry={nodes.hand_anatomy_mechanical209.geometry}
                            material={nodes.hand_anatomy_mechanical209.material}
                            skeleton={nodes.hand_anatomy_mechanical209.skeleton}
                        />
                        <group name="hand_anatomy_mechanical153">
                            <skinnedMesh
                                name="Mesh078"
                                geometry={nodes.Mesh078.geometry}
                                material={nodes.Mesh078.material}
                                skeleton={nodes.Mesh078.skeleton}
                            />
                            <skinnedMesh
                                name="Mesh078_1"
                                geometry={nodes.Mesh078_1.geometry}
                                material={nodes.Mesh078_1.material}
                                skeleton={nodes.Mesh078_1.skeleton}
                            />
                            <skinnedMesh
                                name="Mesh078_2"
                                geometry={nodes.Mesh078_2.geometry}
                                material={nodes.Mesh078_2.material}
                                skeleton={nodes.Mesh078_2.skeleton}
                            />
                            <skinnedMesh
                                name="Mesh078_3"
                                geometry={nodes.Mesh078_3.geometry}
                                material={nodes.Mesh078_3.material}
                                skeleton={nodes.Mesh078_3.skeleton}
                            />
                        </group>
                        <skinnedMesh
                            name="hand_anatomy_mechanical120"
                            geometry={nodes.hand_anatomy_mechanical120.geometry}
                            material={nodes.hand_anatomy_mechanical120.material}
                            skeleton={nodes.hand_anatomy_mechanical120.skeleton}
                        />
                        <skinnedMesh
                            name="hand_anatomy_mechanical156"
                            geometry={nodes.hand_anatomy_mechanical156.geometry}
                            material={nodes.hand_anatomy_mechanical156.material}
                            skeleton={nodes.hand_anatomy_mechanical156.skeleton}
                        />
                        <skinnedMesh
                            name="hand_anatomy_mechanical178"
                            geometry={nodes.hand_anatomy_mechanical178.geometry}
                            material={nodes.hand_anatomy_mechanical178.material}
                            skeleton={nodes.hand_anatomy_mechanical178.skeleton}
                        />
                        <skinnedMesh
                            name="hand_anatomy_mechanical188"
                            geometry={nodes.hand_anatomy_mechanical188.geometry}
                            material={nodes.hand_anatomy_mechanical188.material}
                            skeleton={nodes.hand_anatomy_mechanical188.skeleton}
                        />
                    </group>
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("/arm.glb");