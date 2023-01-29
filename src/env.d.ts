/// <reference types="astro/client" />

type MenuProps = {
    menu: boolean;
    setMenu: Dispatch<SetStateAction<boolean>>;
    menuRef: RefObject<HTMLDivElement>;
    readme: boolean;
    setReadMe: Dispatch<SetStateAction<boolean>>;
    feedback: boolean;
    setFeedback: Dispatch<SetStateAction<boolean>>;
};

type ModelProps = {
    selfie: boolean;
    loadedCamera: boolean;
    location: [x: string | null, y: string | null, w: string | null, h: string | null]
    model: any;
}