import { MenuContext } from "context";
import { useContext, useEffect } from "react";
import { Backdrop, Gear } from ".";

export function Feedback() {
  const { setReadMe, readme, feedback } = useContext(MenuContext);
  const email = "hi@paredol.com";

  useEffect(() => {
    feedback ? setReadMe(false) : null;
    // commentBox('5724094653792256-proj');

    // return () => {
    //     commentBox('5724094653792256-proj').removeCommentBox();
    // }
  }, [readme]);

  return (
    <>
      {feedback ? (
        <>
          <div className="panel">
            <div className="commentbox">
              <span style={{ userSelect: "none" }}> email: </span> {email}
            </div>
            <Gear />
          </div>
          <Backdrop />
        </>
      ) : null}
    </>
  );
}
