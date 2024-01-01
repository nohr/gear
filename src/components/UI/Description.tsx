import { useInfoStore } from "state/ui";

export default function Description() {
  const [name, website, github] = useInfoStore((s) => [
    s.name,
    s.website,
    s.github,
  ]);

  return (
    <p className="absolute bottom-2 left-2 z-[70] w-fit select-none whitespace-pre-wrap drop-shadow-lg">
      <i>Gear and Loading</i> by{" "}
      <a className="underline hover:opacity-50" href={website}>
        {name}
      </a>
      .
      <br />
      This is a work in progress, follow it's development on{" "}
      <a className=" underline hover:opacity-50" href={github}>
        Github
      </a>
      .
    </p>
  );
}
