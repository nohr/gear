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
