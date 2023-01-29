import { useContext } from "react";
import { MenuContext } from "../common/context";
import { FeedbackPath, ReadMePath } from "./ModalButtonPaths";

export default function ModalButtons() {
  return (
    <div className="flex flex-row w-36 gap-x-8 justify-between">
      <ReadMeButton />
      <FeedbackButton />
    </div>
  );
}

function ReadMeButton() {
  const { readme, setReadMe } = useContext(MenuContext);
  return (
    <div
      onClick={() => setReadMe((prev: boolean) => !prev)}
      className={`modalButton ${readme ? "active" : ""}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="553"
        height="539.024"
        data-name="Layer 1"
        viewBox="0 0 553 539.024"
        id="a"
      >
        {ReadMePath}
      </svg>
      <p>{`${!readme ? "README" : "Close"}`}</p>
    </div>
  );
}

function FeedbackButton() {
  const { feedback, setFeedback } = useContext(MenuContext);
  return (
    <div
      onClick={() => setFeedback((prev: boolean) => !prev)}
      className={`modalButton ${feedback ? "active" : ""}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="514.322"
        height="539"
        data-name="Layer 1"
        viewBox="0 0 514.322 539"
      >
        {FeedbackPath}
      </svg>

      <p>{`${!feedback ? "Feedback" : "Close"}`}</p>
    </div>
  );
}
