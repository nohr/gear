import { useContext } from "react";
import { MenuContext } from "context";
import { FeedbackPath, ReadMePath } from "./ModalButtonPaths";

export default function ModalButtons() {
  return (
    <div className="flex w-36 flex-row justify-between gap-x-8">
      <ReadMeButton />
      <FeedbackButton />
    </div>
  );
}

function ReadMeButton() {
  const { readme, feedback, setReadMe } = useContext(MenuContext);
  return (
    <div
      onClick={() => (!feedback ? setReadMe((prev: boolean) => !prev) : null)}
      className={`modalButton ${readme ? "active" : ""} ${
        feedback ? "pointer-events-none opacity-25" : ""
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="553"
        height="539.024"
        data-name="Layer 1"
        viewBox="0 0 553 539.024"
      >
        {ReadMePath}
      </svg>
      <p>{`${!readme ? "README" : "Close"}`}</p>
    </div>
  );
}

function FeedbackButton() {
  const { feedback, readme, setFeedback } = useContext(MenuContext);
  return (
    <div
      onClick={() => (!readme ? setFeedback((prev: boolean) => !prev) : null)}
      className={`modalButton ${feedback ? "active" : ""} ${
        readme ? "pointer-events-none opacity-25" : ""
      }`}
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
