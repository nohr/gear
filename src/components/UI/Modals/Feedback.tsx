import { useEffect } from "react";
import { useUIStore } from "state/ui";
import { Popup } from "..";

export function Feedback() {
  const feedback = useUIStore((state) => state.feedback);
  const readme = useUIStore((state) => state.readme);
  const hideReadme = useUIStore((state) => state.hideReadme);
  const email = useUIStore((state) => state.email);

  useEffect(() => {
    feedback ? hideReadme() : null;
    // commentBox('5724094653792256-proj');

    // return () => {
    //     commentBox('5724094653792256-proj').removeCommentBox();
    // }
  }, [readme]);

  return (
    <Popup bool={feedback}>
      <a
        href={`mailto:${email}`}
        className="commentbox underline hover:opacity-50"
      >
        {email}
      </a>
    </Popup>
  );
}
