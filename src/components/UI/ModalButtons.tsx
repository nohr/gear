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
      className={`flex h-fit w-20 cursor-pointer select-none flex-col items-center overflow-visible fill-blue-500 drop-shadow-md transition-[0.2s] hover:fill-red-500 hover:text-red-500 hover:drop-shadow-mdHover dark:fill-gray-500 dark:drop-shadow-mdDark dark:hover:fill-lime-500 dark:hover:text-lime-500 hover:dark:drop-shadow-mdDarkHover [&>svg]:h-6 [&>svg]:w-fit ${
        readme ? "active" : ""
      } ${feedback ? "pointer-events-none opacity-25" : ""}`}
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
      className={`flex h-fit w-20 cursor-pointer select-none flex-col items-center overflow-visible fill-blue-500 drop-shadow-md transition-[0.2s] hover:fill-red-500 hover:text-red-500 hover:drop-shadow-mdHover dark:fill-gray-500 dark:drop-shadow-mdDark dark:hover:fill-lime-500 dark:hover:text-lime-500 hover:dark:drop-shadow-mdDarkHover [&>svg]:h-6 [&>svg]:w-fit ${
        feedback ? "active" : ""
      } ${readme ? "pointer-events-none opacity-25" : ""}`}
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
