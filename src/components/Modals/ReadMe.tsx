import { MenuContext } from "context";
import { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Backdrop, Gear } from ".";

export function ReadMe() {
  const [readMeText, setReadMeText] = useState<string>("");
  const { setFeedback, feedback, readme } = useContext(MenuContext);

  useEffect(() => {
    readme ? setFeedback(false) : null;
  }, [feedback]);

  fetch("../../README.md")
    .then((res) => res.text())
    .then((text) => setReadMeText(text));

  return (
    <>
      {readme ? (
        <>
          <div className="panel">
            <div className="markdown">
              <ReactMarkdown>{readMeText}</ReactMarkdown>
              <br />
            </div>
            <Gear />
          </div>
          <Backdrop />
        </>
      ) : null}
    </>
  );
}
