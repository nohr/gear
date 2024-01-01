import { useUIStore } from "state/ui";
import { Fade } from "..";

export default function Status() {
  const status = useUIStore((state) => state.status);
  // console.log(status);

  //  TODO: Get status from handtrackjs model
  // const { location } = useSnapshot(model);

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="flex h-6 w-max flex-col items-center">
          <Fade bool={status !== " "}>
            <p
              className={` select-none ${
                status === "closed"
                  ? "closed"
                  : status === "open"
                  ? "open"
                  : status === "point"
                  ? "point"
                  : ""
              }`}
            >
              {status}
            </p>
          </Fade>
        </div>
        {/* {location[0] && cameraStarted && (
          <>
            <p>x: {`${location[0]}`} </p>
            <p>y: {`${location[1]}`} </p>
          </>
        )} */}
      </div>
    </div>
  );
}
