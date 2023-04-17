import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useUIStore } from "state/ui";
import { Popup } from "..";
import { shallow } from "zustand/shallow";

export function ReadMe() {
  // const [ setReadMeText] = useState<string>("");
  const [feedback, readme, setFeedback, readMeText, getReadMe] = useUIStore(
    (state) => [
      state.feedback,
      state.readme,
      state.setFeedback,
      state.readMeText,
      state.getReadMe,
    ],
    shallow
  );

  useEffect(() => {
    readme ? setFeedback(false) : null;
  }, [feedback]);

  useEffect(() => {
    getReadMe("https://raw.githubusercontent.com/nohr/gear/main/README.md");
  }, []);

  return (
    <Popup bool={readme}>
      <div className="markdown">
        <ReactMarkdown>{readMeText}</ReactMarkdown>
        <br />
      </div>
    </Popup>
  );
}
