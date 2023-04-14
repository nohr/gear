import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useUIStore } from "state/ui";
import { Popup } from "..";
import { shallow } from "zustand/shallow";

export function ReadMe() {
  const [readMeText, setReadMeText] = useState<string>("");
  const [feedback, readme, setFeedback] = useUIStore(
    (state) => [state.feedback, state.readme, state.setFeedback],
    shallow
  );

  useEffect(() => {
    readme ? setFeedback(false) : null;
  }, [feedback]);

  async function getReadMe() {
    const URL = "https://raw.githubusercontent.com/nohr/gear/main/README.md";
    const res = await fetch(URL, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain",
      },
    });
    const text = await res.text();
    return text;
  }

  getReadMe().then((text) => setReadMeText(text));

  return (
    <Popup bool={readme}>
      <div className="markdown">
        <ReactMarkdown>{readMeText}</ReactMarkdown>
        <br />
      </div>
    </Popup>
  );
}
