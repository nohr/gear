/// <reference types="astro/client" />

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