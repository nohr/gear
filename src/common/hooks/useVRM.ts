// load the VRM and save it to local storage. retrieve it from local storage and load it into the scene

import { VRM, VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";
import { useEffect, useState } from "react";
import { state } from "state";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { loadVRMFromLocalStorage, loadVRMFromHosting } from "utils";
import { useSnapshot } from "valtio";

export default function useVRM(vrm: { current: VRM }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>();
    const { vrmLoaded } = useSnapshot(state)

    useEffect(() => {
        const loadVRM = async () => {
            try {
                // Check Local Storage for a VRM
                const localVrm: VRM | null = await loadVRMFromLocalStorage();
                if (localVrm !== null) {
                    vrm.current = localVrm;
                    setLoading(false);
                } else {
                    let url = "/models/fullbody.vrm";
                    // Load a VRM from hosting
                    const loader = new GLTFLoader()
                    loader.register((parser) => {
                        return new VRMLoaderPlugin(parser);
                    })
                    // load VRM 
                    loader.load(url, async (gltf) => {
                        VRMUtils.removeUnnecessaryJoints(gltf.scene);
                        const hostedVrm = await gltf.userData.vrm;
                        vrm.current = hostedVrm;
                        // TODO: convert to base64 and save to local storage
                        // let reader = new FileReader();
                        // reader.readAsDataURL(blobVrm);
                        // reader.onload = function () {
                        //     localStorage.setItem("vrm", JSON.stringify(reader.result));
                        // };
                        // reader.onerror = function (error) {
                        //     console.log('Error: ', error);
                        // };
                    },
                        (progress) => {
                            state.status = (100.0 * (progress.loaded / progress.total)) === 100.0 ? '100% armed'
                                : ((progress.loaded / progress.total) <= 1.0)
                                    ? `${Math.floor(100.0 * (progress.loaded / progress.total))}% armed...`
                                    : 'Overloaded! Now resolving...'
                        },
                        (error) => setError(error)
                    )
                }
            } catch (e) {
                setError(e);
                setLoading(false);
                console.error(e);
            }
        };
        if (!vrmLoaded) loadVRM();

    }, []);

    return { vrm, loading, error };
}

