/// <reference types="astro/client" />

interface HolisticProps {
    input: MutableRefObject<HTMLVideoElement>,
    init: () => void;
    run: () => void;
    destroy: () => void;
    holistic: MutableRefObject<Holistic | null>;
    results: MutableRefObject<any>;
}
interface VRMProps {
    animate: () => void;
    affect: (status: string) => void;
    vrm: { current: VRM | null };
}
interface MenuProps {
    menu: boolean;
    setMenu: Dispatch<SetStateAction<boolean>>;
    menuRef: RefObject<HTMLDivElement>;
    readme: boolean;
    setReadMe: Dispatch<SetStateAction<boolean>>;
    feedback: boolean;
    setFeedback: Dispatch<SetStateAction<boolean>>;
};

interface ModelProps {
    selfie: boolean;
    loadedCamera: boolean;
    location: [x: string | null, y: string | null, w: string | null, h: string | null]
    model: any;
}