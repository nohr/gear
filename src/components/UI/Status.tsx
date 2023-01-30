import { useSnapshot } from "valtio";
import { model, state } from "state";

export default function Status() {
  const { selfie, status, cameraStarted } = useSnapshot(state);
  const { location } = useSnapshot(model);

  return (
    <div>
      <div className="flex flex-col items-center">
        <p>
          Camera stream is in <b>{!selfie ? "Laptop" : "External"}</b> mode
        </p>
        <br />
        <p
          className={
            status === "closed"
              ? "closed"
              : status === "open"
              ? "open"
              : status === "point"
              ? "point"
              : ""
          }
        >
          {status}
        </p>
        {location[0] && cameraStarted && (
          <>
            <p>x: {`${location[0]}`} </p>
            <p>y: {`${location[1]}`} </p>
          </>
        )}
      </div>
    </div>
  );
}
