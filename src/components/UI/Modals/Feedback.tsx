import { useEffect } from "react";
import { useInfoStore, useUIStore } from "state/ui";
import { Popup } from "..";

export function Feedback() {
  const [feedback, readme, setReadme] = useUIStore((state) => [
    state.feedback,
    state.readme,
    state.setReadme,
  ]);
  const email = useInfoStore((state) => state.email);

  useEffect(() => {
    feedback ? setReadme(false) : null;
  }, [readme]);

  return (
    <Popup bool={feedback} className=" whitespace-pre-wrap text-center">
      {"something's wrong? have a suggestion? \n send me an email at:"}
      <strong>
        <a href={`mailto:${email}`} className=" underline hover:opacity-50">
          {email}
        </a>
      </strong>{" "}
      !
    </Popup>
  );
}
