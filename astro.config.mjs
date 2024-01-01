import { defineConfig } from "astro/config";
import * as path from "path";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  site: "https://gear-4327.web.app/",
  server: { port: 4327, host: true },
  vite: {
    plugins: [mediapipe_workaround()],
  },
});

// mediapipe workaround

function mediapipe_workaround() {
  return {
    name: "mediapipe_workaround",
    load(id) {
      if (path.basename(id) === "holistic.js") {
        let code = fs.readFileSync(id, "utf-8");
        code += "exports.Holistic = Holistic;";
        return { code };
      } else if (path.basename(id) === "camera_utils.js") {
        let code = fs.readFileSync(id, "utf-8");
        code += "exports.Camera = Camera;";
        return { code };
      } else {
        return null;
      }
    },
  };
}
