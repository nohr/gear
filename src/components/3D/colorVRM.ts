import type { VRM } from "@pixiv/three-vrm";
import { state } from "state";
import { MeshStandardMaterial } from "three";

export const colorVRM = (currentVrm: VRM) => {
    const gltf = currentVrm.scene.children;

    const material = new MeshStandardMaterial();
    material.color.setHSL(0.50, 1, 0.5);  // red
    material.flatShading = true;
    const material1 = new MeshStandardMaterial();
    material1.color.setHSL(0, 0, 1);  // white
    material1.flatShading = true;
    const material2 = new MeshStandardMaterial();
    material2.color.setHSL(1.92, 0.66, 0.35);  // white
    material2.flatShading = true;

    gltf.forEach((child: any) => {
        if (child.material) {
            if (state.status === 'closed') {
                // Do something when the hand is closed
                child.material = material;
                return
            } else if (state.status === 'open') {
                // Do something when the hand is open
                child.material = material1;
                return
            } else if (state.status === 'point') {
                // Do something when the hand is pointed
                child.material = material2;
                return
            }

        }
    })

}